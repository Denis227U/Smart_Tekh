'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { BaseMenuItem } from '../../model/types';
import s from './info-menu.module.scss';

export const InfoMenu = ({ items }: { items: BaseMenuItem[] }) => {
  const pathname = usePathname();

  return (
    <nav
      className={s.menu}
      aria-label='Меню с информацией для клиентов'
    >
      <ul className={s.list}>
        {items.map(({ label, href }) => {
          const isCurrent = pathname === href;

          return (
            <li
              className={s.item}
              key={label}
            >
              <Link
                href={href}
                className={s.link}
                data-active={isCurrent || undefined}
              >
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
