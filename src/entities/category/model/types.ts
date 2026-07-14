import { PrismaCategory } from '@/src/shared/api';

export type CategoryDto = Omit<PrismaCategory, 'createdAt' | 'updatedAt'>;
