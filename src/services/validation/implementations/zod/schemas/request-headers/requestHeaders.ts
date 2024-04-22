import { z } from 'zod';
import { ContentType } from '../../../../types';

export const headersSchema = z.object({
  'content-type': z
    .nativeEnum(ContentType, {
      required_error: 'Content-Type is required',
      invalid_type_error: 'Invalid Content-Type',
    })
    .refine((value) => value === ContentType.JSON, {
      message: "Only 'application/json' is supported",
    }),
  service: z.string({
    required_error: 'Service header is required',
    invalid_type_error: 'Service must be a string',
  }),
  'transaction-id': z.string({
    required_error: 'Transaction-ID is required',
    invalid_type_error: 'Transaction-ID must be a string',
  }),
});
