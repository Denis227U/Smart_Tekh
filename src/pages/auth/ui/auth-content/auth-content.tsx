'use client';

import Link from 'next/link';
import { use } from 'react';
import { OAuthButtons, RegisterForm, SignInForm } from '@/src/features/auth';
import { ROUTES } from '@/src/shared/routes';
import { Heading, Icon } from '@/src/shared/ui/common';
import s from './auth-content.module.scss';

export const AuthContent = ({
  searchParams,
}: {
  searchParams: Promise<{ mode?: string; callbackUrl?: string }>;
}) => {
  const { mode, callbackUrl } = use(searchParams) ?? {};
  const isSignIn = mode === 'signin';

  const callbackQuery = callbackUrl
    ? `&callbackUrl=${encodeURIComponent(callbackUrl)}`
    : '';

  const signinUrl = `${ROUTES.AUTH.PAGE('signin')}${callbackQuery}`;
  const registerUrl = `${ROUTES.AUTH.PAGE('register')}${callbackQuery}`;

  return (
    <>
      <Heading
        tag='h1'
        variant='h1'
        className={s.title}
      >
        {isSignIn ? 'Вход' : 'Регистрация'}

        <Icon
          name={isSignIn ? 'Lock' : 'Register'}
          size={50}
        />
      </Heading>

      {isSignIn ? (
        <>
          <SignInForm callbackUrl={callbackUrl} />
          <div className={s.oauthWrapper}>
            <p>Или войдите через соцсети:</p>
            <OAuthButtons />
          </div>
        </>
      ) : (
        <RegisterForm callbackUrl={callbackUrl} />
      )}

      <Link
        href={isSignIn ? registerUrl : signinUrl}
        className={s.switchBtn}
      >
        {isSignIn ? 'Зарегистрироваться' : 'У меня уже есть аккаунт'}
      </Link>
    </>
  );
};
