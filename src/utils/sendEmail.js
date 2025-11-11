import nodemailer from "nodemailer";

export const sendmail = async (to, subject, htmlContent) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      port: 567,
      secure: true,
      auth: {
        user: "dreamdev87@gmail.com",
        pass: process.env.Email,
      },
      tls: {
        rejectUnauthorized: false, // <-- this ignores self-signed cert errors
      },
    });

    const mailOptions = {
      from: "dreamdev87@gmail.com",
      to: to,
      subject: subject,
      html: htmlContent,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(" Email sent:", info.response);
    return info;
  } catch (error) {
    console.error(" Email sending failed:", error);
    throw error;
  }
};

export const sendmailWithsender = async (from, to, subject, htmlContent) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      port: 567,
      secure: true,
      auth: {
        user: "dreamdev87@gmail.com",
        pass: process.env.Email,
      },
      tls: {
        rejectUnauthorized: false, // <-- this ignores self-signed cert errors
      },
    });

    const mailOptions = {
      from: from,
      to: to,
      subject: subject,
      html: htmlContent,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(" Email sent:", info.response);
    return info;
  } catch (error) {
    console.error(" Email sending failed:", error);
    throw error;
  }
};
