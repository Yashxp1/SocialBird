import { Request, Response, NextFunction } from 'express';
import User from '../models/user.model';
import jwt from 'jsonwebtoken';
import { Document } from 'mongoose';

declare module 'express' {
  export interface Request {
    user?: Document<typeof User>;
  }
}

export const protectRoute = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      res.status(401).json({ message: 'Unauthorized - No Token Provided' });
      return;
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: string;
    };

    req.user = await User.findById(decode.userId).select('-password');

    if (!req.user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    next()
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized - Invalid Token' });
  }
};
