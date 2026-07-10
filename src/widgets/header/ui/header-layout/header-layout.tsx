import { ReactNode } from 'react';
import { Container } from '@/src/shared/ui/common';
import s from './header-layout.module.scss';

export const HeaderLayout = ({
  logo,
  contacts,
  userActions,
  catalog,
  infoMenu,
  authStatus,
}: {
  logo: ReactNode;
  contacts: ReactNode;
  userActions: ReactNode;
  catalog: ReactNode;
  infoMenu: ReactNode;
  authStatus: ReactNode;
}) => {
  return (
    <header className={s.header}>
      <Container className={s.mainRow}>
        {logo}
        {contacts}

        <div className={s.actions}>
          {userActions}
          {authStatus}
        </div>
      </Container>

      <div className={s.subRowWrp}>
        <Container className={s.subRow}>
          {catalog}
          {infoMenu}
        </Container>
      </div>
    </header>
  );
};
