import { z } from 'zod';
import { baseAuthFields } from './base-auth';

export const registerSchema = z
  .object({
    ...baseAuthFields,
    username: z.preprocess(
      (val) => (val === '' ? undefined : val),
      z.string().trim().optional(),
    ),
    phone: z.preprocess(
      (val) => (val === '' ? undefined : val),
      z
        .string()
        .trim()
        .regex(
          /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/,
          'Введите корректный номер телефона',
        )
        .optional(),
    ),
    confirmPassword: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Пароли не совпадают',
  });

export type RegisterInput = z.infer<typeof registerSchema>;
