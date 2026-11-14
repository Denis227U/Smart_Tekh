import { z } from 'zod';

export const recipientFormSchema = z.object({
  recipientFirstname: z.string().trim().min(1, 'Укажите имя'),
  recipientLastname: z.string().trim().min(1, 'Укажите фамилию'),
  recipientPhone: z
    .string()
    .refine(
      (val) => val.replace(/\D/g, '').length === 11,
      'Введите корректный номер телефона',
    ),
  recipientEmail: z
    .string()
    .trim()
    .min(1, 'Укажите эл. почту')
    .email('Некорректный email'),
  recipientNoCall: z.boolean(),
});
