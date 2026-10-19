'use client';

import { PropsWithChildren } from 'react';
import { CartProvider } from './cart-provider';
import { SessionProvider } from './session-provider';

export const Providers = ({ children }: PropsWithChildren) => {
  return (
    <SessionProvider>
      <CartProvider>{children}</CartProvider>
    </SessionProvider>
  );
};
