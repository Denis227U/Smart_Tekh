import { useRef } from 'react';
import { DeliveryForm } from '@/src/features/checkout';
import { useCheckoutDelivery } from '@/src/features/checkout';
import { StepCard } from '../../step-card/step-card';
import { DeliveryPreview } from './delivery-preview';
import type { CheckoutStep } from '../../../model/types';

export const DeliveryStep = ({
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
  const delivery = useCheckoutDelivery();

  const handleNextClick = () => {
    if (submitButtonRef.current) {
      submitButtonRef.current.click();
    }
  };

  return (
    <StepCard
      number={2}
      title='Способ получения'
      isActive={isActive}
      isUnlocked={isUnlocked}
      onEdit={() => setStep('delivery')}
      previewContent={<DeliveryPreview delivery={delivery} />}
      onNext={handleNextClick}
    >
      <DeliveryForm
        onValidSubmit={onComplete}
        ref={submitButtonRef}
      />
    </StepCard>
  );
};
