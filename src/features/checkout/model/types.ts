import z from 'zod';
import type {
  OrderDeliveryView,
  OrderPaymentView,
  OrderRecipientView,
} from '@/src/entities/order';
import type { PickupPointDto } from '@/src/entities/pickup-point';
import {
  CityCode,
  DeliveryTimeSlot,
  DeliveryType,
} from '@/src/shared/api/enums';
import { createOrderSchema } from './create-order-schema';
import { deliveryFormSchema } from './delivery-schema';
import { paymentFormSchema } from './payment-schema';
import { recipientFormSchema } from './recipient-schema';

export type DeliveryFormSchemaInput = z.infer<typeof deliveryFormSchema>;
export type PaymentFormSchemaInput = z.infer<typeof paymentFormSchema>;
export type RecipientSchemaInput = z.infer<typeof recipientFormSchema>;
export type CreateOrderInput = z.infer<typeof createOrderSchema>;

export type DeliveryData = DeliveryFormSchemaInput & {
  pickupPointAddress?: string;
  pickupPointWorkingDays?: string;
  pickupPointWorkingHours?: string;
};

export interface DeliveryDraft {
  deliveryType: DeliveryType;
  city: CityCode;
  deliveryTime?: DeliveryTimeSlot | null;
}

export type PaymentData = PaymentFormSchemaInput;

export type RecipientData = RecipientSchemaInput;

export interface CheckoutState {
  delivery: DeliveryData | null;
  deliveryDraft: DeliveryDraft;
  payment: PaymentData | null;
  recipient: RecipientData | null;
  isRecipientValid: boolean;
  cachedPoints: Partial<Record<CityCode, PickupPointDto[]>>;
}

export interface CheckoutActions {
  setDeliveryData: (data: DeliveryData) => void;
  setDeliveryDraft: (draft: Partial<DeliveryDraft>) => void;
  setPaymentData: (data: PaymentData) => void;
  setRecipientState: (data: RecipientData | null, isValid: boolean) => void;
  resetCheckout: () => void;
  setCachedPoints: (city: CityCode, points: PickupPointDto[]) => void;
}

export type CheckoutStore = CheckoutState & CheckoutActions;

// Prevent type drift between checkout form and order preview UI
type AssertTrue<T extends true> = T;

type _AssertDeliveryCompatibility = AssertTrue<
  DeliveryData extends OrderDeliveryView ? true : false
>;
type _AssertPaymentCompatibility = AssertTrue<
  PaymentData extends OrderPaymentView ? true : false
>;
type _AssertRecipientCompatibility = AssertTrue<
  RecipientData extends OrderRecipientView ? true : false
>;
