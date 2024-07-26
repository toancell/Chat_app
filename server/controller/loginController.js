const UserModel= require('../models/userModel')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const loginController = async (req,res) => {
    try{
        const {email,password} = req.body;
        const user = await UserModel.findOne({email})
        if(!user){
            return res.status(404).json({
                message: "Email khong ton tai",
                err: true,
            })
        }
        const verifyPassword = await bcrypt.compare(password, user.password)
        if(!verifyPassword){
            return res.status(404).json({
                message: "Sai mat khau",
                err: true,
            })
        }
        const tokenData = {
            id: user._id,
            email: user.email,
        }
        const cookieOptions ={
            httpOnly: true,
            maxAge: 1 * 60 * 60 * 24 *1000,
            secure: true,
            
        }
        const token = await jwt.sign(tokenData, process.env.JWT_SECRET, {expiresIn:"5d"})
        res.cookie('token',token,cookieOptions)
        return res.status(200).json({
            message: "Login successful",
            data: user,
            success: true,
            token:token
            
        })
    }catch(err){
        return res.status(401).json({
            message: err.message,
            err: true
        })
    }
}
module.exports = {loginController}