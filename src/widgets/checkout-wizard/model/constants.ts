import { PaymentMethodCode } from '@/src/shared/api/enums';

export const CHECKOUT_STEPS = [
  'cart',
  'delivery',
  'payment',
  'recipient',
] as const;

export const PAYMENT_HINTS: Record<PaymentMethodCode, string> = {
  [PaymentMethodCode.CARD_ONLINE]:
    'Оплата банковской картой на сайте после подтверждения заказа',
  [PaymentMethodCode.SBP]:
    'Мгновенная оплата по QR-коду через приложение вашего банка',
  [PaymentMethodCode.CASH_ON_DELIVERY]:
    'Оплата наличными курьеру или в пункте выдачи при получении',
  [PaymentMethodCode.CARD_ON_DELIVERY]:
    'Оплата банковской картой через терминал при получении заказа',
};
