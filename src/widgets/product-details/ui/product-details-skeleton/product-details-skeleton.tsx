import { Loader } from '@/src/shared/ui/common';
import s from './product-details-skeleton.module.scss';

export const ProductDetailsSkeleton = () => {
  return (
    <div className={s.wrapper}>
      <Loader
        color='dark'
        size='lg'
      />
    </div>
  );
};
