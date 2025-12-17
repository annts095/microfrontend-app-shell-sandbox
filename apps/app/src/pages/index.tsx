import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/router";
import { Drawer, Button } from "@annts095/microfrontend-sandbox-ui";
import Layout from "@/components/Layout";
import styles from "@/components/Layout/index.module.css";

export default function Home() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Micro Frontend App Shell</title>
        <meta
          name="description"
          content="マイクロフロントエンドのアプリケーションシェル"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout title="Home">
        <main className={styles.main}>
          <div className={styles.intro}>
            <h1>マイクロフロントエンドのアプリケーションシェル</h1>
            <p>
              これはマイクロフロントエンドのアプリケーションシェルです。複数の独立したフロントエンドアプリケーションを統合して、シームレスなユーザー体験を提供します。
            </p>
          </div>
          <div className={styles.ctas}>
            <Button variant="primary" onClick={() => setIsDrawerOpen(true)}>
              Drawerを開く
            </Button>
            <Button variant="secondary" onClick={() => router.push("/child")}>
              Child Pageへ
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
