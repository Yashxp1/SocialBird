import { z } from 'zod';

const nameSchema = z.string().min(3, 'Name must be at least 3 characters');
const usernameSchema = z
  .string()
  .min(3, 'Username must be at least 3 characters');
const passwordSchema = z
  .string()
  .min(6, 'Password must be at least 6 characters');
const profilePicSchema = z.string();

export const registerSchema = z.object({
  name: nameSchema,
  username: usernameSchema,
  password: passwordSchema,
});

export const loginSchema = z
  .object({
    username: usernameSchema.optional(),
    password: passwordSchema,
  })
  .refine((data) => data.username, {
    message: 'username is required',
    path: ['username'],
  });

export const updateSchema = z.object({
  profilePic: profilePicSchema.url().optional(),
});
