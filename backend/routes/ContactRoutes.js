const express = require("express");
const multer = require("multer");
const path = require("path");

const Contact = require("../models/Contact");

const router = express.Router();

/* STORAGE */

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    cb(
      null,
      Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage });

/* ADD CONTACT */

router.post(
  "/",
  upload.single("file"),
  async (req, res) => {
    try {
      const newContact = new Contact({
        fullName: req.body.fullName,
        email: req.body.email,
        phone: req.body.phone,
        company: req.body.company,
        projectType: req.body.projectType,
        budget: req.body.budget,
        timeline: req.body.timeline,
        description: req.body.description,

        fileName: req.file
          ? req.file.filename
          : "",

        fileUrl: req.file
          ? `/uploads/${req.file.filename}`
          : "",
      });

      await newContact.save();

      res.status(201).json({
        success: true,
        contact: newContact,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
);

/* GET CONTACTS */

router.get("/", async (req, res) => {
  try {
    const contacts = await Contact.find().sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      contacts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Contact deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;