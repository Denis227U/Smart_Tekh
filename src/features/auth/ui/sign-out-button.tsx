'use client';

import { signOut } from 'next-auth/react';
import { Button } from '@/src/shared/ui/client';

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
    <Button
      onClick={handleSignOut}
      className={className}
    >
      Выйти
    </Button>
  );
};
