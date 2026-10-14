import { PropsWithChildren } from 'react';
import { CondensedHeader } from '@/src/widgets/header';

export const CondensedLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <CondensedHeader />

      <main>{children}</main>

      <div style={{ height: '60px', backgroundColor: '#ccc' }}>
        CondensedFooter
      </div>
    </>
  );
};
