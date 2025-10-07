import z from 'zod';
export const propertyImageSchema = z.object({
  id: z.number().int().positive().optional(),
  image_url: z.string().url().max(255),
  property_id: z.number().int().positive(),
  is_primary: z.boolean().optional(),
});
