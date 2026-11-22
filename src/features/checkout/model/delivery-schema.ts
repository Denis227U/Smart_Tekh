import { z } from 'zod';
import { getAvailableDeliveryDates } from '@/src/entities/order';
import { DeliveryTimeSlot, DeliveryType } from '@/src/shared/api/enums';
import { CITY_KEYS } from '@/src/shared/config';

const deliverySlots = Object.values(DeliveryTimeSlot) as [
  DeliveryTimeSlot,
  ...DeliveryTimeSlot[],
];

const zodCityKeys = CITY_KEYS as [string, ...string[]];

export const deliveryFormSchema = z.discriminatedUnion('deliveryType', [
  z.object({
    deliveryType: z.literal(DeliveryType.DELIVERY),
    city: z.enum(zodCityKeys, {
      message: 'Выберите город из списка',
    }),
    deliveryDate: z
      .string({ message: 'Выберите дату' })
      .min(1, 'Выберите дату')
      .refine(
        (val) =>
          getAvailableDeliveryDates(new Date(), true).some(
            (d) => d.value === val,
          ),
        { message: 'Выбранная дата доставки недоступна' },
      ),
    deliveryTime: z.enum(deliverySlots, {
      message: 'Выберите время',
    }),
    street: z
      .string({ message: 'Укажите адрес' })
      .trim()
      .min(1, 'Укажите адрес'),
    apartment: z
      .string({ message: 'Укажите квартиру' })
      .trim()
      .min(1, 'Укажите квартиру'),
    comment: z.string().optional(),
  }),
  z.object({
    deliveryType: z.literal(DeliveryType.PICKUP),
    city: z.enum(zodCityKeys, {
      message: 'Выберите город из списка',
    }),
    pickupPointId: z
      .string({ message: 'Выберите пункт выдачи' })
      .min(1, 'Выберите пункт выдачи'),
  }),
]);
