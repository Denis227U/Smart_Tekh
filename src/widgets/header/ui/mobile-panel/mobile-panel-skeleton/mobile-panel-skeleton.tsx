import { Loader } from '@/src/shared/ui/common';
import s from './mobile-panel-skeleton.module.scss';

export const MobilePanelSkeleton = () => {
  return (
    <div className={s.skeleton}>
      <Loader
        color='default'
        size='md'
      />
    </div>
  );
};
