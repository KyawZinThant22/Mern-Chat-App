import mongoose, { Document, Schema, Types } from 'mongoose';

// Define an interface for the User model
interface IUser {
  _id: Types.ObjectId;

}

// Define an interface for the Chat model
interface IChat {
  _id: Types.ObjectId;

}

// Define an interface for the Message model
export interface IMessage extends Document {
  sender: IUser['_id'];
  content: string;
  chat: IChat['_id'];
  readBy: IUser['_id'][];
}

// Define the message schema
const messageSchema = new Schema<IMessage>(
  {
    sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, trim: true, required: true },
    chat: { type: Schema.Types.ObjectId, ref: 'Chat', required: true },
    readBy: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true },
);

// Define and export the Message model
const Message = mongoose.model<IMessage>('Message', messageSchema);
export default Message;
