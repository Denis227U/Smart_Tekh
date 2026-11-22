import { RecipientForm, useCheckoutRecipient } from '@/src/features/checkout';
import { RecipientPreview } from '@/src/entities/order';
import { StepCard } from '../../step-card/step-card';
import type { CheckoutStep } from '../../../model/types';

export const RecipientStep = ({
  isActive,
  setStep,
  isUnlocked,
}: {
  isActive: boolean;
  setStep: (step: CheckoutStep) => void;
  isUnlocked: boolean;
}) => {
  const recipient = useCheckoutRecipient();

  return (
    <StepCard
      number={4}
      title='Получатель'
      isActive={isActive}
      isUnlocked={isUnlocked}
      onEdit={() => setStep('recipient')}
      previewContent={<RecipientPreview recipient={recipient} />}
    >
      <RecipientForm />
    </StepCard>
  );
};
