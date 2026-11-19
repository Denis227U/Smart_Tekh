'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { CHECKOUT_STEPS } from './constants';
import type { CheckoutStep } from './types';

export function useCheckoutSteps(serverStep?: string | string[]) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const clientStepParam = searchParams?.get('step');

  // Use searchParams if valid, otherwise fallback to 'cart'
  const stepParam =
    clientStepParam || (typeof serverStep === 'string' ? serverStep : null);

  const currentStep: CheckoutStep = CHECKOUT_STEPS.includes(
    stepParam as CheckoutStep,
  )
    ? (stepParam as CheckoutStep)
    : 'cart';

  // Check URL for 'step' param, default to 'cart' if missing
  // Use window.history.replaceState to keep the browser history clean
  useEffect(() => {
    if (!searchParams?.has('step')) {
      const params = new URLSearchParams(searchParams?.toString());
      params.set('step', 'cart');

      window.history.replaceState(null, '', `${pathname}?${params.toString()}`);
    }
  }, [searchParams, pathname]);

  const setStep = (step: CheckoutStep) => {
    const params = new URLSearchParams(searchParams?.toString());
    params.set('step', step);

    // Soft navigation
    window.history.pushState(null, '', `${pathname}?${params.toString()}`);
  };

  const nextStep = () => {
    const currentIndex = CHECKOUT_STEPS.indexOf(currentStep);
    if (currentIndex < CHECKOUT_STEPS.length - 1) {
      setStep(CHECKOUT_STEPS[currentIndex + 1]);
    }
  };

  const isStepPassed = (step: CheckoutStep) => {
    return CHECKOUT_STEPS.indexOf(step) < CHECKOUT_STEPS.indexOf(currentStep);
  };

  return {
    currentStep,
    setStep,
    nextStep,
    isStepPassed,
  };
}
