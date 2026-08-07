import { Loader } from '@/src/shared/ui/common';
import s from './catalog-sidebar-skeleton.module.scss';

export const CatalogSidebarSkeleton = () => {
  return (
    <div className={s.wrapper}>
      <Loader
        color='dark'
        size='lg'
      />
    </div>
  );
};
