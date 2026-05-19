const express = require("express");
const multer = require("multer");
const path = require("path");

const Application = require("../models/Application");
const sendEmail = require("../utils/sendEmail");

const router = express.Router();

/* FILE STORAGE */

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

      /* SEND EMAIL */

      await sendEmail({
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
              Our hiring team will carefully review 
              your application and contact you if 
              your profile is shortlisted.
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


router.delete("/:id", async (req, res) => {
  try {
    await Application.findByIdAndDelete(req.params.id);

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