import { ReactNode } from 'react';
import { CondensedLayout } from '@/src/app/layouts';

export default function CondensedGroupLayout({
  children,
  modal,
}: Readonly<{
  children: ReactNode;
  modal: ReactNode;
}>) {
  return (
    <CondensedLayout>
      {children}
      {modal}
    </CondensedLayout>
  );
}
