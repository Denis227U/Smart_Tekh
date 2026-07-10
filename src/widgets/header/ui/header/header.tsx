import { InfoMenu } from '@/src/widgets/header/ui/info-menu/info-menu';
import { NAVIGATION_ITEMS } from '@/src/shared/config';
import { Logo } from '@/src/shared/ui/common';
import { Contacts } from '../contacts/contacts';
import { HeaderLayout } from '../header-layout/header-layout';

export const Header = async () => {
  return (
    <HeaderLayout
      logo={<Logo loading='eager' />}
      contacts={<Contacts />}
      userActions={<div style={{ backgroundColor: '#ccc' }}>Actions</div>}
      catalog={<div style={{ backgroundColor: '#ccc' }}>Каталог</div>}
      infoMenu={<InfoMenu items={NAVIGATION_ITEMS} />}
      authStatus={<div style={{ backgroundColor: '#ccc' }}>Auth</div>}
    />
  );
};
