import { z } from 'zod';

const nameSchema = z.string().min(3, 'Name must be at least 3 characters');
const usernameSchema = z
  .string()
  .min(3, 'Username must be at least 3 characters');
const emailSchema = z.string().email('Invalid email');
const passwordSchema = z
  .string()
  .min(6, 'Password must be at least 6 characters');

export const registerSchema = z.object({
  name: nameSchema,
  username: usernameSchema,
  email: emailSchema,
  password: passwordSchema,
});

export const loginSchema = z.object({
  username: usernameSchema,
  email: emailSchema,
  password: passwordSchema,
});
