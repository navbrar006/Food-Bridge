const express = require("express");
const router = express.Router();

const donationController = require("../controllers/donationController");

// CREATE DONATION + ML
router.post("/", donationController.createDonation);

// GET ALL
router.get("/", donationController.getAllDonations);

// UPDATE STATUS
router.put("/:id/status", donationController.updateStatus);

// NGO FILTER
router.get("/ngo/:ngoId", donationController.getDonationsByNGO);

module.exports = router;