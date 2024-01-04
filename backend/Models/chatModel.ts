import mongoose from "mongoose";

const chatModel = new  mongoose.Schema(
    {
    chatName : {type : String , trim : true},
    isGroupChat: { type: Boolean, default: false },
    }    
)


export default mongoose.model("Chat", chatModel);