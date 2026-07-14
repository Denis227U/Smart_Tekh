import { Button, type ButtonProps } from '@/src/shared/ui/client';
import { Icon } from '@/src/shared/ui/common';
import s from './catalog-trigger.module.scss';

type CatalogTriggerProps = Pick<ButtonProps, 'className' | 'align' | 'onClick'>;

export const CatalogTrigger = ({ onClick, ...rest }: CatalogTriggerProps) => {
  return (
    <Button
      onClick={onClick}
      {...rest}
      className={s.trigger}
      align='left'
    >
      <Icon
        name='Catalog'
        size={24}
      />
      <span>Каталог товаров</span>
    </Button>
  );
};
