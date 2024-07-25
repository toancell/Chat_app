const { getUserDetailFromToken } = require("../helpers/getUserDetailFromToken")

const  userDetail = async(req,res) => {
    try{
        const token = req.cookies.token || "";
        const user = await getUserDetailFromToken(token)
        return res.status(200).json({
            message: true,
            data: user,
            success: true
        })
    }catch(err){
        return res.status(500).json({
            message: err.message || err,
            err: true,
        })
    }
}

module.exports = {userDetail} 