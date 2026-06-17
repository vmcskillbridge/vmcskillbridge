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
    cb(null, Date.now() + path.extname(file.originalname));
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
    cb(new Error("Only PDF, DOC and DOCX files are allowed"), false);
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

    sendEmail({
      to: req.body.email,
      subject: "Application Received - VMC SkillBridge",
      html: `
<div style="font-family:Arial,sans-serif;background:#f4f7fb;padding:40px 20px;">
  <div style="max-width:700px;margin:auto;background:white;border-radius:16px;overflow:hidden;box-shadow:0 10px 30px rgba(0,0,0,0.08);">
    <div style="background:linear-gradient(135deg,#2563eb,#7c3aed);padding:50px 30px;text-align:center;color:white;">
      <h1 style="margin:0;font-size:36px;font-weight:700;">VMC SkillBridge</h1>
      <p style="margin-top:12px;font-size:17px;">Where work meets skill.</p>
    </div>

    <div style="padding:40px;color:#1f2937;line-height:1.9;font-size:15px;">
      <h2 style="margin-top:0;color:#111827;">Application Received Successfully</h2>

      <p>Dear <b>${req.body.fullName}</b>,</p>

      <p>
        Thank you for your interest in joining <b>VMC SkillBridge</b> and for applying for the role of 
        <b>${req.body.position}</b>.
      </p>

      <p>
        We are pleased to confirm that your application, resume, and submitted details have been received successfully.
      </p>

      <p>
        Our hiring team will carefully review your profile, skills, experience, and overall suitability for the position.
        If your profile matches our current requirements, we will contact you regarding the next stage.
      </p>

      <div style="margin-top:30px;background:#f8fafc;border:1px solid #e5e7eb;border-radius:14px;padding:28px;">
        <h3 style="margin-top:0;color:#2563eb;">Selection Process</h3>
        <p>✅ Initial Application Review</p>
        <p>✅ Profile Shortlisting Based on Skills & Experience</p>
        <p>✅ Technical / HR Interaction</p>
        <p>✅ Final Discussion & Selection</p>
        <p>✅ Offer Confirmation & Onboarding Guidance</p>
      </div>

      <div style="text-align:center;margin-top:40px;">
        <a href="https://www.vmcskillbridge.com"
          style="background:#2563eb;color:white;padding:15px 30px;border-radius:10px;text-decoration:none;font-weight:600;display:inline-block;">
          Visit Our Website
        </a>
      </div>

      <p style="margin-top:45px;">
        We appreciate the time and effort you invested in your application and wish you the very best throughout the recruitment process.
      </p>

      <p>
        Sincerely,<br/>
        <b>VMC SkillBridge Hiring Team</b>
      </p>
    </div>
  </div>
</div>
      `,
    }).catch((err) => {
      console.log("Application received email failed:", err.message);
    });

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

