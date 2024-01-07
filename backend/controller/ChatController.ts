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
