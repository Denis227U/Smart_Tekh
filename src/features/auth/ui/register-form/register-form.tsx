'use client';

import Link from 'next/link';
import { Button, Field, FieldReveal } from '@/src/shared/ui/client';
import { Loader } from '@/src/shared/ui/common';
import { useRegisterForm } from '../../model/use-register-form';
import s from './register-form.module.scss';

export const RegisterForm = () => {
  const { state, isLoading, errorMessage, onSubmit } = useRegisterForm();

  return (
    <form
      onSubmit={onSubmit}
      className={s.form}
    >
      <Field
        name='username'
        label='Имя'
        placeholder='Иван Иванов'
        defaultValue={state?.username || ''}
        error={Boolean(state?.errors?.username)}
        helperText={state?.errors?.username?.[0]}
      />

      <Field
        name='email'
        label='Эл. почта'
        placeholder='example@mail.ru'
        defaultValue={state?.email || ''}
        error={Boolean(state?.errors?.email)}
        helperText={state?.errors?.email?.[0]}
        isRequired
      />

      <Field
        name='phone'
        label='Номер телефона'
        placeholder='+7 (999) 999-99-99'
        defaultValue={state?.phone || ''}
        error={Boolean(state?.errors?.phone)}
        helperText={state?.errors?.phone?.[0]}
      />

      <FieldReveal
        label='Придумайте пароль'
        name='password'
        error={Boolean(state?.errors?.password)}
        helperText={state?.errors?.password?.[0]}
        isRequired
      />

      <FieldReveal
        label='Повторите пароль'
        name='confirmPassword'
        error={Boolean(state?.errors?.confirmPassword)}
        helperText={state?.errors?.confirmPassword?.[0]}
        isRequired
      />

      <span className={s.text}>
        Регистрируясь, вы соглашаетесь с{' '}
        <Link
          href='/terms'
          target='_blank'
          className={s.link}
        >
          пользовательским соглашением
        </Link>
      </span>

      {errorMessage && <p className={s.error}>{errorMessage}</p>}

      <Button
        type='submit'
        disabled={isLoading}
        variant='main-dark'
        aria-label='Создайте свой аккаунт'
      >
        {isLoading ? <Loader size='sm' /> : 'Зарегистрироваться'}
      </Button>
    </form>
  );
};
