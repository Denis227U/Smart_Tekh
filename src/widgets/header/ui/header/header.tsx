import { Suspense } from 'react';
import { InfoMenu } from '@/src/widgets/header/ui/info-menu/info-menu';
import { SearchTrigger } from '@/src/features/search';
import { NAVIGATION_ITEMS } from '@/src/shared/config';
import { Loader, Logo } from '@/src/shared/ui/common';
import { AuthStatus } from '../auth-status/auth-status';
import { Contacts } from '../contacts/contacts';
import { HeaderLayout } from '../header-layout/header-layout';
import { MobilePanel } from '../mobile-panel/mobile-panel';
import { UserActions } from '../user-actions/user-actions';

export const Header = async ({ catalog }: { catalog: React.ReactNode }) => {
  return (
    <>
      <HeaderLayout
        logo={<Logo loading='eager' />}
        contacts={<Contacts />}
        search={<SearchTrigger />}
        userActions={<UserActions />}
        catalog={catalog}
        infoMenu={
          <Suspense fallback={<Loader size='sm' />}>
            <InfoMenu items={NAVIGATION_ITEMS} />
          </Suspense>
        }
        authStatus={<AuthStatus />}
      />

      <MobilePanel />
    </>
  );
};
