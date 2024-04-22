import { z } from 'zod';

export const updateProductSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  price: z
    .number()
    .optional()
    .refine((price) => price === undefined || price >= 0, {
      message: 'Price should not be negative',
    }),
});
