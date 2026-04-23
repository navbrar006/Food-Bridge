"use client";

import { useEffect, useState } from "react";
import API_BASE from "../../lib/api";

export default function NGOPage() {
  const [donations, setDonations] = useState([]);

  // 🔥 Fetch donations
  useEffect(() => {
    fetch(`${API_BASE}/donations/sorted`)
      .then(res => res.json())
      .then(data => {
        console.log("DATA:", data);
        setDonations(data);
      })
      .catch(err => console.error(err));
  }, []);

  // ✅ Accept / Reject
  const updateStatus = async (id, status) => {
    await fetch(`${API_BASE}/donations/${id}/status`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status })
    });

    // Refresh list
    setDonations(prev =>
      prev.map(d =>
        d._id === id ? { ...d, status } : d
      )
    );
  };

  return (
    <div className="min-h-screen bg-black text-white p-10">
      <h1 className="text-3xl font-bold mb-6">NGO Dashboard</h1>

      {donations.length === 0 ? (
        <p>No donations available</p>
      ) : (
        <div className="grid gap-6">
          {donations.map(d => (
            <div
              key={d._id}
              className="p-6 rounded-xl bg-white/10 border border-white/20"
            >
              <h2 className="text-xl font-semibold">
                {d.foodType}
              </h2>

              <p>Quantity: {d.quantity}</p>
              <p>Status: {d.status || "Pending"}</p>

              <div className="flex gap-4 mt-4">
                <button
                  onClick={() => updateStatus(d._id, "accepted")}
                  className="px-4 py-2 bg-green-500 rounded"
                >
                  Accept
                </button>

                <button
                  onClick={() => updateStatus(d._id, "rejected")}
                  className="px-4 py-2 bg-red-500 rounded"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}