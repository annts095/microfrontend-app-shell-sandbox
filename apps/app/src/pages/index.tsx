import Head from "next/head";
import { useState } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import { Header, Drawer, Button } from "@microfrontend-app-shell-sandbox/ui";
import styles from "@/styles/Home.module.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

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
      <div
        className={`${styles.page} ${geistSans.variable} ${geistMono.variable}`}
      >
        <Header title="Home" />
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
          </div>
        </main>
        <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
          <h2 id="drawer-title">Drawer</h2>
          <p>ここにDrawerのコンテンツを配置できます。</p>
        </Drawer>
      </div>
    </>
  );
}
