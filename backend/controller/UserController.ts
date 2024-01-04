import expressAsyncHandler from 'express-async-handler';
import userModel from '../Models/userModel';
import { Request, Response } from 'express';
import asyncHandler from '../middleware/asyncHandler';

//@description     Register new user
//@route           POST /api/user/
//@access          Public

export const registerUser = asyncHandler(async (req, res, next) => {
   const { name, email, password, pic } = req.body;

   if (!name || !email || !password) {
      res.status(400);
      throw new Error('Please Enter all the Feilds');
   }

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
      });
   } else {
      res.status(400);
      throw new Error('User not found');
   }
});
