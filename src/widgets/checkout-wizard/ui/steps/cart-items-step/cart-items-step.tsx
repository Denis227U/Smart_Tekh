import { useCheckoutItemsSource } from '../../../model/use-checkout-items-source';
import { StepCard } from '../../step-card/step-card';
import { CartItemsContent } from './cart-items-content';
import { CartItemsSkeleton } from './cart-items-skeleton';
import type { CheckoutStep } from '../../../model/types';

export const CartItemsStep = ({
  isActive,
  onComplete,
  setStep,
  isUnlocked,
  isNextDisabled,
}: {
  isActive: boolean;
  onComplete: () => void;
  setStep: (step: CheckoutStep) => void;
  isUnlocked: boolean;
  isNextDisabled: boolean;
}) => {
  const { isReady } = useCheckoutItemsSource();

  const renderPreview = () => {
    return <CartItemsContent isCollapsed />;
  };

  return (
    <StepCard
      number={1}
      title='Ваш заказ'
      isActive={isActive}
      isUnlocked={isUnlocked}
      onEdit={() => setStep('cart')}
      previewContent={renderPreview()}
      onNext={onComplete}
      isNextDisabled={isNextDisabled}
    >
      {!isReady ? <CartItemsSkeleton /> : <CartItemsContent />}
    </StepCard>
  );
};
