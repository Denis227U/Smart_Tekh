'use client';

import { useRouter } from 'next/navigation';
import { Button, Modal } from '@/src/shared/ui/client';
import { cn } from '@/src/shared/lib';
import { useAuthMode } from '../../model/use-auth-mode';
import { OAuthButtons } from '../o-auth-buttons/o-auth-buttons';
import s from './auth-modal.module.scss';

export function AuthModal() {
  const router = useRouter();
  const { mode, switchMode } = useAuthMode();

  return (
    <Modal
      onClose={() => router.back()}
      aria-labelledby='auth-title'
      closeButtonLabel='Закрыть окно'
      title={mode === 'signin' ? 'Вход' : 'Регистрация'}
    >
      {mode === 'signin' ? (
        <div>
          Вход
          <OAuthButtons />
        </div>
      ) : (
        <div>Регистрация</div>
      )}

      <Button
        onClick={switchMode}
        className={cn(s.switchBtn)}
      >
        {mode === 'signin' ? 'Зарегистрироваться' : 'У меня уже есть аккаунт'}
      </Button>
    </Modal>
  );
}
