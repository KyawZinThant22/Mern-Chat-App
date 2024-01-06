import jwt from 'jsonwebtoken';

interface GenerateTokenProps {
  id: string;
}

export const generateToken = ({ id }: GenerateTokenProps): string => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT secret is not defined in the environment variables.');
  }

  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d', // You can customize the expiration time
  });
};
