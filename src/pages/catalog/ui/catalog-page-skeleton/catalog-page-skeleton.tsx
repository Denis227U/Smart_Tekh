import { Loader } from '@/src/shared/ui/common';
import s from './catalog-page-skeleton.module.scss';

export const CatalogPageSkeleton = () => {
  return (
    <div className={s.wrapper}>
      <Loader
        color='dark'
        size='lg'
      />
    </div>
  );
};
