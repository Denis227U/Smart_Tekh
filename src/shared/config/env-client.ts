import { z } from 'zod';

const clientEnvSchema = z.object({
  NEXT_PUBLIC_ASSETS_BASE_URL: z.string().url(),
});

const processEnv = {
  NEXT_PUBLIC_ASSETS_BASE_URL: process.env.NEXT_PUBLIC_ASSETS_BASE_URL,
};

const parsed = clientEnvSchema.safeParse(processEnv);

if (!parsed.success) {
  console.error(
    '❌ Invalid client environment variables:',
    parsed.error.flatten().fieldErrors,
  );
  throw new Error('Invalid client environment variables');
}

export const clientEnv = parsed.data;
