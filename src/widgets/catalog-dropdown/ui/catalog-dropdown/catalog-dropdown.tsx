'use client';

import { usePathname } from 'next/navigation';
import { CategoryItem, CATEGORIES_MOCK } from '@/src/entities/category';
import { Dropdown, DropdownItem } from '@/src/shared/ui/client';
import { CatalogTrigger } from '../catalog-trigger/catalog-trigger';
import s from './catalog-dropdown.module.scss';

export const CatalogDropdown = () => {
  const pathname = usePathname();
  const isHome = pathname === '/';

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
        {CATEGORIES_MOCK.map((category) => (
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
