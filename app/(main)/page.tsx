import Link from 'next/link';
import { SignInTrigger } from '@/src/features/auth';
import { ROUTES } from '@/src/shared/routes';
import styles from './page.module.scss';

export default function Home() {
  return (
    <div>
      <div className={styles.box}>
        <h1>Home Page</h1>
      </div>
      <div style={{ padding: '20px', background: '#ccc', width: '200px' }}>
        <Link href={ROUTES.PROFILE.GENERAL}>to profile</Link>
      </div>
      <div>
        <SignInTrigger />
      </div>
    </div>
  );
}
