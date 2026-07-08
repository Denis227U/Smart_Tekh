'use client';

import { Controller } from 'react-hook-form';
import { ROUTES } from '@/src/shared/routes';
import {
  Button,
  Field,
  FieldReveal,
  FieldCheckbox,
} from '@/src/shared/ui/client';
import { Loader } from '@/src/shared/ui/common';
import { useSignInForm } from '../../model/use-sign-in-form';
import s from './sign-in-form.module.scss';

export const SignInForm = ({
  callbackUrl = ROUTES.MAIN,
}: {
  callbackUrl?: string;
}) => {
  const { control, isPending, errors, onSubmit } = useSignInForm({
    callbackUrl,
  });

  return (
    <form
      onSubmit={onSubmit}
      className={s.form}
    >
      <Controller
        name='email'
        control={control}
        render={({ field, fieldState }) => (
          <Field
            {...field}
            label='Эл. почта или телефон'
            placeholder='example@mail.ru'
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
            isRequired
          />
        )}
      />

      <Controller
        name='password'
        control={control}
        render={({ field, fieldState }) => (
          <FieldReveal
            {...field}
            label='Пароль'
            linkHref='/'
            linkText='Забыли пароль?'
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
            isRequired
          />
        )}
      />

      <Controller
        name='rememberMe'
        control={control}
        render={({ field: { value, ...fieldProps } }) => (
          <FieldCheckbox
            {...fieldProps}
            checked={value}
            text='Запомнить меня'
          />
        )}
      />

      {errors.root && <p className={s.errorMsg}>{errors.root.message}</p>}

      <Button
        type='submit'
        disabled={isPending}
        variant='main-dark'
        aria-label='Войти в свой аккаунт'
      >
        {isPending ? <Loader size='sm' /> : 'Войти'}
      </Button>
    </form>
  );
};
