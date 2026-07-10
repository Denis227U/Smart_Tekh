import s from './contact-addresses.module.scss';

export const ContactAddresses = ({ addresses }: { addresses: string[] }) => (
  <ul className={s.list}>
    {addresses.map((address) => (
      <li key={address}>{address}</li>
    ))}
  </ul>
);
