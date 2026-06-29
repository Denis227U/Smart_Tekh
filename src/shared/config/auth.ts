import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma, UserRole } from '@/src/shared/api';

const baseAdapter = PrismaAdapter(prisma);

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: {
    ...baseAdapter,
    async createUser(user) {
      // Remove id if it's undefined or '' to let Prisma use the default @default(cuid(2))
      return prisma.user.create({
        data: {
          username: user.name || '',
          avatar: user.image || '',
          email: user.email || '',
          role: UserRole.USER,
        },
      });
    },
  },
  session: { strategy: 'jwt' }, // JWT – for Credentials
  providers: [GitHub],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id as string;
        token.role = user.role || UserRole.USER;
        token.avatar = user.avatar || user.image;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role;
        session.user.avatar = token.avatar;
      }
      return session;
    },
  },
  pages: {
    signIn: '/auth',
  },
});
