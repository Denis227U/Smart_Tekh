import { ProductFilterChips } from '@/src/features/product-filter';
import { ProductSort } from '@/src/features/product-sort';
import s from './catalog-toolbar.module.scss';

export const CatalogToolbar = () => {
  return (
    <div className={s.toolbar}>
      <ProductFilterChips />
      <div className={s.sort}>
        <ProductSort />
      </div>
    </div>
  );
};
