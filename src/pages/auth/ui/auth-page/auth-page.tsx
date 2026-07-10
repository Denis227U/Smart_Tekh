import { Suspense } from 'react';
import { Container } from '@/src/shared/ui/common';
import { AuthContent } from '../auth-content/auth-content';
import { AuthPageLoader } from '../auth-page-loader/auth-page-loader';
import s from './auth-page.module.scss';

export const AuthPage = ({
  searchParams,
}: {
  searchParams: Promise<{ mode?: string; callbackUrl?: string }>;
}) => {
  return (
    <Container
      tag='section'
      className={s.wrapper}
      size='sm'
    >
      <Suspense fallback={<AuthPageLoader />}>
        <AuthContent searchParams={searchParams} />
      </Suspense>
    </Container>
  );
};
