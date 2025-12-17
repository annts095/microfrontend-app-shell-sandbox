import Head from "next/head";
import { Header } from "@microfrontend-app-shell-sandbox/ui";
import styles from "@/styles/Home.module.css";

export default function Child() {
  return (
    <>
      <Head>
        <title>Child Page</title>
        <meta name="description" content="Child page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.page}>
        <Header title="Child Page" />
        <main className={styles.main}>
          <div className={styles.intro}>
            <h1>Child Page</h1>
            <p>This is a child page.</p>
          </div>
        </main>
      </div>
    </>
  );
}

