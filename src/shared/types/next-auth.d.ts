import { UserRole } from '@/src/shared/api/enums';
import type { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      role: UserRole;
      avatar?: string | null;
      username?: string | null;
      phone?: string | null;
    } & DefaultSession['user'];
  }

  interface User {
    role?: UserRole;
    avatar?: string | null;
    username?: string | null;
    phone?: string | null;
  }
}

declare module '@auth/core/jwt' {
  interface JWT {
    id: string;
    role: UserRole;
    avatar?: string | null;
    username?: string | null;
    phone?: string | null;
  }
}
