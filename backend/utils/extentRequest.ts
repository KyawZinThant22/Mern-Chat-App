import  { IUser } from '../Models/userModel';
import  { IChat } from '../Models/chatModel';
import  { IMessage } from '../Models/messageModel';
import { Request } from 'express';

interface ExtendedRequest extends Request {
    user: any;
    message: IMessage;
    chat: IChat;
  }
  

export default ExtendedRequest;
