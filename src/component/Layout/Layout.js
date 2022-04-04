import Head from 'next/head';
import styles from './Layout.module.css';

const Layout = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>World Rank App</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className={styles.main}>main</main>
      <footer className={styles.footer}>footer</footer>
    </div>
  );
};

export default Layout;
