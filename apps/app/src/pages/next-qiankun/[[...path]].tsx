import Layout from "@/components/Layout";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import type { MicroApp } from "qiankun";

export default function NextQiankunPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const microAppRef = useRef<MicroApp | null>(null);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined" || !containerRef.current) {
      return;
    }

    // 動的importでSSR時のエラーを回避
    import("qiankun").then((qiankun) => {
      const microApp = qiankun.loadMicroApp({
        name: "remote-next-app",
        entry: "http://localhost:4001",
        container: containerRef.current!,
      });

      microAppRef.current = microApp;

      microApp.mountPromise
        .then(() => {
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Failed to mount micro app:", error);
          setIsLoading(false);
        });
    });

    return () => {
      // クリーンアップ: アンマウント時にリモートアプリを破棄
      if (microAppRef.current) {
        microAppRef.current.unmount();
        microAppRef.current = null;
      }
    };
  }, [router.asPath]);

  return (
    <Layout title="Qiankun Next.js">
      <div style={{ padding: "2rem" }}>
        <h1>Qiankun Next.js Page</h1>
        <p>This page loads a remote Next.js app via qiankun.</p>
        {isLoading && <div>Loading remote app...</div>}
        <div ref={containerRef} id="remote-next-app-container" />
      </div>
    </Layout>
  );
}
