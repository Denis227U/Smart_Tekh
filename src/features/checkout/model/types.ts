import z from 'zod';
import { deliveryFormSchema } from './delivery-schema';

export type DeliveryFormSchemaInput = z.infer<typeof deliveryFormSchema>;

export type DeliveryData = DeliveryFormSchemaInput;

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
}

export interface CheckoutActions {
  setDeliveryData: (data: DeliveryData) => void;
  setPaymentData: (data: PaymentData) => void;
  setRecipientData: (data: RecipientData) => void;
  resetCheckout: () => void;
}

export type CheckoutStore = CheckoutState & CheckoutActions;
