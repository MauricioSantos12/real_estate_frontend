import z from 'zod';
export const userSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters long' }),
  is_active: z.boolean().optional().default(true),
  is_anonymous: z.boolean().optional().default(false),
  role: z.enum(['admin', 'agent', 'customer']),
});
