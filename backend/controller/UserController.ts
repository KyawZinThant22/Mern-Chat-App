import expressAsyncHandler from 'express-async-handler';
import userModel from '../Models/userModel';
import { Request, Response } from 'express';
import asyncHandler from '../middleware/asyncHandler';
import { generateToken } from '../config/generateToken';
import ExtendedRequest from '../utils/extentRequest';

//@description     get all users
//@route           POST /api/user/
//@access          Public
export const getAllUser = asyncHandler(async (req: ExtendedRequest, res, next) => {
   const keyword = req.query.search
      ? {
           $or: [
              { name: { $regex: req.query.search, $options: 'i' } },
              { email: { $regex: req.query.search, $options: 'i' } },
           ],
        }
      : {};
   const users = await userModel.find(keyword).find({ _id: { $ne: req?.user?._id } }, "-password");
   res.send(users);
});

//@description     Register new user
//@route           POST /api/user/
//@access          Public
export const registerUser = asyncHandler(async (req, res, next) => {
   const { name, email, password, pic } = req.body;

   if (!name || !email || !password) {
      res.status(400);
      throw new Error('Please Enter all the Feilds');
   }

   try {
      const userExists = await userModel.findOne({ email });

      if (userExists) {
         res.status(400);
         throw new Error('User already exists');
      }

      const user = await userModel.create({
         name,
         email,
         password,
         pic,
      });

      if (user) {
         res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            pic: user.pic,
            token: generateToken(user.email),
         });
      } else {
         res.status(400);
         throw new Error('User not found');
      }
   } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
   }
});

//@description     Login user
//@route           POST /api/user/
//@access          Public
export const authLogin = asyncHandler(async (req, res, next) => {
   const { email, password } = req.body;

   try {
      const user = await userModel.findOne({ email });
      if (user && (await user.matchPassword(password))) {
         res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            pic: user.pic,
            token: generateToken(user._id),
         });
      } else {
         res.status(400);
         throw new Error('User not found');
      }
   } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
   }
});

//@description     get current user
//@route           POST /api/user/me
//@access          Private

export const getMe = asyncHandler(
   async (req: ExtendedRequest, res: Response, next): Promise<void> => {
      console.log("get me function")
      try {
         const user = await userModel.findById({ _id: req.user._id }).select('-password');

         if (!user) {
            res.status(404).json({ success: false, message: 'User not found' });
            return;
         }

         res.status(200).json({
            success: true,
            data: user,
         });
      } catch (err) {
         // Handle errors here if needed
         console.log(err)
         // next(err);
      }
   },
);
