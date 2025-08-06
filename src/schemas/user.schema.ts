import { z } from 'zod';

export const createUserSchema = z.object({
  name: z.string().min(1),
  email: z.email(),
  password: z.string().min(6),
  role: z.enum(['buyer', 'seller', 'admin']).optional(),
});

export const updateUserSchema = z.object({
  name: z.string().optional(),
  email: z.email().optional(),
  role: z.enum(['buyer', 'seller', 'admin']).optional(),
});
