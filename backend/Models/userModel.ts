import mongoose, { Schema , Document , model} from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
   _id? : any
    name: string;
    email: string;
    password: string;
    pic: string;
    isAdmin: boolean;
    matchPassword: (enteredPassword: string) => Promise<boolean>;
 }

const userSchema = new Schema(
   {
      name: { type: String, required: true },
      email: { type: String, unique: true, required: true },
      password: { type: String, required: true },
      pic: {
         type: String,
         required: true,
         default:
            'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg',
      },
      isAdmin: {
         type: Boolean,
         required: true,
         default: false,
      },
   },
   { timestamps: true },
);

userSchema.methods.matchPassword = async function (enteredPassword: string) {
   return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre('save', async function (next) {
   if (!this.isModified()) {
      next();
   }

   const salt = await bcrypt.genSalt(10);
   this.password = await bcrypt.hash(this.password, salt);
});

const userModel = model<any>('User', userSchema);

export default userModel;
