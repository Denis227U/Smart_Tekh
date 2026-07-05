'use server';

import { cookies } from 'next/headers';
import {
  SESSION_COOKIE_MAX_AGE,
  SESSION_COOKIE_NAME,
} from '@/src/shared/config/server';

/**
 * Set the maxAge of the session cookie based on the user's preference.
 * @param {boolean} rememberMe - The "Запомнить меня" flag. If true - 1 month; otherwise, 1 hour.
 */
export const setSessionCookieMaxAge = async (
  rememberMe: boolean,
): Promise<void> => {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME);

  if (sessionCookie) {
    cookieStore.set(SESSION_COOKIE_NAME, sessionCookie.value, {
      ...sessionCookie,
      maxAge: rememberMe
        ? SESSION_COOKIE_MAX_AGE.MONTH
        : SESSION_COOKIE_MAX_AGE.HOUR,
    });
  }
};
