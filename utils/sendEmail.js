import nodemailer from "nodemailer";

export async function sendEmail(dest, subject, message) {
  let transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const info = await transporter.sendMail({
    from: "social App <social@info.com>",
    to: dest,
    subject,
    html: message,
  });
  return info;
}
