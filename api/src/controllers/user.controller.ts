import express, { Request, Response } from 'express';
import { generateToken } from '../lib/token';
import User from '../models/user.model';
import { z } from 'zod';
import bcrypt from 'bcrypt';

const userSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  username: z.string().min(3, 'Username must be at least 3 characters'),
  email: z.string().email('invalid email'),
  password: z.string().min(6, 'Password should have at least 3 characters'),
});

export const register = async (req: Request, res: Response) => {
  const result = userSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({ errors: result.error.format() });
  }

  const { name, username, email, password } = result.data;

  const existingEmail = await User.find({ email });
  const existingUsername = await User.find({ username });

  if (existingUsername && existingEmail) {
    return res.status(400).json({ error: 'User already exists' });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = new User({ name, username, email, password: hashedPassword });

  if (newUser) {
    generateToken(newUser._id, res);
    await newUser.save();

    res.status(201).json({
      success: true,
      message: newUser,
    });
  }
};
