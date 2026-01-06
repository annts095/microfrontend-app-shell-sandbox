import Layout from "@/components/Layout";

export default function NextQiankunPage() {
  return (
    <Layout title="Qiankun Next.js">
      <div style={{ padding: "2rem" }}>
        <h1>Qiankun Next.js Page</h1>
        <p>This page loads a remote Next.js app via qiankun.</p>
        <div id="remote-next-app-container" />
      </div>
    </Layout>
  );
}
