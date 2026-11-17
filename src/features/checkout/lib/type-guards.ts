import { CityCode, DeliveryType } from '@/src/shared/api/enums';
import type { DeliveryFormSchemaInput } from '../model/types';

export function isCourierDelivery(
  delivery: DeliveryFormSchemaInput | null,
): delivery is Extract<
  DeliveryFormSchemaInput,
  { deliveryType: typeof DeliveryType.DELIVERY }
> {
  return delivery?.deliveryType === DeliveryType.DELIVERY;
}

export function isPickupDelivery(
  delivery: DeliveryFormSchemaInput | null,
): delivery is Extract<
  DeliveryFormSchemaInput,
  { deliveryType: typeof DeliveryType.PICKUP }
> {
  return delivery?.deliveryType === DeliveryType.PICKUP;
}

export function isCityCode(value: unknown): value is CityCode {
  return (
    typeof value === 'string' &&
    Object.values(CityCode).includes(value as CityCode)
  );
}
