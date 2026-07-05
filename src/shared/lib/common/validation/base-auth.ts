import { z } from 'zod';

const PASSWORD_MIN_LENGTH = 6;

export const baseAuthFields = {
  email: z
    .string()
    .trim()
    .min(1, { message: 'Укажите почту' })
    .email('Почта введена некорректно'),
  password: z
    .string()
    .trim()
    .min(1, { message: 'Укажите пароль' })
    .min(PASSWORD_MIN_LENGTH, `Минимум ${PASSWORD_MIN_LENGTH} символов`),
};
