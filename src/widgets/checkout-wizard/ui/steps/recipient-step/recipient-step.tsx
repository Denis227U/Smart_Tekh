import { StepCard } from '../../step-card/step-card';
import type { CheckoutStep } from '../../../model/types';
import s from './recipient-step.module.scss';

export const RecipientStep = ({
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
    return <div>Recipient Preview</div>;
  };

  return (
    <StepCard
      number={4}
      title='Получатель'
      isActive={isActive}
      isUnlocked={isUnlocked}
      onEdit={() => setStep('recipient')}
      previewContent={renderPreview()}
    >
      <div>Recipient Form</div>
    </StepCard>
  );
};
