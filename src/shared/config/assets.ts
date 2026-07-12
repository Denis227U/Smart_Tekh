import { clientEnv } from '@/src/shared/config/env-client';

export const ASSETS_BASE_URL = clientEnv.NEXT_PUBLIC_ASSETS_BASE_URL;

export const ASSET_PATHS = {
  CATEGORIES: 'categories',
} as const;
