'use client';

import { signOut } from 'next-auth/react';

export const SignOutButton = ({
  callbackUrl = '/',
  className,
}: {
  callbackUrl?: string;
  className?: string;
}) => {
  const handleSignOut = async () => {
    await signOut({ callbackUrl });
  };

  return (
    <button
      onClick={handleSignOut}
      className={className}
    >
      Выйти
    </button>
  );
};
