import { PropsWithChildren } from 'react';
import { Header } from '@/src/widgets/header';

export const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Header />

      <main>{children}</main>

      <div style={{ height: '420px', backgroundColor: '#ccc' }}>Footer</div>
    </>
  );
};
