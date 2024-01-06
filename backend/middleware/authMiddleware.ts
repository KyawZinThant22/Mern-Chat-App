import jwt, { JwtPayload } from 'jsonwebtoken';
import { Response, NextFunction } from 'express';
import ExtendedRequest from '../utils/extentRequest';
import asyncHandler from './asyncHandler';
import ErrorResponse from '../utils/ErrorResponse';
import { authRequiredError } from '../utils/errorObject';
import userModel from '../Models/userModel';

/**
 * Middleware for protected routes
 * @description used in routes before and required controllers
 * @returns authError | next()
 */

export const protect = asyncHandler(async (req: ExtendedRequest, res: Response, next: NextFunction) => {
  let token = '';
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new ErrorResponse(authRequiredError, 401));
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string ) as any;
    
    // Check if the user exists in the database
    const user = await userModel.findById(decoded.id).select('-password');

    if (!user) {
      return next(new ErrorResponse(authRequiredError, 401));
    }

    req.user = user;
    next();
  } catch (err) {
    console.error(err);
    return next(new ErrorResponse(authRequiredError, 401));
  }
});


