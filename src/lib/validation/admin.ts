import { z } from 'zod';

export const updateUserStatusSchema = z.object({
  status: z.enum(['approved', 'rejected']),
});
export type UpdateUserStatusInput = z.infer<typeof updateUserStatusSchema>;

export const updateUserMonetizedSchema = z.object({
  isMonetized: z.boolean(),
});
export type UpdateUserMonetizedInput = z.infer<typeof updateUserMonetizedSchema>;
