"use client";
import { useState } from "react";

export default function VolunteerPage() {
  const [task, setTask] = useState({
    pickup: "Sector 21",
    drop: "NGO Center",
    status: "Pending"
  });

  const updateStatus = (newStatus) => {
    setTask({ ...task, status: newStatus });
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">

      <h1 className="text-3xl font-bold mb-6">🚴 Volunteer Dashboard</h1>

      <div className="bg-white/10 p-6 rounded">

        <p>Pickup: {task.pickup}</p>
        <p>Drop: {task.drop}</p>
        <p>Status: {task.status}</p>

        <div className="mt-4 flex gap-3">

          <button
            onClick={() => updateStatus("Picked Up")}
            className="bg-green-500 px-4 py-2 rounded"
          >
            Picked Up ✅
          </button>

          <button
            onClick={() => updateStatus("Delivered")}
            className="bg-blue-500 px-4 py-2 rounded"
          >
            Delivered ✅
          </button>

        </div>

      </div>
    </div>
  );
}