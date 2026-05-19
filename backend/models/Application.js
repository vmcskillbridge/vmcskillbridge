const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    fullName: String,
    location: String,
    email: String,
    portfolio: String,
    phone: String,
    position: String,
    message: String,
    experience: String,
    fileName: String,
    fileUrl: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Application", applicationSchema);