import { useRef } from 'react';
import { PaymentForm, useCheckoutPayment } from '@/src/features/checkout';
import { PaymentPreview } from '@/src/entities/order';
import { StepCard } from '../../step-card/step-card';
import type { CheckoutStep } from '../../../model/types';

export const PaymentStep = ({
  isActive,
  onComplete,
  setStep,
  isUnlocked,
}: {
  isActive: boolean;
  onComplete: () => void;
  setStep: (step: CheckoutStep) => void;
  isUnlocked: boolean;
}) => {
  const submitButtonRef = useRef<HTMLButtonElement>(null);
  const payment = useCheckoutPayment();

  const handleNextClick = () => {
    if (submitButtonRef.current) {
      submitButtonRef.current.click();
    }
  };

  return (
    <StepCard
      number={3}
      title='Способ оплаты'
      isActive={isActive}
      isUnlocked={isUnlocked}
      onEdit={() => setStep('payment')}
      previewContent={<PaymentPreview payment={payment} />}
      onNext={handleNextClick}
    >
      <PaymentForm
        onValidSubmit={onComplete}
        ref={submitButtonRef}
      />
    </StepCard>
  );
};
