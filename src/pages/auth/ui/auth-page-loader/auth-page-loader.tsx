import { Loader } from '@/src/shared/ui/common';
import s from './auth-page-loader.module.scss';

export function AuthPageLoader() {
  return (
    <div className={s.wrapper}>
      <Loader
        size='lg'
        color='dark'
      />
    </div>
  );
}
