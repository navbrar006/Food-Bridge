"use client";

import { useState } from "react";
import { apiRequest } from "@/lib/api";

export default function DonorPage() {
  const [foodType, setFoodType] = useState("");
  const [quantity, setQuantity] = useState("");
  const [cookDate, setCookDate] = useState("");
  const [cookTime, setCookTime] = useState("");

  const [loading, setLoading] = useState(false);
  const [donating, setDonating] = useState(false);
  const [prediction, setPrediction] = useState(null);

  // 🔥 PREDICT
  const handlePredict = async () => {
    if (!foodType || !quantity || !cookDate || !cookTime) {
      alert("Fill all fields");
      return;
    }

    try {
      setLoading(true);

      const cooked_time = `${cookDate}T${cookTime}`;

      const data = await apiRequest("/api/donations", "POST", {
        food_type: Number(foodType),
        quantity: Number(quantity),
        cooked_time,
        location: {
          lat: 30.7333,
          lng: 76.7794,
        },
      });

      setPrediction({
        shelfLife: data?.shelfLife ?? 6,
        ngoName: data?.ngoName ?? "Not assigned",
        risk: data?.donation?.risk_level ?? "Low",
      });

    } catch (err) {
      console.log(err);
      alert("Prediction failed");
    } finally {
      setLoading(false);
    }
  };

  // 🔥 DONATE FINAL
  const handleDonate = async () => {
    if (!prediction) {
      alert("Please predict first");
      return;
    }

    try {
      setDonating(true);

      await apiRequest("/api/donations", "POST", {
        food_type: Number(foodType),
        quantity: Number(quantity),
        cooked_time: `${cookDate}T${cookTime}`,
        status: "confirmed",
      });

      alert("🎉 Donation Successful!");

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
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="w-full max-w-xl bg-white/10 p-6 rounded-xl">

        <h1 className="text-3xl font-bold text-center mb-6">
          Donor Dashboard
        </h1>

        <select
          value={foodType}
          onChange={(e) => setFoodType(e.target.value)}
          className="w-full p-3 mb-4 bg-black border rounded"
        >
          <option value="">Select Food</option>
          <option value="1">Rice</option>
          <option value="2">Bread</option>
          <option value="3">Vegetables</option>
        </select>

        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="w-full p-3 mb-4 bg-black border rounded"
        />

        <input
          type="date"
          value={cookDate}
          onChange={(e) => setCookDate(e.target.value)}
          className="w-full p-3 mb-4 bg-black border rounded"
        />

        <input
          type="time"
          value={cookTime}
          onChange={(e) => setCookTime(e.target.value)}
          className="w-full p-3 mb-4 bg-black border rounded"
        />

        {/* PREDICT */}
        <button
          onClick={handlePredict}
          disabled={loading}
          className="w-full bg-green-500 py-3 rounded mb-3"
        >
          {loading ? "Predicting..." : "Predict Shelf Life"}
        </button>

        {/* RESULT */}
        {prediction && (
          <div className="mt-4 p-4 bg-green-900 rounded">
            <p>Shelf Life: {prediction.shelfLife} hrs</p>
            <p>Risk: {prediction.risk}</p>
            <p>NGO: {prediction.ngoName}</p>
          </div>
        )}

        {/* DONATE */}
        <button
          onClick={handleDonate}
          disabled={donating}
          className="w-full mt-4 py-3 rounded bg-blue-500 hover:bg-blue-600 text-white"
        >
          {donating ? "Submitting..." : "Donate Food"}
        </button>

      </div>
    </div>
  );
}