const mongoose = require('mongoose')
const conversationSchema= new mongoose.Schema({
    sender:{
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "User"
    },
    receiver:{
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "User"
    },
    messages: {
        type: mongoose.Types.ObjectId,
        ref: "Message"
    }
}, {timestamps: true})

const ConversationModel = mongoose.model('Conversation', conversationSchema)
module.exports = ConversationModel