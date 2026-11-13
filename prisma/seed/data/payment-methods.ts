import { Prisma } from '@/src/shared/api/prisma/generated/client';
import { PaymentMethodCode } from '@/src/shared/api/prisma/generated/enums';

export const paymentMethodsData: Prisma.PaymentMethodCreateInput[] = [
  {
    name: 'Картой онлайн',
    code: PaymentMethodCode.CARD_ONLINE,
    isActive: true,
  },
  {
    name: 'СБП (Система быстрых платежей)',
    code: PaymentMethodCode.SBP,
    isActive: true,
  },
  {
    name: 'Наличными при получении',
    code: PaymentMethodCode.CASH_ON_DELIVERY,
    isActive: true,
  },
  {
    name: 'Картой при получении',
    code: PaymentMethodCode.CARD_ON_DELIVERY,
    isActive: true,
  },
];
