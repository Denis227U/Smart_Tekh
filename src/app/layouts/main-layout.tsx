import { PropsWithChildren } from 'react';
import { CatalogDropdown } from '@/src/widgets/catalog-dropdown';
import { Header } from '@/src/widgets/header';

export const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Header catalog={<CatalogDropdown />} />

      <main>{children}</main>

      <div style={{ height: '420px', backgroundColor: '#ccc' }}>Footer</div>
    </>
  );
};
