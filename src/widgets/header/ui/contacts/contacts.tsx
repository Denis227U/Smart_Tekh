'use client';

import {
  ContactPhones,
  ContactShortInfo,
  SHOP_CONTACTS_INFO,
} from '@/src/entities/contact';
import s from './contacts.module.scss';

export const Contacts = () => {
  return (
    <ContactShortInfo
      className={s.onlyDesktop}
      orientation='horizontal'
    >
      <ContactPhones phones={SHOP_CONTACTS_INFO.phoneNumbers} />
      <span className={s.text}>{SHOP_CONTACTS_INFO.workingHours}</span>
    </ContactShortInfo>
  );
};
