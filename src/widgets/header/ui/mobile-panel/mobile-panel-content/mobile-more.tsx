import { InfoMenu } from '@/src/widgets/header/ui/info-menu/info-menu';
import { NAVIGATION_ITEMS } from '@/src/shared/config';
import { UserActions } from '../../user-actions/user-actions';
import { MobileMenu } from '../mobile-menu/mobile-menu';
import s from './mobile-panel-content.module.scss';

export const MobileMore = () => (
  <MobileMenu
    className={s.mobileMenuMore}
    ariaLabel='Меню с информацией для клиентов'
  >
    {
      <MobileMenu.Item>
        <UserActions variant='mobile' />
      </MobileMenu.Item>
    }
    <MobileMenu.Item>
      <InfoMenu
        variant='vertical'
        device='mobile'
        items={NAVIGATION_ITEMS}
      />
    </MobileMenu.Item>
  </MobileMenu>
);
