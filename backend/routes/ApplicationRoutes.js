const express = require("express");
const multer = require("multer");
const path = require("path");

const Application = require("../models/Application");
const sendEmail = require("../utils/sendEmail");

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

      /* SEND EMAIL WITHOUT BLOCKING RESPONSE */

      sendEmail({
        to: req.body.email,

        subject:
          "Application Received - VMC SkillBridge",

        html: `
          <div style="font-family: Arial; padding: 30px; background:#0b0b18; color:white;">
            
            <h1 style="color:#8b5cf6;">
              VMC SkillBridge
            </h1>

            <h2>
              Application Received Successfully
            </h2>

            <p>
              Dear <b>${req.body.fullName}</b>,
            </p>

            <p>
              Thank you for applying for the 
              <b>${req.body.position}</b> role at 
              VMC SkillBridge.
            </p>

            <p>
              Our hiring team will review your 
              application and contact you if shortlisted.
            </p>

            <div style="margin-top:30px; padding:20px; background:#151528; border-radius:12px;">
              
              <p>
                <b>Position:</b> ${req.body.position}
              </p>

              <p>
                <b>Experience:</b> ${req.body.experience}
              </p>

              <p>
                <b>Status:</b> Received
              </p>
            </div>

            <p style="margin-top:30px;">
              Best Regards,
            </p>

            <b>
              VMC SkillBridge Hiring Team
            </b>

          </div>
        `,
      }).catch((err) => {
        console.log(
          "Email failed:",
          err.message
        );
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

router.put("/:id/status", async (req, res) => {
  try {
    const { status } = req.body;

    const application = await Application.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    await sendEmail({
      to: application.email,
      subject:
        status === "Accepted"
          ? "Application Accepted - VMC SkillBridge"
          : "Application Update - VMC SkillBridge",
      html: `
        <div style="font-family: Arial; padding: 25px;">
          <h2>VMC SkillBridge</h2>
          <p>Dear <b>${application.fullName}</b>,</p>
          <p>Your application for <b>${application.position}</b> has been <b>${status}</b>.</p>
          <p>Best regards,<br/>VMC SkillBridge Team</p>
        </div>
      `,
    });

    res.json({
      success: true,
      application,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;