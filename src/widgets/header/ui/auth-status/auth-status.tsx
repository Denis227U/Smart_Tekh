'use client';

import { SignInTrigger } from '@/src/features/auth';
import { useSession } from '@/src/entities/user';
import { Loader } from '@/src/shared/ui/common';
import { ProfileMenu } from '../profile-menu/profile-menu';
import s from './auth-status.module.scss';

export const AuthStatus = () => {
  const { user, isLoading } = useSession();

  if (isLoading)
    return (
      <div className={s.loaderWrapper}>
        <Loader
          size='sm'
          color='dark'
        />
      </div>
    );

  return (
    <div className={s.wrapper}>
      {!user ? <SignInTrigger /> : <ProfileMenu />}
    </div>
  );
};
