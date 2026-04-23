const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const donationRoutes = require("./routes/donationRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

// CORS
app.use(cors({
  origin: [
    "http://localhost:3000",
    "http://localhost:3001",
    "http://localhost:3002",
    "http://localhost:3003",
    "http://localhost:3004"
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true
}));

// FIX HERE 🔥
app.options(/.*/, cors());

app.use(express.json());

// routes
app.use("/api/donations", donationRoutes);
app.use("/api/auth", authRoutes);

// DB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// server
app.listen(5000, () => {
  console.log("Server running on 5000");
});