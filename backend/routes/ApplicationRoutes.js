const express = require("express");
const multer = require("multer");
const path = require("path");

const Application = require("../models/Application");

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

/* FILE FILTER */

const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "Only PDF, DOC and DOCX files are allowed"
      ),
      false
    );
  }
};

/* MULTER */

const upload = multer({
  storage,
  fileFilter,

  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

/* SUBMIT APPLICATION */

router.post(
  "/",
  upload.single("resume"),
  async (req, res) => {
    try {
      const application =
        await Application.create({
          fullName: req.body.fullName,
          location: req.body.location,
          email: req.body.email,
          portfolio: req.body.portfolio,
          phone: req.body.phone,
          position: req.body.position,
          message: req.body.message,
          experience: req.body.experience,

          fileName: req.file
            ? req.file.filename
            : "",

          fileUrl: req.file
            ? `/uploads/${req.file.filename}`
            : "",
        });

      res.status(201).json({
        success: true,
        application,
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
);

/* GET APPLICATIONS */

router.get("/", async (req, res) => {
  try {
    const applications =
      await Application.find().sort({
        createdAt: -1,
      });

    res.json({
      success: true,
      applications,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

/* DELETE APPLICATION */

router.delete("/:id", async (req, res) => {
  try {
    await Application.findByIdAndDelete(
      req.params.id
    );

    res.json({
      success: true,
      message: "Application deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;