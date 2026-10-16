'use client';

import { ReactNode } from 'react';
import { useInitialCart } from '@/src/entities/cart';

interface CartProviderProps {
  children: ReactNode;
}

export function CartProvider({ children }: CartProviderProps) {
  useInitialCart();

  return <>{children}</>;
}
