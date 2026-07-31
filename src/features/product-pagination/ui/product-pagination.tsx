'use client';

import { useCatalogParams } from '@/src/entities/product';
import { Pagination } from '@/src/shared/ui/client';

export const ProductPagination = ({ totalPages }: { totalPages: number }) => {
  const { filters, setFilter } = useCatalogParams();

  const handlePageChange = (newPage: number) => {
    setFilter('page', newPage);

    window.scrollTo({
      top: 250,
      behavior: 'smooth',
    });
  };

  return (
    <Pagination
      currentPage={filters.page}
      totalPages={totalPages}
      onPageChange={handlePageChange}
    />
  );
};
