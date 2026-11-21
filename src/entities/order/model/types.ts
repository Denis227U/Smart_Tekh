import {
  CityCode,
  DeliveryTimeSlot,
  DeliveryType,
  PaymentMethodCode,
} from '@/src/shared/api/enums';
import type { getOrderById } from '../api/get-order-by-id';

export type OrderDeliveryView =
  | {
      deliveryType: typeof DeliveryType.DELIVERY;
      city: CityCode | string;
      deliveryDate: string;
      deliveryTime: DeliveryTimeSlot | string;
      street: string;
      apartment: string;
      comment?: string;
    }
  | {
      deliveryType: typeof DeliveryType.PICKUP;
      city?: CityCode | string;
      pickupPointAddress?: string;
      pickupPointWorkingDays?: string;
      pickupPointWorkingHours?: string;
    };

export type OrderPaymentView = {
  paymentMethod: PaymentMethodCode;
};

export type OrderRecipientView = {
  recipientFirstname: string;
  recipientLastname: string;
  recipientPhone: string;
  recipientEmail: string;
  recipientNoCall: boolean;
};

export interface OrderPreviewsData {
  delivery: OrderDeliveryView;
  payment: OrderPaymentView | null;
  recipient: OrderRecipientView;
}

export interface TimeOption {
  label: string;
  value: DeliveryTimeSlot;
}

export interface DateOption {
  label: string;
  value: string; // YYYY-MM-DD
}

export type OrderDto = NonNullable<Awaited<ReturnType<typeof getOrderById>>>;

export type OrderItemDto = OrderDto['items'][number];
