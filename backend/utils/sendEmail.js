const { Resend } = require("resend");

const sendEmail = async ({ to, subject, html }) => {
  if (!process.env.RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY is missing");
  }

  if (!to) {
    throw new Error("Applicant email is missing");
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  const { data, error } = await resend.emails.send({
    from: "VMC SkillBridge <noreply@vmcskillbridge.com>",
    to,
    subject,
    html,
  });

  if (error) {
    console.log("RESEND ERROR:", error);
    throw new Error(error.message || "Failed to send email");
  }

  console.log("EMAIL SENT:", data);
  return data;
};

module.exports = sendEmail;