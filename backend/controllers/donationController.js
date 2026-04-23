const Donation = require("../models/Donation");
const axios = require("axios");
const { findNearestNGO } = require("./matchingController");

// CREATE DONATION + ML PREDICTION
exports.createDonation = async (req, res) => {
  try {
    const { food_type, quantity, location, cooked_time } = req.body;

    if (!food_type || !quantity) {
      return res.status(400).json({ error: "Missing fields" });
    }

    // 🔥 ML CALL
    let predicted = 6;

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/predict",
        {
          food_type: Number(food_type),
          cooked_time,
        }
      );

      predicted = response.data.prediction || 6;
    } catch (err) {
      console.log("ML fallback used");
    }

    // Risk logic
    let risk = "Low";
    if (predicted < 4) risk = "High";
    else if (predicted < 8) risk = "Medium";

    const nearestNGO = await findNearestNGO(location);

    const donation = new Donation({
      food_type: Number(food_type),
      quantity: Number(quantity),
      location,
      cooked_time,
      predicted_shelf_life: predicted,
      risk_level: risk,
      assigned_ngo: nearestNGO?._id || null,
      status: "pending",
    });

    await donation.save();

    const populated = await Donation.findById(donation._id).populate(
      "assigned_ngo",
      "name location"
    );

    res.json({
      shelfLife: predicted,
      ngoName: populated.assigned_ngo?.name || "Not assigned",
      donation: populated,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

// GET ALL
exports.getAllDonations = async (req, res) => {
  try {
    const data = await Donation.find().populate(
      "assigned_ngo",
      "name location"
    );
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE STATUS
exports.updateStatus = async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id);
    if (!donation)
      return res.status(404).json({ msg: "Donation not found" });

    donation.status = req.body.status;
    await donation.save();

    res.json(donation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// NGO FILTER
exports.getDonationsByNGO = async (req, res) => {
  try {
    const data = await Donation.find({
      assigned_ngo: req.params.ngoId,
    });

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};