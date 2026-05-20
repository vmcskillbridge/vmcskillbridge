const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async ({ to, subject, html }) => {
  try {
    const data = await resend.emails.send({
      from: "VMC SkillBridge <noreply@vmcskillbridge.com>",
      to,
      subject,
      html,
    });

    console.log("EMAIL SENT:", data);
  } catch (error) {
    console.log("EMAIL ERROR:", error);
  }
};

module.exports = sendEmail;