const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    position: {
      type: String,
      required: true,
    },

    experience: {
      type: String,
    },

    resume: {
      type: String,
    },

    coverLetter: {
      type: String,
    },

    status: {
      type: String,
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Application",
  applicationSchema
);