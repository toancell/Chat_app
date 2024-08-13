const sendMail = require("../sendMail/sendMail");
const UserModel = require("../models/userModel");
const hassPassword = require("../helpers/hashPassword");
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const checkUser = await UserModel.findOne({ email })
    if (!checkUser) {
      return res.status(401).json({
        message: " user not exit",
        err: true,
      });
    }
    
    const alpha = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let password = "";
    for (let i = 0; i < 10; i++) {
      const randomIndex = Math.floor(Math.random() * alpha.length);
      password += alpha[randomIndex];
    }
    const html = `<p>Day la mat khau moi: <strong>${password}</strong>. </p>`;
    await sendMail(email, html);
    
    const hasspassword= await hassPassword(password);
    checkUser.password = hasspassword;
    await checkUser.save();

    return res.status(400).json({
      messsage: "Email verify",
      success: true,
      data: checkUser,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
      err: true,
    });
  }
};
module.exports = { forgotPassword };
