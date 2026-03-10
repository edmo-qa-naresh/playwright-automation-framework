import nodemailer from "nodemailer";
import path from "path";

export async function sendTestEmail() {

  const transporter = nodemailer.createTransport({
    service: "Outlook",
    auth: {
      user: process.env.SENDER_EMAIL,
      pass: process.env.SENDER_PASS
    }
  });

  const attachmentPath = path.join(__dirname, "../test-data/transcript.pdf");

  await transporter.sendMail({
    from: process.env.SENDER_EMAIL,
    to: process.env.RECEIVER_EMAIL,
    subject: "PLAYWRIGHT_TRANSCRIPT_TEST",
    text: "Automation transcript upload",
    attachments: [
      {
        filename: "transcript.pdf",
        path: attachmentPath
      }
    ]
  });

  console.log("Test email sent successfully");
}