import { DeliveryTimeSlot, PaymentMethodCode } from '@/src/shared/api/enums';
import type { TimeOption } from './types';

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

export const PAYMENT_METHOD_LABELS: Record<PaymentMethodCode, string> = {
  [PaymentMethodCode.CARD_ONLINE]: 'Картой онлайн',
  [PaymentMethodCode.SBP]: 'СБП (Система быстрых платежей)',
  [PaymentMethodCode.CASH_ON_DELIVERY]: 'Наличными при получении',
  [PaymentMethodCode.CARD_ON_DELIVERY]: 'Картой при получении',
};

export const TIMES: TimeOption[] = [
  {
    label: '09:00–13:00 (бесплатно)',
    value: DeliveryTimeSlot.MORNING,
  },
  {
    label: '15:00–18:00 (бесплатно)',
    value: DeliveryTimeSlot.AFTERNOON,
  },
  {
    label: '18:00–22:00',
    value: DeliveryTimeSlot.EVENING,
  },
];
