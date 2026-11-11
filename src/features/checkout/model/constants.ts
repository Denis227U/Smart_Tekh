import { DeliveryTimeSlot, DeliveryType } from '@/src/shared/api/enums';
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

export interface TimeOption {
  label: string;
  value: DeliveryTimeSlot;
}

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

export const PICKUP_BLOCK_HEIGHT = '340px';
