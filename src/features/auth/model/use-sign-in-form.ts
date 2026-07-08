'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { signInSchema, type SignInInput } from '@/src/shared/lib';
import { ROUTES } from '@/src/shared/routes';
import { setSessionCookieMaxAge } from '../lib/set-session-cookie-max-age';
import { useAuthNavigation } from '../lib/use-auth-navigation';

export const useSignInForm = ({
  callbackUrl = ROUTES.MAIN,
}: {
  callbackUrl?: string;
}) => {
  const { handleAuthSuccess } = useAuthNavigation({ callbackUrl });
  const [isPending, setIsPending] = useState(false);

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<SignInInput>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const onSubmit = async (data: SignInInput) => {
    setIsPending(true);

    const result = await signIn('credentials', {
      email: data.email,
      password: data.password,
      rememberMe: data.rememberMe,
      redirect: false,
    });

    const hasError = result?.url?.includes('error=') || result?.error;

    if (hasError || !result?.ok) {
      setError('root', {
        type: 'manual',
        message: 'Неверный email или пароль',
      });
      setIsPending(false);
      return;
    }

    await setSessionCookieMaxAge(data.rememberMe);
    handleAuthSuccess();
  };

  return {
    control,
    isPending,
    errors,
    onSubmit: handleSubmit(onSubmit),
  };
};
