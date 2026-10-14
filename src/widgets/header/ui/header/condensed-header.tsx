import { SearchTrigger } from '@/src/features/search';
import { Logo } from '@/src/shared/ui/common';
import { AuthStatus } from '../auth-status/auth-status';
import { Contacts } from '../contacts/contacts';
import { HeaderLayout } from '../header-layout/header-layout';
import { MobilePanel } from '../mobile-panel/mobile-panel';
import { UserActions } from '../user-actions/user-actions';

export const CondensedHeader = async () => {
  return (
    <>
      <HeaderLayout
        logo={<Logo loading='eager' />}
        contacts={<Contacts />}
        search={<SearchTrigger />}
        userActions={<UserActions />}
        authStatus={<AuthStatus />}
        isCondensed
      />

      <MobilePanel />
    </>
  );
};
