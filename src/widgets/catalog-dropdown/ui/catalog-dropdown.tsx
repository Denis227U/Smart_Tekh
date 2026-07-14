import { Suspense } from 'react';
import { Loader } from '@/src/shared/ui/common';
import { CatalogDropdownAsync } from './catalog-dropdown-async';

export const CatalogDropdown = () => {
  return (
    <Suspense fallback={<Loader size='md' />}>
      <CatalogDropdownAsync />
    </Suspense>
  );
};
