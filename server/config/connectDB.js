const mongoose= require('mongoose');
const connect = async (req,res) => {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        const connection = await mongoose.connection
        connection.on("connected",()=>{
            console.log("Connected to DB")
        })
        connection.on("error",()=>{
            console.log("Can't connect to DB.Something went wrong")
        })
    }catch{
        console.log('Cannot connect DB')
    }
}
module.exports= connect