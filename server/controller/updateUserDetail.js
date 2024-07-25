const UserModel = require('../models/userModel');
const {getUserDetailFromToken} = require('../helpers/getUserDetailFromToken');
const updateUserDetail= async (req,res) =>{
    try{
        const token = req.cookies.token || ""
        const user = await getUserDetailFromToken(token)
        const {name, profile_pic} = req.body
        
        await UserModel.updateOne({_id: user._id},{
            name,profile_pic
        })
        const updateInfor = await UserModel.findById(user._id)
        return res.json({
            message: "Update successful",
            data: updateInfor,
            success: true,
        })
    }catch(err){
        return res.status(404).json({
            message: err.message,
            err: true
        })
    }
}
module.exports = updateUserDetail