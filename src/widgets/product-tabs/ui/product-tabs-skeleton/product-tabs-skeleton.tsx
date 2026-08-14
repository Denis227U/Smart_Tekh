import { Loader } from '@/src/shared/ui/common';
import s from './product-tabs-skeleton.module.scss';

export const ProductTabsSkeleton = () => {
  return (
    <div className={s.wrapper}>
      <Loader
        color='dark'
        size='lg'
      />
    </div>
  );
};
