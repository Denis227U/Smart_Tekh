import { Suspense } from 'react';
import { AuthModal } from '@/src/features/auth';

export default async function AuthModalPage() {
  return (
    <Suspense fallback={null}>
      <AuthModal />
    </Suspense>
  );
}
