const nodemailer = require('nodemailer');

exports.sendMail = (to,Subject, htmlContent) =>{
  const transport = nodeMailer.createTransport({
    host: 
    post: 
    serure: false,
    auth:{
      user:
      pass: 
    }
  })
  const options = {
    from: ,
    to: to,
    subject:subject,
    html: htmlContent,
  }
  return transport.sendMail(options)
}