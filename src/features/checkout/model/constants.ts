import { PAYMENT_METHOD_LABELS } from '@/src/entities/order';
import { DeliveryType, PaymentMethodCode } from '@/src/shared/api/enums';

export const RECEIVING_METHODS = [
  {
    label: 'Доставка',
    value: DeliveryType.DELIVERY,
  },
  {
    label: 'Самовывоз',
    value: DeliveryType.PICKUP,
  },
];

export const PAYMENT_METHOD_OPTIONS = (
  Object.keys(PAYMENT_METHOD_LABELS) as PaymentMethodCode[]
).map((code) => ({
  value: code,
  label: PAYMENT_METHOD_LABELS[code],
}));

export const PICKUP_BLOCK_HEIGHT = '340px';
