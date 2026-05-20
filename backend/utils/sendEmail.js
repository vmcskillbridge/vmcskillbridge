const nodemailer = require("nodemailer");

const sendEmail = async ({ to, subject, html }) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",

      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: `"VMC SkillBridge" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });

    console.log("EMAIL SENT:", info.response);
  } catch (error) {
    console.log("EMAIL ERROR:", error);
  }
};

module.exports = sendEmail;