/* GET APPLICATIONS */
router.get("/", async (req, res) => {
  try {
    const applications = await Application.find().sort({ createdAt: -1 });

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

/* UPDATE APPLICATION STATUS */
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

    if (status === "Accepted" || status === "Rejected") {
      const subject =
        status === "Accepted"
          ? "Application Accepted - VMC SkillBridge"
          : "Application Update - VMC SkillBridge";

      const html =
        status === "Accepted"
          ? `
<div style="font-family:Arial,sans-serif;background:#f4f7fb;padding:40px 20px;">
  <div style="max-width:700px;margin:auto;background:white;border-radius:16px;overflow:hidden;box-shadow:0 10px 30px rgba(0,0,0,0.08);">
    <div style="background:linear-gradient(135deg,#16a34a,#2563eb);padding:50px 30px;text-align:center;color:white;">
      <h1 style="margin:0;font-size:36px;font-weight:700;">VMC SkillBridge</h1>
      <p style="margin-top:12px;font-size:17px;">Where work meets skill.</p>
    </div>

    <div style="padding:40px;color:#1f2937;line-height:1.9;font-size:15px;">
      <h2 style="margin-top:0;color:#16a34a;">Application Accepted</h2>

      <p>Dear <b>${application.fullName}</b>,</p>

      <p>
        Congratulations! We are pleased to inform you that your application for the role of 
        <b>${application.position}</b> at <b>VMC SkillBridge</b> has been accepted.
      </p>

      <p>
        Our hiring team has reviewed your profile, skills, and submitted details, and we are happy to move your application to the next stage.
      </p>

      <div style="margin-top:30px;background:#f0fdf4;border:1px solid #bbf7d0;border-radius:14px;padding:28px;">
        <h3 style="margin-top:0;color:#16a34a;">Next Steps</h3>
        <p>✅ Final Profile Verification</p>
        <p>✅ HR / Technical Discussion</p>
        <p>✅ Offer Confirmation</p>
        <p>✅ Onboarding Process</p>
      </div>

      <div style="text-align:center;margin-top:40px;">
        <a href="https://www.vmcskillbridge.com"
          style="background:#16a34a;color:white;padding:15px 30px;border-radius:10px;text-decoration:none;font-weight:600;display:inline-block;">
          Visit Our Website
        </a>
      </div>

      <p style="margin-top:45px;">
        Our team will contact you shortly with further instructions regarding the next step.
      </p>

      <p>
        Sincerely,<br/>
        <b>VMC SkillBridge Hiring Team</b>
      </p>
    </div>
  </div>
</div>
          `
          : `
<div style="font-family:Arial,sans-serif;background:#f4f7fb;padding:40px 20px;">
  <div style="max-width:700px;margin:auto;background:white;border-radius:16px;overflow:hidden;box-shadow:0 10px 30px rgba(0,0,0,0.08);">
    <div style="background:linear-gradient(135deg,#dc2626,#7c3aed);padding:50px 30px;text-align:center;color:white;">
      <h1 style="margin:0;font-size:36px;font-weight:700;">VMC SkillBridge</h1>
      <p style="margin-top:12px;font-size:17px;">Where work meets skill.</p>
    </div>

    <div style="padding:40px;color:#1f2937;line-height:1.9;font-size:15px;">
      <h2 style="margin-top:0;color:#dc2626;">Application Status Update</h2>

      <p>Dear <b>${application.fullName}</b>,</p>

      <p>
        Thank you for applying for the role of <b>${application.position}</b> at <b>VMC SkillBridge</b>.
      </p>

      <p>
        We sincerely appreciate your interest, time, and effort in submitting your application.
      </p>

      <p>
        After careful review, we regret to inform you that your application has not been selected for this opportunity.
      </p>

      <div style="margin-top:30px;background:#fef2f2;border:1px solid #fecaca;border-radius:14px;padding:28px;">
        <h3 style="margin-top:0;color:#dc2626;">Important Note</h3>
        <p>
          This decision does not reflect negatively on your skills or potential. 
          We encourage you to apply again for future opportunities that match your profile.
        </p>
      </div>

      <div style="text-align:center;margin-top:40px;">
        <a href="https://www.vmcskillbridge.com"
          style="background:#2563eb;color:white;padding:15px 30px;border-radius:10px;text-decoration:none;font-weight:600;display:inline-block;">
          Visit Our Website
        </a>
      </div>

      <p style="margin-top:45px;">
        We wish you all the best in your career and future opportunities.
      </p>

      <p>
        Sincerely,<br/>
        <b>VMC SkillBridge Hiring Team</b>
      </p>
    </div>
  </div>
</div>
          `;

      await sendEmail({
        to: application.email,
        subject,
        html,
      });
    }

    res.json({
      success: true,
      message:
        status === "Pending"
          ? "Application status updated"
          : `Application ${status} and email sent`,
      application,
    });
  } catch (error) {
    console.log("Status update/email error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

/* DELETE APPLICATION */
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