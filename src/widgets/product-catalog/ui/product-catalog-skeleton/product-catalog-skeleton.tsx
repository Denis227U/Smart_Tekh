import { Loader } from '@/src/shared/ui/common';
import s from './product-catalog-skeleton.module.scss';

export const ProductCatalogSkeleton = () => {
  return (
    <div className={s.wrapper}>
      <Loader
        color='dark'
        size='lg'
      />
    </div>
  );
};
