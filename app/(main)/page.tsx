import { SignInTrigger } from '@/src/features/auth';
import styles from './page.module.scss';

export default function Home() {
  return (
    <div>
      <div className={styles.box}>Home Page</div>
      <div>
        <SignInTrigger />
      </div>
    </div>
  );
}
