const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },

    location: {
      type: String,
    },

    email: {
      type: String,
      required: true,
    },

    portfolio: {
      type: String,
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

    message: {
      type: String,
    },

    fileName: {
      type: String,
    },

    fileUrl: {
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