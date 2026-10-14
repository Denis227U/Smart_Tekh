import { ReactNode } from 'react';
import { Container } from '@/src/shared/ui/common';
import s from './header-layout.module.scss';

export const HeaderLayout = ({
  logo,
  contacts,
  search,
  userActions,
  authStatus,
  catalog,
  infoMenu,
  isCondensed = false,
}: {
  logo: ReactNode;
  contacts: ReactNode;
  search: ReactNode;
  userActions: ReactNode;
  authStatus: ReactNode;
  catalog?: ReactNode;
  infoMenu?: ReactNode;
  isCondensed?: boolean;
}) => {
  return (
    <header className={s.header}>
      <Container className={s.mainRow}>
        {logo}
        {contacts}

        <div className={s.actions}>
          <div className={s.searchWrapper}>{search}</div>
          {userActions}
          {authStatus}
        </div>
      </Container>

      {!isCondensed && (
        <div className={s.subRowWrp}>
          <Container className={s.subRow}>
            {catalog}
            {infoMenu}
          </Container>
        </div>
      )}
    </header>
  );
};
