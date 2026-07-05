import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';
import Credentials from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@auth/prisma-adapter';
import bcrypt from 'bcryptjs';
import { prisma, UserRole } from '@/src/shared/api';
import { signInSchema } from '@/src/shared/lib';

export const SESSION_COOKIE_MAX_AGE = {
  MONTH: 30 * 24 * 60 * 60, // 30 days
  HOUR: 60 * 60, // 1 hour
} as const;

export const SESSION_COOKIE_NAME =
  process.env.NODE_ENV === 'production'
    ? '__Secure-authjs.session-token'
    : 'authjs.session-token';

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
  providers: [
    GitHub,

    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
        rememberMe: { label: 'Remember Me', type: 'text' },
      },
      async authorize(credentials) {
        const preparedCredentials = {
          ...credentials,
          rememberMe:
            credentials?.rememberMe === 'true' ||
            credentials?.rememberMe === 'on',
        };

        const validated = signInSchema.safeParse(preparedCredentials);
        if (!validated.success) return null;

        const { email, password } = validated.data;

        const user = await prisma.user.findUnique({
          where: { email: email as string },
        });

        if (!user || !user.password) return null;

        const isValid = await bcrypt.compare(password as string, user.password);
        if (!isValid) return null;

        return {
          id: user.id,
          name: user.username,
          email: user.email,
          phone: user.phone,
          avatar: user.avatar,
          role: user.role,
        };
      },
    }),
  ],
  session: { strategy: 'jwt', maxAge: SESSION_COOKIE_MAX_AGE.HOUR }, // 'jwt' – for Credentials
  cookies: {
    sessionToken: {
      name: SESSION_COOKIE_NAME,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
      },
    },
  },
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
    signIn: '/auth?mode=signin',
  },
});
