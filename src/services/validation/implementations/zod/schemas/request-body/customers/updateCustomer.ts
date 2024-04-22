import { z } from 'zod';

export const updateCustomerSchema = z.object({
  name: z.string().optional(),
  country: z.string().optional(),
  email: z
    .string()
    .optional()
    .refine(
      (data) => {
        return data ? z.string().email().safeParse(data).success : true;
      },
      {
        message: 'Invalid email format',
      }
    ),
  password: z
    .string()
    .optional()
    .refine(
      (data) => {
        return data ? z.string().min(8).safeParse(data).success : true;
      },
      {
        message: 'Password must be at least 8 characters long',
      }
    ),
});
