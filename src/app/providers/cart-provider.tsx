'use client';

import { ReactNode } from 'react';
import { useInitialCart } from '@/src/entities/cart';
import { useSession } from '@/src/entities/user';

interface CartProviderProps {
  children: ReactNode;
}

export function CartProvider({ children }: CartProviderProps) {
  const { user, isLoading } = useSession();
  const userId = user?.id;

  useInitialCart(isLoading ? undefined : userId);

  return <>{children}</>;
}
