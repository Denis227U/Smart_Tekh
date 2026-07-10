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
      infoMenu={<div style={{ backgroundColor: '#ccc' }}>Инфо-меню</div>}
      authStatus={<div style={{ backgroundColor: '#ccc' }}>Auth</div>}
    />
  );
};
