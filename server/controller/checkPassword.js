const UserModel = require('../models/userModel');
const bcrypt= require("bcrypt")
const jwt = require("jsonwebtoken")
async function checkPassword(req,res){
    try{
        const {password, userId} = req.body;
        const user = await UserModel.findById(userId)
        const verifyPassword = await bcrypt.compare(password, user.password)
        if(!verifyPassword){
            return res.status(400).json({
                message: " Please check your password and try again",
                err: true,
            })
        }
        const tokenData={
            id: user._id,
            email: user.email
        }
        const token = await jwt.sign(tokenData,process.env.JWT_SECRET,{expiresIn:"1d"})
        const cookieOptions ={
            http: true,
            secure: true
        }
        return res.cookie("token", token, cookieOptions).status(200).json({
            message: "Login successful",
            data: user,
            success: true,
        })
        

    }catch(err){
        return req.status(404).json({
            message: err.message,
            err: true,
        })
    }
    
}
module.exports= {checkPassword}