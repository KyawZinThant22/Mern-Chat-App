import mongoose, { Document, Schema, Types } from 'mongoose';

// Interface for User document reference

const chatSchema = new Schema(
   {
      chatName: { type: String, trim: true, required: true },
      isGroupChat: { type: Boolean, default: false },
      users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
      latestMessage: { type: Schema.Types.ObjectId, ref: 'Message' },
      groupAdmin: { type: Schema.Types.ObjectId, ref: 'User' },
   },
   { timestamps: true },
);

// Define and export the Chat model
const Chat = mongoose.model('Chat', chatSchema);
export default Chat;
