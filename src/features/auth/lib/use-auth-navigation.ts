'use client';

import { usePathname, useRouter } from 'next/navigation';
import { startTransition, useCallback } from 'react';

export const useAuthNavigation = () => {
  const router = useRouter();
  const pathname = usePathname();

  const handleAuthSuccess = useCallback(() => {
    startTransition(() => {
      if (pathname?.includes('auth-modal')) {
        // Modal: first refresh server components, then close
        router.refresh();
        setTimeout(() => {
          router.back();
        }, 0);
      } else {
        // Page: first navigate to home, then refresh server components
        router.push('/');
        setTimeout(() => {
          router.refresh();
        }, 50);
      }
    });
  }, [router, pathname]);

  return { handleAuthSuccess };
};
