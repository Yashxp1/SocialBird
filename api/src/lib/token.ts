import jwt from 'jsonwebtoken';
import { Response } from 'express';

const generateToken = (userId: string, res: Response) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET as string, {
    expiresIn: '7d',
  });

  res.cookie('jwt', token, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
  });
  res.status(200).json({ message: 'Login successful' });

  return token;
};
