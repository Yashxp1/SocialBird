import { Request, Response } from 'express';
import { generateToken } from '../lib/token';
import User from '../models/user.model';
import { registerSchema, loginSchema, updateSchema } from '../lib/zod';
import bcrypt from 'bcrypt';
import cloudinary from '../lib/cloudinary';

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = registerSchema.safeParse(req.body);

    if (!result.success) {
      res.status(400).json({ success: false, errors: result.error.format() });
      return;
    }

    const { name, username, password } = result.data;

    const existingUser = await User.findOne({ username });

    if (existingUser) {
      res.status(400).json({ error: 'Username already exists' });
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      username,
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
        },
      });
      return;
    }

    res.status(400).json({ success: false, error: 'User already exists' });
  } catch (error) {
    console.log('Error in register function', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = loginSchema.safeParse(req.body);

    if (!result.success) {
      res.status(400).json({ success: false, error: result.error.format() });
      return;
    }

    const { username, password } = result.data;

    const user = await User.findOne({ username });
    if (!user) {
      res.status(400).json({
        success: false,
        message: 'Invalid credentials',
      });
      return;
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      res.status(400).json({
        success: false,
        message: 'Invalid credentials',
      });
      return;
    }

    generateToken(user._id, res);

    res.status(201).json({
      success: true,
      data: {
        id: user._id,
        name: user.name,
        username: user.username,
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

export const logout = async (req: Request, res: Response) => {
  try {
    res.cookie('jwt', '', { maxAge: 0 });
    res
      .status(201)
      .json({ success: false, message: 'User logged out successfully' });
  } catch (error) {
    console.error('Error in logout controller', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const updateProfile = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const result = updateSchema.safeParse(req.body);

    if (!result.success) {
      res.status(400).json({ success: false, errors: result.error.format() });
      return;
    }

    const { profilePic, name } = result.data;

    const userId = req.user?._id;

    let updatedFields: { profilePic?: string; name?: string } = {};

    if (profilePic) {
      const uploadResponse = await cloudinary.uploader.upload(profilePic, {
        folder: 'profile_pics',
      });
      updatedFields.profilePic = uploadResponse.secure_url;
    }

    if (name) {
      updatedFields.name = name;
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updatedFields, {
      new: true,
    });
    if (!updatedUser) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    if (!updatedUser) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.log('error in update profile:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const checkAuth = (req: Request, res: Response) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
