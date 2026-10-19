import { useStoreHydration } from '@/src/shared/lib/client';
import { useCartStore } from './store';

export const useCartHydrated = () => useStoreHydration(useCartStore);
