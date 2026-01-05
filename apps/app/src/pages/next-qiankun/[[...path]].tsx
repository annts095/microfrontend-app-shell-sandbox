import { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import type { MicroApp } from "qiankun";

export default function NextQiankunPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const microAppRef = useRef<MicroApp | null>(null);
  const router = useRouter();

  useEffect(() => {
    const container = containerRef.current;
    if (!container || typeof window === "undefined") return;

    const microAppName = "remote-next-app";

    const cleanup = () => {
      const currentMicroApp = microAppRef.current;
      if (currentMicroApp) {
        try {
          currentMicroApp.unmount();
          microAppRef.current = null;
        } catch (err) {
          console.error("[qiankun] Error unmounting micro app:", err);
        }
      }
    };

    const handleRouteChangeStart = () => {
      cleanup();
    };

    router.events?.on("routeChangeStart", handleRouteChangeStart);

    import("qiankun").then(({ loadMicroApp }) => {
      const existingMicroApp = microAppRef.current;
      if (existingMicroApp) {
        try {
          existingMicroApp.unmount();
          microAppRef.current = null;
        } catch (err) {
          console.warn("[qiankun] Error unmounting existing micro app:", err);
        }
      }

      container.innerHTML = "";

      const microApp = loadMicroApp(
        {
          name: microAppName,
          entry: "http://localhost:4001",
          container: container,
          props: {},
        },
        {
          sandbox: false,
        }
      );

      microAppRef.current = microApp;

      // mountPromiseを待つ
      microApp.mountPromise.catch((err) => {
        console.error("[qiankun] Error mounting micro app:", err);
      });
    });

    return () => {
      router.events?.off("routeChangeStart", handleRouteChangeStart);
      cleanup();
    };
  }, [router]);

  return (
    <Layout title="Qiankun Next.js">
      <div style={{ padding: "2rem" }}>
        <h1>Qiankun Next.js Page</h1>
        <p>This page loads a remote Next.js app via qiankun.</p>
        <div ref={containerRef} id="remote-next-app-container" />
      </div>
    </Layout>
  );
}
