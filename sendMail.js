import { createTransport } from 'nodemailer';

async function sendMail({ name, email, message }) {
  const transporter = createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: email,
    to: 'kontrasports360@gmail.com',
    subject: 'New message from Kontra Sports contact form',
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  await transporter.sendMail(mailOptions);
}

export default sendMail;