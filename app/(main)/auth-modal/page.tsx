import { AuthModalRedirectInner } from './_auth-modal-redirect-inner';
import { Suspense } from 'react';

export default async function AuthModalRedirect({
  searchParams,
}: {
  searchParams: Promise<{ mode?: string }>;
}) {
  return (
    <Suspense fallback={null}>
      <AuthModalRedirectInner searchParams={searchParams} />
    </Suspense>
  );
}
