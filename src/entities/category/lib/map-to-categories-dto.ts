import { PrismaCategory } from '@/src/shared/api';
import type { CategoryDto } from '../model/types';

export const mapToCategoryDto = (item: PrismaCategory): CategoryDto => ({
  id: item.id,
  name: item.name,
  slug: item.slug,
  icon: item.icon,
  sortOrder: item.sortOrder,
  isActive: item.isActive,
});
