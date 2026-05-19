const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    fullName: String,
    email: String,
    phone: String,
    company: String,
    projectType: String,
    budget: String,
    timeline: String,
    description: String,

    fileName: String,

    fileUrl: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Contact", contactSchema);