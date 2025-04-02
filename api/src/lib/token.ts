import jwt from 'jsonwebtoken';
import { Response } from 'express';

export const generateToken = (userId: unknown, res: Response) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET as string, {
    expiresIn: '7d',
  });

  res.cookie('jwt', token, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000, 
  });
 

  return token;
};
