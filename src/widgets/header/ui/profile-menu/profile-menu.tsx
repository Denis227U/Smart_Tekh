import Link from 'next/link';
import { SignOutButton } from '@/src/features/auth';
import { PROFILE_MENU } from '@/src/entities/user';
import { Button, Dropdown, DropdownItem } from '@/src/shared/ui/client';
import { Icon } from '@/src/shared/ui/common';
import s from './profile-menu.module.scss';

const TITLE = 'Меню профиля';

export const ProfileMenu = () => {
  return (
    <nav>
      <Dropdown
        containerClassName={s.container}
        listClassName={s.list}
        trigger={
          <Button
            className={s.trigger}
            title={TITLE}
            aria-label={TITLE}
          >
            <Icon
              name='Profile'
              size={24}
              aria-hidden='true'
            />
          </Button>
        }
        align='right'
      >
        {PROFILE_MENU.map(({ title, href }) => (
          <DropdownItem key={title}>
            <Link
              href={href}
              className={s.link}
            >
              {title}
            </Link>
          </DropdownItem>
        ))}
        <DropdownItem>
          <SignOutButton
            className={s.signout}
            align='left'
          />
        </DropdownItem>
      </Dropdown>
    </nav>
  );
};
