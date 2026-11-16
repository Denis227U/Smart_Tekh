import { DeliveryType, PaymentMethodCode } from '@/src/shared/api/enums';
import type {
  OrderDeliveryView,
  OrderPaymentView,
  OrderPreviewsData,
  OrderRecipientView,
  OrderDto,
} from '../model/types';

export function mapOrderToPreviews(order: OrderDto): OrderPreviewsData {
  const delivery: OrderDeliveryView =
    order.deliveryType === DeliveryType.PICKUP
      ? {
          deliveryType: DeliveryType.PICKUP,
          city: order.city,
          pickupPointAddress: order.pickupPoint?.address,
          pickupPointWorkingDays: order.pickupPoint?.workingDays,
          pickupPointWorkingHours: order.pickupPoint?.workingHours,
        }
      : {
          deliveryType: DeliveryType.DELIVERY,
          city: order.city,
          deliveryDate: order.deliveryDate
            ? order.deliveryDate.toISOString().split('T')[0]
            : '',
          deliveryTime: order.deliveryTime!,
          street: order.street ?? '',
          apartment: order.apartment ?? '',
          comment: order.comment ?? undefined,
        };

  const payment: OrderPaymentView | null = order.paymentMethod
    ? { paymentMethod: order.paymentMethod.code as PaymentMethodCode }
    : null;

  const recipient: OrderRecipientView = {
    recipientFirstname: order.recipientFirstname,
    recipientLastname: order.recipientLastname,
    recipientPhone: order.recipientPhone,
    recipientEmail: order.recipientEmail,
    recipientNoCall: order.recipientNoCall,
  };

  return {
    delivery,
    payment,
    recipient,
  };
}
