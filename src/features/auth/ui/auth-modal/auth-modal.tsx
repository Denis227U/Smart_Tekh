'use client';

import { useRouter } from 'next/navigation';
import { cn } from '@/src/shared/lib';
import { Button, Modal } from '@/src/shared/ui/client';
import { useAuthMode } from '../../model/use-auth-mode';
import { OAuthButtons } from '../o-auth-buttons/o-auth-buttons';
import { RegisterForm } from '../register-form/register-form';
import { SignInForm } from '../sign-in-form/sign-in-form';
import s from './auth-modal.module.scss';

export function AuthModal() {
  const router = useRouter();
  const { mode, switchMode } = useAuthMode();
  const isSignIn = mode === 'signin';

  return (
    <Modal
      onClose={() => router.back()}
      aria-labelledby='auth-title'
      closeButtonLabel='Закрыть окно'
      title={isSignIn ? 'Вход' : 'Регистрация'}
    >
      {isSignIn ? (
        <>
          <SignInForm />
          <div className={s.oauthWrapper}>
            <p>Или войдите через соцсети:</p>
            <OAuthButtons />
          </div>
        </>
      ) : (
        <RegisterForm />
      )}

      <Button
        onClick={switchMode}
        className={cn(s.switchBtn)}
      >
        {isSignIn ? 'Зарегистрироваться' : 'У меня уже есть аккаунт'}
      </Button>
    </Modal>
  );
}
