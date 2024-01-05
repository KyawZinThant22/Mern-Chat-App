import { ErrorRequestHandler, NextFunction, Request, Response } from "express";

export const notFound = (req:Request,res:Response,next:NextFunction)=>{
    const error = new Error(`Not found - ${req.originalUrl}`);
    res.status(404);
    next(error)
}

export const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
  ): void => {
    const statusCode: number = res.statusCode === 200 ? 500 : res.statusCode;
  
    res.status(statusCode).json({
      message: err.message,
      stack: process.env.NODE_ENV === 'production' ? undefined : err.stack,
    });
  };