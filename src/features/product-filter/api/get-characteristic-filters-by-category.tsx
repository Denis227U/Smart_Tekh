'use server';

import { cacheLife, cacheTag } from 'next/cache';
import { prisma } from '@/src/shared/api';
import type { ProductCharacteristicGroupDto } from '../model/types';

/**
 * Retrieves and groups searchable product characteristics for a specific category.
 *
 * - Counts the occurrences of each unique characteristic value.
 * - Excludes groups containing less than 2 options.
 * - Sorts the resulting groups in descending order by their maximum priority.
 */
export const getCharacteristicFiltersByCategory = async (
  categorySlug: string,
): Promise<ProductCharacteristicGroupDto[]> => {
  'use cache';
  cacheLife('days');
  cacheTag('catalog-filters', `catalog-filters-${categorySlug}`);

  const charsByCat = await prisma.productCharacteristic.findMany({
    where: {
      product: {
        category: { slug: categorySlug },
      },
      isSearchable: true,
    },
    select: {
      name: true,
      value: true,
      priority: true,
    },
  });

  const groupsMap = new Map<
    string,
    { maxPriority: number; valuesMap: Map<string, number> }
  >();

  for (const { name, value, priority } of charsByCat) {
    if (!groupsMap.has(name)) {
      groupsMap.set(name, { maxPriority: priority, valuesMap: new Map() });
    } else {
      const g = groupsMap.get(name)!;
      if (priority > g.maxPriority) g.maxPriority = priority;
    }
    const group = groupsMap.get(name)!;
    group.valuesMap.set(value, (group.valuesMap.get(value) ?? 0) + 1);
  }

  return Array.from(groupsMap.entries())
    .map(([title, { maxPriority, valuesMap }]) => ({
      title,
      priority: maxPriority,
      values: Array.from(valuesMap.entries()).map(([value, count]) => ({
        value,
        count,
      })),
    }))
    .filter((group) => group.values.length >= 2)
    .sort((a, b) => b.priority - a.priority);
};
