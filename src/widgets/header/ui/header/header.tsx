import { InfoMenu } from '@/src/widgets/header/ui/info-menu/info-menu';
import { NAVIGATION_ITEMS } from '@/src/shared/config';
import { Logo } from '@/src/shared/ui/common';
import { AuthStatus } from '../auth-status/auth-status';
import { Contacts } from '../contacts/contacts';
import { HeaderLayout } from '../header-layout/header-layout';

export const Header = async ({ catalog }: { catalog: React.ReactNode }) => {
  return (
    <HeaderLayout
      logo={<Logo loading='eager' />}
      contacts={<Contacts />}
      userActions={<div style={{ backgroundColor: '#ccc' }}>Actions</div>}
      catalog={catalog}
      infoMenu={<InfoMenu items={NAVIGATION_ITEMS} />}
      authStatus={<AuthStatus />}
    />
  );
};
