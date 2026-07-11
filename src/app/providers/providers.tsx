'use client';

import { PropsWithChildren } from 'react';
import { SessionProvider } from './session-provider';

export const Providers = ({ children }: PropsWithChildren) => {
  return <SessionProvider>{children}</SessionProvider>;
};
