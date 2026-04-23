"use client";

import { useState } from "react";

export default function DonatePage() {
  const [form, setForm] = useState({
    food_type: "",
    quantity: "",
    temperature: "",
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // 🔥 handle input
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // 🔥 submit donation
  const handleSubmit = async () => {
    try {
      // validation
      if (!form.food_type || !form.quantity || !form.temperature) {
        alert("Please fill all fields");
        return;
      }

      setLoading(true);

      const res = await fetch("http://localhost:5000/api/donations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
         food_type: parseInt(form.food_type), // ✅ important
          quantity: Number(form.quantity),
          temperature: Number(form.temperature),
          location: {
            lat: 30.7333,   // dummy (Chandigarh)
            lng: 76.7794
          },
          cooked_time: new Date(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Something went wrong");
      } else {
        setResult(data);
      }

    } catch (err) {
      console.error(err);
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white px-4">

      <div className="w-full max-w-md p-8 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-xl">

        <h1 className="text-2xl font-bold mb-6 text-center">
          Donate Food 🍱
        </h1>

        {/* 🔽 FOOD TYPE */}
        <select
          name="food_type"
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded-lg bg-black/40 border border-white/20"
        >
          <option value="">Select Food Type</option>
          <option value="1">Rice</option>
          <option value="2">Bread</option>
          <option value="3">Vegetables</option>
        </select>

        {/* 🔽 QUANTITY */}
        <input
          name="quantity"
          type="number"
          placeholder="Quantity"
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded-lg bg-black/40 border border-white/20"
        />

        {/* 🔽 TEMPERATURE */}
        <input
          name="temperature"
          type="number"
          placeholder="Temperature (°C)"
          onChange={handleChange}
          className="w-full p-3 mb-6 rounded-lg bg-black/40 border border-white/20"
        />

        {/* 🔥 BUTTON */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full py-3 rounded-lg bg-gradient-to-r from-green-400 to-blue-500 text-black font-semibold"
        >
          {loading ? "Processing..." : "Donate"}
        </button>

        {/* 🔥 RESULT */}
        {result && (
          <div className="mt-6 p-4 rounded-lg bg-green-500/20 border border-green-400">

            <p className="mb-2">
              ⏳ Shelf Life: <b>{result.shelfLife} hrs</b>
            </p>

            <p className="mb-2">
              ⚠ Risk Level: <b>{result.donation?.risk_level}</b>
            </p>

            <p>
              🏢 Assigned NGO: <b>{result.ngoName}</b>
            </p>

          </div>
        )}

      </div>
    </div>
  );
}