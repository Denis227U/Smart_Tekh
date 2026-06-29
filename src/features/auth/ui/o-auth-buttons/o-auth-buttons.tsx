'use client';

import { signIn } from 'next-auth/react';

export const OAuthButtons = () => {
  return (
    <div>
      <button onClick={() => signIn('github', { callbackUrl: '/' })}>
        Войти через GitHub
      </button>
    </div>
  );
};
