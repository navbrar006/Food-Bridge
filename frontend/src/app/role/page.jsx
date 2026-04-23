"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function RolePage() {
  const router = useRouter();

  const roles = [
    { name: "Donor", path: "/donor", color: "from-green-400 to-green-600" },
    { name: "NGO", path: "/ngo", color: "from-blue-400 to-blue-600" },
    { name: "Volunteer", path: "/volunteer", color: "from-purple-400 to-pink-500" },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-6">

      <h1 className="text-4xl font-bold mb-2">Choose Your Role</h1>

      <p className="text-gray-400 mb-10">
        Select how you want to use SmartFood
      </p>

      <div className="grid md:grid-cols-3 gap-6 w-full max-w-5xl">

        {roles.map((role, i) => (
          <motion.div
            key={i}
            onClick={() => router.push(role.path)}
            className="cursor-pointer p-6 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-xl"
            whileHover={{ scale: 1.05, y: -10 }}
          >
            <h2 className={`text-xl font-bold bg-gradient-to-r ${role.color} bg-clip-text text-transparent`}>
              {role.name}
            </h2>

            <p className="text-gray-400 text-sm mt-2">
              Continue as {role.name}
            </p>

            <button className="mt-6 px-4 py-2 bg-white text-black rounded-full">
              Select
            </button>
          </motion.div>
        ))}

      </div>
    </div>
  );
}