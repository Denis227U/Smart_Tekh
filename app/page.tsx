import styles from './page.module.scss';

export default function Home() {
  return (
    <div className={styles.box}>
      Home Page
      <ul className={styles.list}>
        <li>1</li>
        <li>2</li>
        <li>3</li>
      </ul>
    </div>
  );
}
