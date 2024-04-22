import { z } from 'zod';

export const querySchema = z.object({
  filter: z.string().optional().refine((filter) => {
    if (!filter) return true; 

    const conditions = filter.split(';');
    return conditions.every(condition => {
      const match = condition.match(/(\w+)([=><!]+)(.+)/);
      if (!match) return false;

      const [, field, operator, valueStr] = match;
      const validOperators = ['=', '>', '<', '>=', '<=', '!=', 'contains'];
      if (!validOperators.includes(operator)) return false;

      if (!valueStr.trim()) return false;

      return true;
    });
  }, {
    message: "Invalid filter format"
  }),
  sort: z.string().optional(),
  page: z.string()
    .optional()
    .transform((value) => value ? parseInt(value, 10) : undefined)
    .refine((val) => val === undefined || val >= 1, {
      message: 'Page number must be at least 1',
    }),
  limit: z.string()
    .optional()
    .transform((value) => value ? parseInt(value, 10) : undefined)
    .refine((val) => val === undefined || val >= 1, {
      message: 'Limit must be at least 1',
    }),
});

