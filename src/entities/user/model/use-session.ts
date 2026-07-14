'use client';

import { useSession as useNextAuthSession } from 'next-auth/react';

export const useSession = () => {
  const { data: session, status } = useNextAuthSession();

  return {
    user: session?.user ?? null,
    isAuthenticated: status === 'authenticated',
    isLoading: status === 'loading',
  };
};
