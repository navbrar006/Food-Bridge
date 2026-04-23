const mongoose = require("mongoose");

const ngoSchema = new mongoose.Schema({
  name: String,

  location: {
    lat: Number,
    lng: Number
  }

});

module.exports = mongoose.model("NGO", ngoSchema);