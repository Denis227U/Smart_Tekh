import { PAYMENT_METHOD_LABELS } from '@/src/entities/order';
import { DeliveryType, PaymentMethodCode } from '@/src/shared/api/enums';
import { formatToTextDate } from '@/src/shared/lib';

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

export interface DateOption {
  label: string;
  value: string; // YYYY-MM-DD
}

export const DATES: DateOption[] = [
  {
    label: formatToTextDate('2026-05-23')!,
    value: '2026-05-23',
  },
  {
    label: formatToTextDate('2026-05-24')!,
    value: '2026-05-24',
  },
  {
    label: formatToTextDate('2026-05-25')!,
    value: '2026-05-25',
  },
  {
    label: formatToTextDate('2026-05-26')!,
    value: '2026-05-26',
  },
];

export const PICKUP_BLOCK_HEIGHT = '340px';
