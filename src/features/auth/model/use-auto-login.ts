'use client';

import { signIn } from 'next-auth/react';
import { useEffect, useRef, useState } from 'react';
import { useAuthNavigation } from '../lib/use-auth-navigation';
import type { RegisterState } from './types';

export const useAutoLogin = ({
  state,
  savedPassword,
  callbackUrl,
}: {
  state: RegisterState;
  savedPassword: string;
  callbackUrl?: string;
}) => {
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  const successHandledRef = useRef(false);
  const { handleAuthSuccess } = useAuthNavigation({ callbackUrl });

  useEffect(() => {
    const autoLoginAndNavigate = async () => {
      if (state?.success && state?.email && !successHandledRef.current) {
        successHandledRef.current = true;
        setIsLoggingIn(true);

        try {
          const result = await signIn('credentials', {
            email: state.email,
            password: savedPassword,
            rememberMe: false,
            redirect: false,
          });

          const hasError = result?.url?.includes('error=') || result?.error;

          if (hasError || !result?.ok) {
            setLoginError(
              'Аккаунт создан, но не удалось войти автоматически. Попробуйте войти вручную.',
            );
            setIsLoggingIn(false);
            return;
          }

          handleAuthSuccess();
        } catch (err) {
          console.error('Ошибка авто-входа:', err);
          setLoginError(
            'Произошла непредвиденная ошибка при входе. Попробуйте войти вручную.',
          );
          setIsLoggingIn(false);
        }
      }
    };

    autoLoginAndNavigate();
  }, [state?.success, state?.email, savedPassword, handleAuthSuccess]);

  return {
    isLoggingIn,
    loginError,
  };
};
