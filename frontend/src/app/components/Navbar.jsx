"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const router = useRouter();

  return (
    <nav className="fixed top-0 w-full z-50 flex justify-between items-center px-8 py-4 backdrop-blur-xl bg-white/80 dark:bg-black/80 border-b border-gray-200 dark:border-gray-800 shadow-md transition">

      {/* Logo */}
      <h1
        onClick={() => router.push("/")}
        className="cursor-pointer text-2xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent"
      >
        SmartFood
      </h1>

      {/* Links */}
      <div className="hidden md:flex items-center gap-8 text-sm text-black dark:text-white">
        <a href="#" className="hover:opacity-70">Home</a>
        <a href="#" className="hover:opacity-70">Features</a>
        <a href="#" className="hover:opacity-70">About</a>
        <a href="#" className="hover:opacity-70">Contact</a>
        <Link href="/ngo" className="hover:opacity-70">
NGO
</Link>
      {/* </div>

      {/* Actions */}
      <div className="flex items-center gap-4">

       

        {/* Login */}
        <button
          onClick={() => router.push("/login")}
          className="px-5 py-2 rounded-full bg-gradient-to-r from-green-400 to-blue-500 text-black font-semibold hover:scale-105 transition"
        >
          Login
        </button>

        {/* Signup */}
        <Link href="/signup">
          <button className="px-5 py-2 rounded-full bg-green-500 text-white hover:scale-105 transition">
            Signup
          </button>
        </Link>

      </div>
    </nav>
  );
}