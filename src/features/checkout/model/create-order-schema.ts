import { z } from 'zod';
import { deliveryFormSchema } from './delivery-schema';
import { paymentFormSchema } from './payment-schema';
import { recipientFormSchema } from './recipient-schema';

export const createOrderSchema = z.object({
  delivery: deliveryFormSchema,
  payment: paymentFormSchema,
  recipient: recipientFormSchema,
  buyNowItem: z
    .object({
      productId: z.string().min(1),
      quantity: z.number().int().min(1),
    })
    .optional(),
});
