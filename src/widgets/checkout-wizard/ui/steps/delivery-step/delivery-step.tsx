import { StepCard } from '../../step-card/step-card';
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
  const renderPreview = () => {
    return <div>Delivery Preview</div>;
  };

  return (
    <StepCard
      number={2}
      title='Способ получения'
      isActive={isActive}
      isUnlocked={isUnlocked}
      onEdit={() => setStep('delivery')}
      previewContent={renderPreview()}
      onNext={onComplete}
    >
      <div>Delivery Form</div>
    </StepCard>
  );
};
