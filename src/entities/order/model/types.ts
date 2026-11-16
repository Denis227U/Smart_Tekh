import {
  CityCode,
  DeliveryTimeSlot,
  DeliveryType,
  PaymentMethodCode,
} from '@/src/shared/api/enums';

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
  delivery: OrderDeliveryView | null;
  payment: OrderPaymentView | null;
  recipient: OrderRecipientView | null;
}

export interface TimeOption {
  label: string;
  value: DeliveryTimeSlot;
}
