import { z } from 'zod';
import { OrderStatus } from '../../../../../../../repositories/types/common/enums/orderStatus';

export const updateOrderSchema = z.object({
  status: z.nativeEnum(OrderStatus).optional(),
  items: z.array(z.object({
    productId: z.string({
      required_error: 'Product ID is required',
      invalid_type_error: 'Product ID must be a string',
    })
    .min(1, 'Product ID cannot be empty')
    .regex(/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[4][0-9a-fA-F]{3}-[89ABab][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/, 'Product ID must be a valid UUID'),
    quantity: z.number({
      required_error: 'Quantity is required',
      invalid_type_error: 'Quantity must be a number',
    }).min(1, 'Quantity must be at least 1'),
  }).optional(), {
    required_error: 'Items are required',
    invalid_type_error: 'Items must be an array of product objects',
  }).min(1, 'At least one item must be provided').optional(),
}).refine((data) => data.status || data.items, {
  message: 'At least one of status or items must be provided',
});
