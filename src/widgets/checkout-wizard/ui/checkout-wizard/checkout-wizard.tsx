'use client';

import {
  useCheckoutDelivery,
  useCheckoutPayment,
  useCheckoutRecipient,
} from '@/src/features/checkout';
import { useCheckoutItemsSource } from '../../model/use-checkout-items-source';
import { useCheckoutSteps } from '../../model/use-checkout-step';
import { useScrollToStep } from '../../model/use-scroll-to-step';
import { OrderSummary } from '../order-summary/order-summary';
import { CartItemsStep } from '../steps/cart-items-step/cart-items-step';
import { DeliveryStep } from '../steps/delivery-step/delivery-step';
import { PaymentStep } from '../steps/payment-step/payment-step';
import { RecipientStep } from '../steps/recipient-step/recipient-step';
import s from './checkout-wizard.module.scss';

export const CheckoutWizard = ({ step }: { step?: string | string[] }) => {
  const { currentStep, nextStep, isStepPassed, setStep } =
    useCheckoutSteps(step);

  useScrollToStep(currentStep);

  const delivery = useCheckoutDelivery();
  const payment = useCheckoutPayment();
  const recipient = useCheckoutRecipient();

  const { totalCount } = useCheckoutItemsSource();
  const isCartEmpty = totalCount === 0;

  return (
    <div className={s.wrapper}>
      <div className={s.steps}>
        <CartItemsStep
          isActive={currentStep === 'cart'}
          onComplete={nextStep}
          setStep={setStep}
          isUnlocked={isStepPassed('cart') || currentStep === 'cart'}
          isNextDisabled={isCartEmpty}
        />
        <DeliveryStep
          isActive={currentStep === 'delivery'}
          onComplete={nextStep}
          setStep={setStep}
          isUnlocked={
            !isCartEmpty &&
            (isStepPassed('delivery') ||
              currentStep === 'delivery' ||
              Boolean(delivery))
          }
        />
        <PaymentStep
          isActive={currentStep === 'payment'}
          onComplete={nextStep}
          setStep={setStep}
          isUnlocked={
            !isCartEmpty &&
            (isStepPassed('payment') ||
              currentStep === 'payment' ||
              Boolean(payment))
          }
        />
        <RecipientStep
          isActive={currentStep === 'recipient'}
          setStep={setStep}
          isUnlocked={
            !isCartEmpty &&
            (isStepPassed('recipient') ||
              currentStep === 'recipient' ||
              Boolean(recipient))
          }
        />
      </div>

      <aside className={s.aside}>
        <OrderSummary className={s.summary} />
      </aside>
    </div>
  );
};
