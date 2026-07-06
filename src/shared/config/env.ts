import 'server-only';

import { z } from 'zod';

const serverEnvSchema = z.object({
  // Next.js environment
  NODE_ENV: z.enum(['development', 'production', 'test']),

  // DB
  DATABASE_URL: z.string().url(),
  DB_USER: z.string().min(1),
  DB_PASSWORD: z.string().min(1),
  DB_NAME: z.string().min(1),

  // Next-Auth v5
  NEXTAUTH_URL: z.string().url().optional(),
  AUTH_SECRET: z.string().min(1),

  // Providers
  AUTH_GITHUB_ID: z.string().min(1),
  AUTH_GITHUB_SECRET: z.string().min(1),
  AUTH_YANDEX_ID: z.string().min(1),
  AUTH_YANDEX_SECRET: z.string().min(1),
});

const parsed = serverEnvSchema.safeParse(process.env);

if (!parsed.success) {
  console.error(
    '❌ Invalid server environment variables:',
    parsed.error.flatten().fieldErrors,
  );
  throw new Error('Invalid server environment variables');
}

export const serverEnv = parsed.data;
