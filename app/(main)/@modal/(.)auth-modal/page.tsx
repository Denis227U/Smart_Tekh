import { OAuthButtons } from '@/src/features/auth';
import { Suspense } from 'react';

export default async function AuthModalPage() {
  return (
    <Suspense fallback={null}>
      <div>
        <h1>Модальное окно аутентификации</h1>
        <OAuthButtons />
      </div>
    </Suspense>
  );
}
