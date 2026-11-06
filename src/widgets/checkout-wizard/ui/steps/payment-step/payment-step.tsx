import { StepCard } from '../../step-card/step-card';
import type { CheckoutStep } from '../../../model/types';
import s from './payment-step.module.scss';

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
  const renderPreview = () => {
    return <div>Payment Preview</div>;
  };

  return (
    <StepCard
      number={3}
      title='Способ оплаты'
      isActive={isActive}
      isUnlocked={isUnlocked}
      onEdit={() => setStep('payment')}
      previewContent={renderPreview()}
      onNext={onComplete}
    >
      <div>Payment Form</div>
    </StepCard>
  );
};
