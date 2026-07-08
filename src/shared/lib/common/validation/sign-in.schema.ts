import { z } from 'zod';
import { baseAuthFields } from './base-auth';

export const signInSchema = z.object({
  ...baseAuthFields,
  rememberMe: z.boolean(),
});

export type SignInInput = z.infer<typeof signInSchema>;
