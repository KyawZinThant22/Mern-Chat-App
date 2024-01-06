import jwt from 'jsonwebtoken';


export const generateToken = ({ email }: any): string => {
    console.log(email)
   if (!process.env.JWT_SECRET) {
      throw new Error('JWT secret is not defined in the environment variables.');
   }

   return jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: '30d', // You can customize the expiration time
   });
};
