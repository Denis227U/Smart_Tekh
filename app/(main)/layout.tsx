import { ReactNode } from 'react';
import { MainLayout } from '@/src/app/layouts';

export default function MainGroupLayout({
  children,
  modal,
}: Readonly<{
  children: ReactNode;
  modal: ReactNode;
}>) {
  return (
    <MainLayout>
      {children}
      {modal}
    </MainLayout>
  );
}
