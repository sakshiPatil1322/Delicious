const nodemailer = require('nodemailer');

// Create transporter object with SMTP server details
const transporter = nodemailer.createTransport({
  service: 'Gmail', // You can use another service like 'Yahoo', 'Outlook', etc.
  auth: {
    user: 'sakshipatil5333@gmail.com', // Replace with your email
    pass: 'ayscmhjacilzhjts'   // Replace with your email password
  }
});

// Function to handle mail sending
const sendMail = (req, res) => {
  const { email1, email, subject, message } = req.body;

  const mailOptions = {
    // from: email,
    to: email,
    subject: `${subject} - from ${email1}`,
    text: message,
    replyTo: email1
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      res.status(500).send('Failed to send email. Please try again.');
    } else {
      res.redirect("/");
    }
  });
};


module.exports = { sendMail };
