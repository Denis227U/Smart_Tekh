import { DeliveryFormSchemaInput } from '@/src/features/checkout/model/types';
import { DeliveryType } from '@/src/shared/api/enums';

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
