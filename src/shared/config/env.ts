import { z } from 'zod';

const serverEnvSchema = z.object({
  DATABASE_URL: z.string().url(),
  DB_USER: z.string().min(1),
  DB_PASSWORD: z.string().min(1),
  DB_NAME: z.string().min(1),
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
