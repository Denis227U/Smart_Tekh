import {
  CityCode,
  DeliveryTimeSlot,
  DeliveryType,
} from '@/src/shared/api/enums';
import { DELIVERY_CONFIG } from './delivery-config';

export function calculateDeliveryCost(params: {
  deliveryType: DeliveryType;
  city: CityCode;
  timeSlot?: DeliveryTimeSlot | null;
  itemsTotal: number;
}): number {
  if (params.itemsTotal <= 0 || params.deliveryType === DeliveryType.PICKUP)
    return 0;

  let cost =
    params.itemsTotal >= DELIVERY_CONFIG.FREE_THRESHOLD
      ? 0
      : DELIVERY_CONFIG.CITY_RATES[params.city];

  if (params.timeSlot === DeliveryTimeSlot.EVENING) {
    cost += DELIVERY_CONFIG.EVENING_SURCHARGE;
  }

  return cost;
}
