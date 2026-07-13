import { cn } from '@/src/shared/lib';
import s from './mobile-menu.module.scss';

export const MobileMenu = ({
  className,
  children,
  ariaLabel,
}: {
  className?: string;
  children: React.ReactNode;
  ariaLabel: string;
}) => (
  <nav
    className={cn(s.mobileMenu, className)}
    aria-label={ariaLabel}
  >
    <ul className={s.mobileMenuList}>{children}</ul>
  </nav>
);

const MobileMenuItem = ({ children }: { children: React.ReactNode }) => (
  <li className={s.mobileMenuItem}>{children}</li>
);

MobileMenu.Item = MobileMenuItem;
