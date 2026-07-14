import { PhoneNumber } from '../../model/types';
import s from './contact-phones.module.scss';

export const ContactPhones = ({ phones }: { phones: PhoneNumber[] }) => (
  <>
    {phones.map(({ label, value }) => (
      <a
        href={`tel:${value}`}
        className={s.tel}
        key={label}
      >
        {label}
      </a>
    ))}
  </>
);
