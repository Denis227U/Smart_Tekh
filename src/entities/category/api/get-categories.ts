import 'server-only';

import { cacheLife, cacheTag } from 'next/cache';
import { prisma } from '@/src/shared/api';
import { mapToCategoryDto } from '../lib/map-to-categories-dto';
import type { CategoryDto } from '../model/types';

export const getCategories = async (): Promise<CategoryDto[]> => {
  'use cache';
  cacheLife('hours');
  cacheTag('categories');

  const data = await prisma.category.findMany();

  return data.map(mapToCategoryDto);
};
