const UserModel = require('../models/userModel');

const bcrypt = require('bcrypt');
const hassPassword = require('../helpers/hashPassword');

const registerController = async (req,res) =>{
    try{
        const {name,password, email, profile_pic} = req.body
        const checkemail = await UserModel.findOne({email})
        if(checkemail){
            return res.status(400).json({
                message: " Email da ton tai ",
                err: true,
            })
        }

        const hashpassword = await hassPassword(password)

        const payload= {
            name, password: hashpassword, email, profile_pic
        }
        const user = new UserModel(payload)
        await user.save()
        return res.status(200).json({
            message: "Create user successfully",
            data: user,
            success: true,
        })
    }catch(err){
        return res.status(500).json({
            message: err.message,
            err: true
        })
    }
}

module.exports = {registerController}