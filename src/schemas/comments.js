import z from 'zod';

export const commentSchema = z.object({
  user_id: z.number().int().positive(),
  property_id: z.number().int().positive(),
  comment: z.string().max(255).optional(),
  is_active: z.boolean().optional(),
});
