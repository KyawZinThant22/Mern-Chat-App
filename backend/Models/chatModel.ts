import mongoose, { Document, Schema } from 'mongoose';

// Define an interface for the Chat model
interface IChat extends Document {
  chatName: string;
  isGroupChat: boolean;
}

// Define the chat schema
const chatSchema = new Schema<IChat>(
  {
    chatName: { type: String, trim: true, required: true },
    isGroupChat: { type: Boolean, default: false },
  },
);

// Define and export the Chat model
const Chat = mongoose.model<IChat>('Chat', chatSchema);
export default Chat;
