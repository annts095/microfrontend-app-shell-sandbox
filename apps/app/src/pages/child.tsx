import Head from "next/head";
import { useState } from "react";
import { Drawer, Button } from "@annts095/microfrontend-sandbox-ui";
import Layout from "@/components/Layout";
import styles from "@/components/Layout/index.module.css";

export default function Child() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

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
          <div className={styles.ctas}>
            <Button variant="primary" onClick={() => setIsDrawerOpen(true)}>
              Drawerを開く
            </Button>
          </div>
        </main>
        <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
          <h2 id="drawer-title">Drawer</h2>
          <p>ここにDrawerのコンテンツを配置できます。</p>
        </Drawer>
      </Layout>
    </>
  );
}
