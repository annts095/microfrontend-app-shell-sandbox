import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if (typeof window !== "undefined") {
      // @ts-expect-error - qiankun dynamic import type issue
      import("qiankun").then((qiankun) => {
        qiankun.registerMicroApps([
          {
            name: "remote-next-app",
            entry: "http://localhost:4001/", // 末尾の / は省略不可（cookbook推奨）
            container: "#remote-next-app-container",
            activeRule: "/next-qiankun", // activeRule と entry の実パスは異なる必要がある
            loader: (loading: boolean) => {
              // ローディング状態の表示（オプション）
              const container = document.querySelector(
                "#remote-next-app-container"
              );
              if (container) {
                if (loading) {
                  container.innerHTML = "<div>Loading...</div>";
                }
              }
            },
          },
        ]);

        // start qiankun
        // sandbox: false は以前のコードで使用していた設定
        qiankun.start({
          sandbox: false, // Next.js との互換性のため false に設定
        });
      });
    }
  }, []);

  return <Component {...pageProps} />;
}
