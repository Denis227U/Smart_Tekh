'use client';

import Image from 'next/image';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { Button } from '@/src/shared/ui/client';
import { Loader } from '@/src/shared/ui/common';
import s from './o-auth-buttons.module.scss';

export const OAuthButtons = ({
  callbackUrl = '/',
}: {
  callbackUrl?: string;
}) => {
  const [loadingProvider, setLoadingProvider] = useState<string | null>(null);

  const handleSignIn = async (provider: 'github' | 'yandex') => {
    try {
      setLoadingProvider(provider);
      await signIn(provider, { callbackUrl });
    } catch (error) {
      console.error(error);
      setLoadingProvider(null);
    }
  };

  return (
    <div className={s.wrapper}>
      <Button
        onClick={() => handleSignIn('github')}
        disabled={loadingProvider !== null}
        className={s.button}
        title='Войти через GitHub'
        aria-label='Войти через GitHub'
      >
        {loadingProvider === 'github' ? (
          <Loader
            size='sm'
            color='dark'
          />
        ) : (
          <Image
            src='/github-icon.svg'
            alt=''
            width={30}
            height={30}
            aria-hidden='true'
          />
        )}
      </Button>
      <Button
        onClick={() => handleSignIn('yandex')}
        disabled={loadingProvider !== null}
        className={s.button}
        title='Войти через yandex'
        aria-label='Войти через yandex'
      >
        {loadingProvider === 'yandex' ? (
          <Loader
            size='sm'
            color='dark'
          />
        ) : (
          <Image
            src='/yandex-icon.svg'
            alt=''
            width={30}
            height={30}
            aria-hidden='true'
          />
        )}
      </Button>
    </div>
  );
};
