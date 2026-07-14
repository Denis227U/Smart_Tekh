import { cn } from '@/src/shared/lib';
import { Badge, Icon } from '@/src/shared/ui/common';
import s from './user-actions.module.scss';

export const UserActions = ({
  variant = 'desctop',
}: {
  variant?: 'desctop' | 'mobile';
}) => {
  // TODO: Mock data
  const cart = 2;
  const fav = 1;
  const comp = 0;
  const viewed = 14;

  return (
    <nav
      className={s.actions}
      data-variant={variant}
      aria-label='Меню пользователя'
    >
      <ul className={s.list}>
        <li className={s.item}>
          <Badge
            href='/#'
            label='Просмотренные'
            count={viewed}
          >
            <Icon
              name='Eye'
              height={18}
              width={26}
            />
          </Badge>
        </li>
        <li className={s.item}>
          <Badge
            className={cn({ [s.favorite]: fav > 0 })}
            href='/#'
            label='Избранные товары'
            count={fav}
          >
            <Icon
              name='Like'
              height={24}
              width={26}
            />
          </Badge>
        </li>
        <li className={s.item}>
          <Badge
            href='/#'
            label='Товары дял сравнения'
            count={comp}
          >
            <Icon
              name='Chart'
              height={24}
              width={26}
            />
          </Badge>
        </li>
        <li className={s.item}>
          <Badge
            className={s.cart}
            href='/#'
            label='Корзина'
            count={cart}
          >
            <Icon
              name='Cart'
              height={20}
            />
          </Badge>
        </li>
      </ul>
    </nav>
  );
};
