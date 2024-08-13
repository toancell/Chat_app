const nodemailer = require("nodemailer");
const sendMail = async (receiver,html) =>{
  const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.PASS_WORD_MAIL,
  },
});


// async..await is not allowed in global scope, must use a wrapper

try {
  // send mail with defined transport object
  await transporter.sendMail({
    from: process.env.EMAIL_ADDRESS, // sender address should be a valid email
    to: receiver, // list of receivers
    subject: "Re-issue password", // Subject line
    html: html, // html body
  });
} catch (error) {
  console.error("Error sending email: ", error);
  throw error;
}
}


module.exports = sendMail
