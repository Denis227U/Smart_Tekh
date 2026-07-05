'use client';

import { useActionState, useState, useTransition } from 'react';
import { registerUserAction } from '../api/register-user-action';
import { useAutoLogin } from './use-auto-login';
import type { RegisterState } from './types';

const initialState: RegisterState = {};

export const useRegisterForm = () => {
  const [state, formAction] = useActionState(registerUserAction, initialState);

  const [isPendingTransition, startTransition] = useTransition();

  const [savedPassword, setSavedPassword] = useState('');
  const { isLoggingIn, loginError } = useAutoLogin({ savedPassword, state });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const password = formData.get('password') as string;
    setSavedPassword(password);

    startTransition(async () => {
      await formAction(formData);
    });
  };

  const errorMessage = state?.error || loginError;
  const isLoading = isPendingTransition || isLoggingIn;

  return {
    state,
    isLoading,
    errorMessage,
    onSubmit: handleSubmit,
  };
};
