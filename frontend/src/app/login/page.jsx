"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { loginUser } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await loginUser({ email, password });

      if (res.token) {
        localStorage.setItem("token", res.token);
        setShowPopup(true);

        setTimeout(() => {
          router.replace("/role");
        }, 1500);
      } else {
        alert(res.message || "Login failed");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white px-4">

      {/* LOGIN CARD */}
      <motion.div
        className="w-full max-w-md p-8 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-xl"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold mb-6 text-center">
          Login to SmartFood
        </h1>

        <input
          className="w-full p-3 mb-4 rounded-lg bg-black/40 border border-white/20 outline-none"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full p-3 mb-6 rounded-lg bg-black/40 border border-white/20 outline-none"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full py-3 rounded-lg bg-gradient-to-r from-green-400 to-blue-500 text-black font-semibold"
        >
          Login
        </button>
      </motion.div>

      {/* SUCCESS POPUP */}
      {showPopup && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-black/50 text-xl"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
        >
          ✅ Login Successful!
        </motion.div>
      )}
    </div>
  );
}