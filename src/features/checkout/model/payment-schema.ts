import { z } from 'zod';
import { PaymentMethodCode } from '@/src/shared/api/enums';

const paymentMethodCodes = Object.values(PaymentMethodCode) as [
  PaymentMethodCode,
  ...PaymentMethodCode[],
];

export const paymentFormSchema = z.object({
  paymentMethod: z.enum(paymentMethodCodes, {
    message: 'Выберите способ оплаты',
  }),
});
