import mongoose from 'mongoose';
import Chat from '../Models/chatModel';
import userModel from '../Models/userModel';
import asyncHandler from '../middleware/asyncHandler';
import ExtendedRequest from '../utils/extentRequest';

//@description     Create or fetch One to One Chat
//@route           POST /api/chat/
//@access          Protected
export const accessChat = asyncHandler(async (req: ExtendedRequest, res, next): Promise<any> => {
   const { userId } = req.body;

   if (!userId) {
      console.log('userid need to be specified');
      return res.sendStatus(401);
   }

   var isChat = await Chat.find({
      isGroupChat: false,
      $and: [
         { users: { $elemMatch: { $eq: req.user._id } } },
         { users: { $elemMatch: { $eq: userId } } },
      ],
   })
      .populate('users', '-password')
      .populate('latestMessage');

   isChat = await userModel.populate(isChat, {
      path: 'latestMessage.sender',
      select: 'name pic email',
   });

   if (isChat.length > 0) {
      res.send(isChat[0]);
   } else {
      let chatData = {
         chatName: 'sender',
         isGroupChat: false,
         users: [req.user._id, userId],
      };

      try {
         const createChat = await Chat.create(chatData);
         const FullChat = await Chat.findOne({ _id: createChat._id }).populate(
            'users',
            '-password',
         );
         res.status(200).json(FullChat);
      } catch (err) {
         res.status(400);
         throw new Error(err.message);
      }
   }
});

//@description     fetch all chat
//@route           POST /api/chat/
//@access          Protected
export const fetchChats = asyncHandler(async (req: ExtendedRequest, res, next) => {
   try {
      Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
         .populate('users', '-password')
         .populate('groupAdmin', '-password')
         .populate('latestMessage')
         .sort({ updatedAt: -1 })
         .then(async (result) => {
            result = await userModel.populate(result, {
               path: 'latestMessage.sender',
               select: 'name pic email',
            });

            res.status(200).send(result);
         });
   } catch (err) {
      console.log(err);
      res.status(400);
      throw new Error(err.message);
   }
});

//@description     create group chat
//@route           POST /api/chat/group
//@access          Protected

export const createGroupChat = asyncHandler(
   async (req: ExtendedRequest, res, next): Promise<any> => {
      if (!req.body.users || !req.body.name) {
         return res.status(400).json({ message: 'Please fill all these fields' });
      }

      try {
         let users = JSON.parse(req.body.users.replace(/'/g, '"'));

         if (users.length < 2) {
            return res
               .status(400)
               .json({ message: 'More than 2 users are required to create a group' });
         }

         users.push(req.user);

         const groupChat = await Chat.create({
            chatName: req.body.name,
            users: users,
            isGroupChat: true,
            groupAdmin: req.user,
         });

         const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
            .populate('users', '-password')
            .populate('groupAdmin', '-password');

         res.status(200).json(fullGroupChat);
      } catch (error) {
         console.log(error);
         res.status(400).send({ message: error.message });
      }
   },
);

//@description     create rename chat
//@route           POST /api/chat/group/rename
//@access          Protected

export const renameGroupChat = asyncHandler(async (req: ExtendedRequest, res, next) => {
   const { chatId, chatName } = req.body;
   console.log("chatId", chatId , 'chatName' , chatName)

   const updatedChat = await Chat.findByIdAndUpdate(
      chatId,
      {
         chatName: chatName,
      },
      {
         new: true,
      },
   )
      .populate('users', '-password')
      .populate('groupAdmin', '-password');

   if (!updatedChat) {
      res.status(400);
      throw new Error('Chat Not found');
   } else {
      res.status(200).json(updatedChat);
   }
});
