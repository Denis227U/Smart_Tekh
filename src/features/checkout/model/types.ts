import z from 'zod';
import type { PickupPointDto } from '@/src/entities/pickup-point';
import { CityCode } from '@/src/shared/api/enums';
import { deliveryFormSchema } from './delivery-schema';
import { paymentFormSchema } from './payment-schema';
import { recipientFormSchema } from './recipient-schema';

export type DeliveryFormSchemaInput = z.infer<typeof deliveryFormSchema>;
export type PaymentFormSchemaInput = z.infer<typeof paymentFormSchema>;
export type RecipientSchemaInput = z.infer<typeof recipientFormSchema>;

export type DeliveryData = DeliveryFormSchemaInput & {
  pickupPointAddress?: string;
  pickupPointWorkingDays?: string;
  pickupPointWorkingHours?: string;
};

export type PaymentData = PaymentFormSchemaInput;

export type RecipientData = RecipientSchemaInput;

export interface CheckoutState {
  delivery: DeliveryData | null;
  payment: PaymentData | null;
  recipient: RecipientData | null;
  isRecipientValid: boolean;
  cachedPoints: Partial<Record<CityCode, PickupPointDto[]>>;
}

export interface CheckoutActions {
  setDeliveryData: (data: DeliveryData) => void;
  setPaymentData: (data: PaymentData) => void;
  setRecipientState: (data: RecipientData | null, isValid: boolean) => void;
  resetCheckout: () => void;
  setCachedPoints: (city: CityCode, points: PickupPointDto[]) => void;
}

export type CheckoutStore = CheckoutState & CheckoutActions;
