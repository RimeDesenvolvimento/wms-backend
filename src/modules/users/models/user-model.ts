import { z } from 'zod';

export const CreateUserSchema = z.object({
  email: z.string().email('Invalid email format'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const UpdateUserSchema = z.object({
  email: z.string().email('Invalid email format').optional(),
  name: z.string().min(2, 'Name must be at least 2 characters').optional(),
  password: z.string().min(6, 'Password must be at least 6 characters').optional(),
});

export const UserParamsSchema = z.object({
  id: z.string().uuid('Invalid user ID format'),
});

export type CreateUserModel = z.infer<typeof CreateUserSchema>;
export type UpdateUserModel = z.infer<typeof UpdateUserSchema>;
export type UserParamsModel = z.infer<typeof UserParamsSchema>; 