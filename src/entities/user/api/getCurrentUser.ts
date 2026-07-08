import { auth } from '@/src/shared/config/auth';

export async function getCurrentUser() {
  const session = await auth();
  return session?.user ?? null;
}
