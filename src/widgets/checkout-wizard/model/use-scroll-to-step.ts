import { useEffect, useRef } from 'react';
import { CHECKOUT_STEPS } from './constants';
import type { CheckoutStep } from './types';

export function useScrollToStep(currentStep: CheckoutStep) {
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const stepNumber = CHECKOUT_STEPS.indexOf(currentStep) + 1;
    const element = document.getElementById(`checkout-step-${stepNumber}`);

    if (element) {
      requestAnimationFrame(() => {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      });
    }
  }, [currentStep]);
}
