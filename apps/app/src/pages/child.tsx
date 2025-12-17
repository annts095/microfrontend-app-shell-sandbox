import Head from "next/head";
import Layout from "@/components/Layout";
import styles from "@/components/Layout/index.module.css";

export default function Child() {
  return (
    <>
      <Head>
        <title>Child Page</title>
        <meta name="description" content="Child page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout title="Child Page">
        <main className={styles.main}>
          <div className={styles.intro}>
            <h1>Child Page</h1>
            <p>This is a child page.</p>
          </div>
        </main>
      </Layout>
    </>
  );
}
