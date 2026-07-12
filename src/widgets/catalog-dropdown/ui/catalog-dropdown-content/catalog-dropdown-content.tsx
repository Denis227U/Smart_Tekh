'use client';

import { usePathname } from 'next/navigation';
import { CategoryItem, type CategoryDto } from '@/src/entities/category';
import { Dropdown, DropdownItem } from '@/src/shared/ui/client';
import { CatalogTrigger } from '../catalog-trigger/catalog-trigger';
import s from './catalog-dropdown-content.module.scss';

export const CatalogDropdownContent = ({
  categories,
}: {
  categories: CategoryDto[];
}) => {
  const pathname = usePathname();
  const isHome = pathname === '/';

  const sortedCategories = categories.toSorted(
    (a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0),
  );

  return (
    <nav key={isHome ? 'home->open' : 'other->close'}>
      <Dropdown
        containerClassName={s.container}
        listClassName={s.list}
        trigger={<CatalogTrigger />}
        defaultOpen={isHome}
        closeOnClickOutside={false}
        closeOnEscape={false}
      >
        {sortedCategories.map((category) => (
          <DropdownItem
            key={category.slug}
            className={s.item}
          >
            <CategoryItem
              category={category}
              className={s.link}
            />
          </DropdownItem>
        ))}
      </Dropdown>
    </nav>
  );
};
