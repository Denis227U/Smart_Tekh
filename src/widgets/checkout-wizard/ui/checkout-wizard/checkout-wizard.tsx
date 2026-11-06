'use client';

import { useCheckoutSteps } from '../../model/use-checkout-step';
import { CartItemsStep } from '../steps/cart-items-step/cart-items-step';
import { DeliveryStep } from '../steps/delivery-step/delivery-step';
import { PaymentStep } from '../steps/payment-step/payment-step';
import { RecipientStep } from '../steps/recipient-step/recipient-step';
import s from './checkout-wizard.module.scss';

export const CheckoutWizard = ({ step }: { step?: string | string[] }) => {
  const { currentStep, nextStep, isStepPassed, setStep } =
    useCheckoutSteps(step);

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
          isUnlocked={isStepPassed('delivery') || currentStep === 'delivery'}
        />
        <PaymentStep
          isActive={currentStep === 'payment'}
          onComplete={nextStep}
          setStep={setStep}
          isUnlocked={isStepPassed('payment') || currentStep === 'payment'}
        />
        <RecipientStep
          isActive={currentStep === 'recipient'}
          onComplete={nextStep}
          setStep={setStep}
          isUnlocked={isStepPassed('recipient') || currentStep === 'recipient'}
        />
      </div>

      <aside className={s.aside}>
        <div className={s.summary} />
      </aside>
    </div>
  );
};
