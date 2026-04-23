"use client";

import { useState } from "react";
import { apiRequest } from "@/lib/api";

export default function DonorPage() {
  const [foodType, setFoodType] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("kg");

  const [cookDate, setCookDate] = useState("");
  const [cookTime, setCookTime] = useState("");

  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState(null);
  const [donating, setDonating] = useState(false);

  // 🔥 PREDICT (CREATE + GET RESPONSE)
  const handlePredict = async () => {
    if (!foodType || !quantity || !cookDate || !cookTime) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);
      setPrediction(null);

      const cookedDateTime = `${cookDate}T${cookTime}`;

      const data = await apiRequest(
        "/api/donations",
        "POST",
        {
          food_type: Number(foodType),
          quantity: Number(quantity),
          unit,
          cooked_time: cookedDateTime,
          location: {
            lat: 30.7333,
            lng: 76.7794,
          },
        }
      );

      console.log("Prediction response:", data);

      // ✅ NORMALIZED SAFE STATE
      setPrediction({
        shelfLife: data?.shelfLife ?? 6,
        ngoName: data?.ngoName ?? "Not assigned",
        risk: data?.donation?.risk_level ?? "Low",
      });

    } catch (err) {
      console.log(err);
      alert("Prediction failed. Check backend + ML service.");
    } finally {
      setLoading(false);
    }
  };

  // 🔥 DONATE FINAL STEP (optional extra call)
  const handleDonate = async () => {
    try {
      setDonating(true);

      await apiRequest(
        "/api/donations",
        "POST",
        {
          food_type: Number(foodType),
          quantity: Number(quantity),
          unit,
          cooked_time: `${cookDate}T${cookTime}`,
          status: "confirmed",
        }
      );

      alert("🎉 Donation successful!");

      setPrediction(null);
      setFoodType("");
      setQuantity("");
      setCookDate("");
      setCookTime("");

    } catch (err) {
      console.log(err);
      alert("Donation failed");
    } finally {
      setDonating(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-8 flex justify-center">

      <div className="bg-white/10 p-8 rounded-2xl w-full max-w-xl">

        <h1 className="text-4xl font-bold mb-8">
          🍱 Donor Dashboard
        </h1>

        {/* FOOD TYPE */}
        <label className="block mb-2">Food Type</label>
        <select
          value={foodType}
          onChange={(e) => setFoodType(e.target.value)}
          className="w-full p-3 mb-5 bg-black border rounded"
        >
          <option value="">Select Food</option>
          <option value="1">Rice</option>
          <option value="2">Bread</option>
          <option value="3">Vegetables</option>
          <option value="10">Cooked Chicken</option>
        </select>

        {/* QUANTITY */}
        <label className="block mb-2">Quantity</label>
        <div className="flex gap-3 mb-5">
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="w-2/3 p-3 bg-black border rounded"
            placeholder="Enter quantity"
          />

          <select
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            className="w-1/3 p-3 bg-black border rounded"
          >
            <option value="kg">kg</option>
            <option value="litres">litres</option>
            <option value="units">units</option>
          </select>
        </div>

        {/* DATE */}
        <label className="block mb-2">Cooking Date</label>
        <input
          type="date"
          value={cookDate}
          onChange={(e) => setCookDate(e.target.value)}
          className="w-full p-3 mb-5 bg-black border rounded"
        />

        {/* TIME */}
        <label className="block mb-2">Cooking Time</label>
        <input
          type="time"
          value={cookTime}
          onChange={(e) => setCookTime(e.target.value)}
          className="w-full p-3 mb-6 bg-black border rounded"
        />

        {/* PREDICT BUTTON */}
        <button
          onClick={handlePredict}
          disabled={loading}
          className="w-full bg-gradient-to-r from-green-400 to-blue-500 text-black font-bold py-3 rounded-lg"
        >
          {loading ? "Predicting..." : "Predict Shelf Life"}
        </button>

        {/* RESULT */}
        {prediction && (
          <div className="mt-8 p-5 bg-green-900 rounded-xl">

            <h3 className="text-xl mb-3">Prediction Result</h3>

            <p>⏳ Shelf Life: <b>{prediction.shelfLife} hrs</b></p>

            <p>⚠ Risk Level: <b>{prediction.risk}</b></p>

            <p>🏢 Assigned NGO: <b>{prediction.ngoName}</b></p>

          </div>
        )}

        {/* DONATE BUTTON */}
        <button
          onClick={handleDonate}
          disabled={donating}
          className="w-full mt-6 py-3 rounded bg-blue-500 hover:bg-blue-600 font-semibold"
        >
          {donating ? "Submitting..." : "Donate Food"}
        </button>

      </div>
    </div>
  );
}