import z from 'zod';
import type { PickupPointDto } from '@/src/entities/pickup-point';
import { CityCode } from '@/src/shared/api/enums';
import { deliveryFormSchema } from './delivery-schema';

export type DeliveryFormSchemaInput = z.infer<typeof deliveryFormSchema>;

export type DeliveryData = DeliveryFormSchemaInput & {
  pickupPointAddress?: string;
  pickupPointWorkingDays?: string;
  pickupPointWorkingHours?: string;
};

export interface PaymentData {
  method: 'cash' | 'card_online' | 'card_upon_receipt';
}

export interface RecipientData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  dontCall: boolean;
}

export interface CheckoutState {
  delivery: DeliveryData | null;
  payment: PaymentData | null;
  recipient: RecipientData | null;
  cachedPoints: Partial<Record<CityCode, PickupPointDto[]>>;
}

export interface CheckoutActions {
  setDeliveryData: (data: DeliveryData) => void;
  setPaymentData: (data: PaymentData) => void;
  setRecipientData: (data: RecipientData) => void;
  resetCheckout: () => void;
  setCachedPoints: (city: CityCode, points: PickupPointDto[]) => void;
}

export type CheckoutStore = CheckoutState & CheckoutActions;
