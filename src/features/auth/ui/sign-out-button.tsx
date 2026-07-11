'use client';

import { signOut } from 'next-auth/react';
import { Button, type ButtonProps } from '@/src/shared/ui/client';

type SignOutButtonProps = Pick<
  ButtonProps,
  'className' | 'variant' | 'align' | 'onClick'
> & {
  callbackUrl?: string;
};

export const SignOutButton = ({
  callbackUrl = '/',
  onClick,
  ...rest
}: SignOutButtonProps) => {
  const handleSignOut = async (e: React.MouseEvent<HTMLElement>) => {
    if (onClick) {
      onClick(e);
    }

    await signOut({ callbackUrl });
  };

  return (
    <Button
      onClick={handleSignOut}
      {...rest}
    >
      Выйти
    </Button>
  );
};
