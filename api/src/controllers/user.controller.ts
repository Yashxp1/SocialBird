import { Request, Response } from 'express';
import { generateToken } from '../lib/token';
import User from '../models/user.model';
import { registerSchema } from '../lib/zod';
import bcrypt from 'bcrypt';

export const register = async (req: Request, res: Response) => {
  try {
    const result = registerSchema.safeParse(req.body);

    if (!result.success) {
      return res
        .status(400)
        .json({ success: false, errors: result.error.format() });
    }

    const { name, username, email, password } = result.data;

    const existingEmail = await User.findOne({ email });
    const existingUsername = await User.findOne({ username });

    if (existingEmail) {
      return res.status(400).json({ error: 'Email already exists' });
    }
    if (existingUsername) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      username,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      generateToken(newUser._id, res);
      await newUser.save();

      res.status(201).json({
        success: true,
        data: {
          id: newUser._id,
          name: newUser.name,
          username: newUser.username,
          email: newUser.email,
        },
      });
    }

    res.status(400).json({ success: false, error: 'User already exists' });
  } catch (error) {
    console.log('Error in register function', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const result = registerSchema.safeParse(req.body);

    if (!result.success) {
      return res
        .status(400)
        .json({ success: false, error: result.error.format() });
    }

    const { username, email, password } = result.data;

    const query = [];
    if (username) query.push({ username });
    if (email) query.push({ email });

    const user = await User.findOne({ $or: query });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    generateToken(user._id, res);

    res.status(201).json({
      success: false,
      data: {
        id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error('Error in login function:', error);
    res.status(500).json({
      success: false,
      error: 'Server Error',
    });
  }
};
