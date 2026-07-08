import { ROUTES } from '@/src/shared/routes';
import { Button } from '@/src/shared/ui/client';
import s from './sign-in-trigger.module.scss';

const LABEL = 'Войти в свой аккаунт';

export const SignInTrigger = () => {
  return (
    <Button
      href={ROUTES.AUTH.MODAL('signin')}
      className={s.trigger}
      variant='main-dark'
      type='button'
      title={LABEL}
      aria-label={LABEL}
    >
      Войти
    </Button>
  );
};
