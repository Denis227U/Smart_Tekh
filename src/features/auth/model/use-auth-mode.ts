'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
import { ROUTES } from '@/src/shared/routes';

export const useAuthMode = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const mode = searchParams?.get('mode') === 'register' ? 'register' : 'signin';

  const switchMode = useCallback(() => {
    const newMode = mode === 'signin' ? 'register' : 'signin';
    router.replace(ROUTES.AUTH.MODAL(newMode), { scroll: false });
  }, [mode, router]);

  return { mode, switchMode };
};
