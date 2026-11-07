import { z } from 'zod';
import { CITY_KEYS } from '@/src/entities/pickup-point';
import { DeliveryTimeSlot, DeliveryType } from '@/src/shared/api/enums';

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
      .min(1, 'Выберите дату'),
    deliveryTime: z.enum(deliverySlots, {
      message: 'Выберите время',
    }),
    street: z.string().min(1, 'Укажите адрес'),
    apartment: z.string().min(1, 'Укажите квартиру'),
    comment: z.string().optional(),
  }),
  z.object({
    deliveryType: z.literal(DeliveryType.PICKUP),
    city: z.enum(zodCityKeys, {
      message: 'Выберите город из списка',
    }),
    pickupPointId: z.string().min(1, 'Выберите пункт выдачи'),
  }),
]);
