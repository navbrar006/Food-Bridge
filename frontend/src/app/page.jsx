"use client";

import Navbar from "./components/Navbar";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  return (
    <>
      <Navbar />

      <div className="relative min-h-screen bg-black text-white overflow-hidden">

        {/* 🌌 Background Glow */}
        <div className="absolute w-[600px] h-[600px] bg-green-500/20 blur-[140px] rounded-full top-[-150px] left-[-150px]" />
        <div className="absolute w-[500px] h-[500px] bg-blue-500/20 blur-[140px] rounded-full bottom-[-150px] right-[-150px]" />

        {/* 🧠 HERO */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 min-h-screen">

          <motion.h1
            className="text-5xl md:text-7xl font-bold leading-tight bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Transforming Food Waste <br />
            Into Opportunities for Life
          </motion.h1>

          <motion.p
            className="mt-8 text-lg md:text-xl text-gray-300 max-w-3xl leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            SmartFood is an AI-powered platform designed to bridge the gap 
            between food surplus and food scarcity. By intelligently connecting 
            donors, NGOs, and volunteers, we ensure that excess food is 
            redistributed safely, efficiently, and in real-time — reducing waste 
            while feeding those in need.
          </motion.p>

          {/* ✅ FIXED BUTTON */}
          <motion.button
            onClick={() => router.push("/login")}
            className="mt-10 px-10 py-4 rounded-full bg-gradient-to-r from-green-400 to-blue-500 text-black font-semibold shadow-lg hover:scale-110 transition"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started
          </motion.button>

        </div>

        {/* 🚀 FEATURES */}
        <div className="relative z-10 px-6 pb-32">

          <motion.h2
            className="text-3xl md:text-5xl font-bold text-center mb-20 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            Intelligent System Capabilities
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">

            {/* CARD 1 */}
            <motion.div
              className="group relative p-[1px] rounded-2xl bg-gradient-to-br from-green-400/40"
              whileHover={{ y: -10 }}
            >
              <div className="rounded-2xl bg-black/80 p-8 border border-white/10">
                <div className="text-4xl mb-4">🧠</div>
                <h3 className="text-xl font-semibold mb-3">
                  AI Shelf-Life Prediction
                </h3>
                <p className="text-gray-400">
                  Predicts food safety using real-time environmental factors.
                </p>
              </div>
            </motion.div>

            {/* CARD 2 */}
            <motion.div
              className="group relative p-[1px] rounded-2xl bg-gradient-to-br from-blue-400/40"
              whileHover={{ y: -10 }}
            >
              <div className="rounded-2xl bg-black/80 p-8 border border-white/10">
                <div className="text-4xl mb-4">📍</div>
                <h3 className="text-xl font-semibold mb-3">
                  Smart Matching
                </h3>
                <p className="text-gray-400">
                  Connects donors and NGOs intelligently based on location.
                </p>
              </div>
            </motion.div>

            {/* CARD 3 */}
            <motion.div
              className="group relative p-[1px] rounded-2xl bg-gradient-to-br from-purple-400/40"
              whileHover={{ y: -10 }}
            >
              <div className="rounded-2xl bg-black/80 p-8 border border-white/10">
                <div className="text-4xl mb-4">🤖</div>
                <h3 className="text-xl font-semibold mb-3">
                  AI Chatbot
                </h3>
                <p className="text-gray-400">
                  Donate food using simple text or voice commands.
                </p>
              </div>
            </motion.div>

          </div>
        </div>

        {/* 🎯 PURPOSE */}
        <div className="relative z-10 px-6 py-28 max-w-6xl mx-auto">

          <h2 className="text-4xl text-center mb-20">
            Our Purpose
          </h2>

          <div className="grid md:grid-cols-2 gap-12">

    {/* 🌍 VISION CARD */}
    <motion.div
      className="relative group p-10 rounded-3xl bg-white/5 backdrop-blur-2xl border border-white/10 shadow-2xl overflow-hidden"
      initial={{ opacity: 0, x: -80 }}
      whileInView={{ opacity: 1, x: 0 }}
      whileHover={{ scale: 1.05, rotate: -1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-400/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition duration-500"></div>

      {/* Floating Blob */}
      <div className="absolute w-40 h-40 bg-green-400/20 blur-3xl rounded-full -top-10 -left-10 animate-pulse"></div>

      <h3 className="text-2xl font-semibold mb-4">🌍 Vision</h3>

      <p className="text-gray-300 leading-relaxed">
        To eliminate global food waste using intelligent technology and build a 
        sustainable ecosystem where every surplus meal is efficiently redirected 
        to those in need. We envision a future where hunger is reduced through 
        smart automation, real-time decision-making, and community collaboration.
      </p>
    </motion.div>

    {/* 🎯 MISSION CARD */}
    <motion.div
      className="relative group p-10 rounded-3xl bg-white/5 backdrop-blur-2xl border border-white/10 shadow-2xl overflow-hidden"
      initial={{ opacity: 0, x: 80 }}
      whileInView={{ opacity: 1, x: 0 }}
      whileHover={{ scale: 1.05, rotate: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition duration-500"></div>

      {/* Floating Blob */}
      <div className="absolute w-40 h-40 bg-blue-400/20 blur-3xl rounded-full -bottom-10 -right-10 animate-pulse"></div>

      <h3 className="text-2xl font-semibold mb-4">🎯 Mission</h3>

      <p className="text-gray-300 leading-relaxed">
        Our mission is to develop an AI-powered food redistribution platform 
        that connects donors, NGOs, and volunteers seamlessly. By integrating 
        smart matching algorithms, shelf-life prediction models, and intuitive 
        user interaction, we aim to ensure safe, fast, and efficient food delivery 
        to the right people at the right time.
      </p>
    </motion.div>

  </div>
</div>
      </div>
    </>
  );
}