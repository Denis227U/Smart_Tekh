'use client';

import {
  useCheckoutDelivery,
  useCheckoutPayment,
  useCheckoutRecipient,
} from '@/src/features/checkout';
import { useCheckoutSteps } from '../../model/use-checkout-step';
import { CartItemsStep } from '../steps/cart-items-step/cart-items-step';
import { DeliveryStep } from '../steps/delivery-step/delivery-step';
import { PaymentStep } from '../steps/payment-step/payment-step';
import { RecipientStep } from '../steps/recipient-step/recipient-step';
import s from './checkout-wizard.module.scss';

export const CheckoutWizard = ({ step }: { step?: string | string[] }) => {
  const { currentStep, nextStep, isStepPassed, setStep } =
    useCheckoutSteps(step);

  const delivery = useCheckoutDelivery();
  const payment = useCheckoutPayment();
  const recipient = useCheckoutRecipient();

  return (
    <div className={s.wrapper}>
      <div className={s.steps}>
        <CartItemsStep
          isActive={currentStep === 'cart'}
          onComplete={nextStep}
          setStep={setStep}
          isUnlocked={isStepPassed('cart') || currentStep === 'cart'}
        />
        <DeliveryStep
          isActive={currentStep === 'delivery'}
          onComplete={nextStep}
          setStep={setStep}
          isUnlocked={
            isStepPassed('delivery') ||
            currentStep === 'delivery' ||
            Boolean(delivery)
          }
        />
        <PaymentStep
          isActive={currentStep === 'payment'}
          onComplete={nextStep}
          setStep={setStep}
          isUnlocked={
            isStepPassed('payment') ||
            currentStep === 'payment' ||
            Boolean(payment)
          }
        />
        <RecipientStep
          isActive={currentStep === 'recipient'}
          setStep={setStep}
          isUnlocked={
            isStepPassed('recipient') ||
            currentStep === 'recipient' ||
            Boolean(recipient)
          }
        />
      </div>

      <aside className={s.aside}>
        <div className={s.summary} />
      </aside>
    </div>
  );
};
