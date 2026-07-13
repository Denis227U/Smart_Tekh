import { Button } from '@/src/shared/ui/client';
import { Icon } from '@/src/shared/ui/common';
import s from './search-trigger.module.scss';

export const SearchTrigger = () => {
  return (
    <Button className={s.trigger}>
      <Icon name='Search' />
      <span>Поиск</span>
    </Button>
  );
};
