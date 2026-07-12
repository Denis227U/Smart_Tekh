import { getCategories } from '@/src/entities/category/server';
import { CatalogDropdownContent } from './catalog-dropdown-content/catalog-dropdown-content';

export const CatalogDropdownAsync = async () => {
  const categories = await getCategories();

  return <CatalogDropdownContent categories={categories} />;
};
