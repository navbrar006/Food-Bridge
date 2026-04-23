"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "@/lib/auth";

export default function SignupPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "donor",
  });
const handleSignup = async () => {
  try {
    const res = await registerUser(form);

    console.log("RESPONSE:", res); // 👈 debug

    if (res.msg === "User registered successfully") {
      alert("Signup successful");
      router.push("/login");
    } else {
      alert(res.msg || "Signup failed");
    }
  } catch (err) {
    console.error(err);
    alert("Server error");
  }
};

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">

      {/* 🔥 BACKGROUND OVERLAY */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-md"></div>

      {/* 🔥 FORM CARD */}
      <div className="relative z-10 w-full max-w-md p-8 rounded-2xl shadow-xl bg-white dark:bg-gray-900 text-black dark:text-white">

        <h2 className="text-2xl font-bold mb-6 text-center">
          Create Account
        </h2>

        <input
          className="w-full p-3 mb-4 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 outline-none"
          placeholder="Name"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          className="w-full p-3 mb-4 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 outline-none"
          placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          className="w-full p-3 mb-4 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 outline-none"
          placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <select
          className="w-full p-3 mb-6 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
          onChange={(e) => setForm({ ...form, role: e.target.value })}
        >
          <option value="donor">Donor</option>
          <option value="ngo">NGO</option>
        </select>

        <button
          onClick={handleSignup}
          className="w-full py-3 rounded-lg bg-gradient-to-r from-green-400 to-blue-500 text-black font-semibold hover:scale-105 transition"
        >
          Signup
        </button>

        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <span
            onClick={() => router.push("/login")}
            className="text-blue-500 cursor-pointer"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}