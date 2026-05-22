const express = require("express");
const multer = require("multer");
const path = require("path");

const Application = require("../models/Application");
const sendEmail = require("../utils/sendEmail");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only PDF, DOC and DOCX files are allowed"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

router.post("/", upload.single("resume"), async (req, res) => {
  try {
    const application = await Application.create({
      fullName: req.body.fullName,
      location: req.body.location,
      email: req.body.email,
      portfolio: req.body.portfolio,
      phone: req.body.phone,
      position: req.body.position,
      message: req.body.message,
      experience: req.body.experience,
      status: "Pending",

      fileName: req.file ? req.file.filename : "",
      fileUrl: req.file ? `/uploads/${req.file.filename}` : "",
    });

    await sendEmail({
      to: req.body.email,
      subject: "Application Received - VMC SkillBridge",
      html: `
        <div style="font-family: Arial; padding: 25px; line-height:1.7;">
          <h2>VMC SkillBridge</h2>

          <p>Dear <b>${req.body.fullName}</b>,</p>

          <p>
            Thank you for applying for <b>${req.body.position}</b>.
          </p>

          <p>
            Your application has been received successfully.
          </p>

          <p>
            Our recruitment team will review your profile shortly.
          </p>

          <p>
            Best regards,<br/>
            VMC SkillBridge Team
          </p>
        </div>
      `,
    });

    setTimeout(async () => {
      try {
        await sendEmail({
          to: req.body.email,
          subject: "Application Shortlisted - VMC SkillBridge",
          html: `
            <div style="font-family: Arial; padding: 25px; line-height:1.7;">
              <h2>VMC SkillBridge</h2>

              <p>Dear Applicant,</p>

              <p>
                We are pleased to inform you that your application has been
                successfully shortlisted for the next stage at VMC SkillBridge.
              </p>

              <p>
                Our team will contact you shortly with further details regarding
                the interview process and next steps.
              </p>

              <p>
                Thank you for your interest in joining VMC SkillBridge.
              </p>

              <p>
                Best regards,<br/>
                VMC SkillBridge Team
              </p>
            </div>
          `,
        });
      } catch (error) {
        console.log("Delayed shortlisted mail error:", error.message);
      }
    }, 5 * 60 * 1000);

    res.status(201).json({
      success: true,
      application,
    });
  } catch (error) {
    console.log("Application submit error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const applications = await Application.find().sort({
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

router.put("/:id/status", async (req, res) => {
  try {
    const { status } = req.body;

    if (!["Accepted", "Rejected", "Pending"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status",
      });
    }

    const application = await Application.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    const isAccepted = status === "Accepted";

    await sendEmail({
      to: application.email,
      subject: isAccepted
        ? "Application Accepted - VMC SkillBridge"
        : "Application Update - VMC SkillBridge",
      html: `
        <div style="font-family: Arial; padding: 25px; line-height: 1.7;">
          <h2 style="color:#2563eb;">VMC SkillBridge</h2>

          <p>Dear <b>${application.fullName}</b>,</p>

          ${
            isAccepted
              ? `
              <p>
                We are pleased to inform you that your application for 
                <b>${application.position}</b> has been <b>Accepted</b>.
              </p>
              <p>
                Our team will contact you shortly with the next steps.
              </p>
            `
              : `
              <p>
                Thank you for applying for <b>${application.position}</b> at VMC SkillBridge.
              </p>
              <p>
                After careful review, we regret to inform you that your application
                has been <b>Rejected</b> at this time.
              </p>
              <p>
                We appreciate your interest and encourage you to apply again for future opportunities.
              </p>
            `
          }

          <p>
            Best regards,<br/>
            <b>VMC SkillBridge Team</b>
          </p>
        </div>
      `,
    });

    res.json({
      success: true,
      application,
    });
  } catch (error) {
    console.log("Status update error:", error);

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