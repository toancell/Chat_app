const jwt = require("jsonwebtoken")
const UserModel = require("../models/userModel")



const getUserDetailFromToken = async(token) =>{
    if(!token){
        return{
            message: "session out",
            logout: true,
            success: false
        }
    }

    const decode = await jwt.verify(token, process.env.JWT_SECRET)
    const user =await UserModel.findById(decode.id).select("-password")
    return user
}
module.exports = {getUserDetailFromToken}