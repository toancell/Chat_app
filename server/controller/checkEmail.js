const UserModel = require('../models/userModel')

async function checkEmail( req, res){
    try{
        const {email} = req.body
        const checkUser = await UserModel.findOne({email}).select("-password")
        if(!checkUser){
            return res.status(401).json({
                message: " user not exit",
                err: true,
            })
        }
        return res.status(400).json({
                messsage: "Email verify",
                success: true,
                data: checkUser
        })
    }catch(err){
        return res.status(404).json({
            message: err.message,
            err: true
        })
    }
}
module.exports = {checkEmail}