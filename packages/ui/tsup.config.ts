import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  external: ["react", "react-dom", "next", "next/router", "*.module.css"],
  outDir: "dist",
  outExtension({ format }) {
    return {
      js: format === "cjs" ? ".cjs" : ".js",
    };
  },
  // CSS Modulesの処理について:
  // - CSS Modulesをexternalとして扱うことで、tsupは空オブジェクトに置き換える
  // - ただし、transpilePackagesを使用している場合、Next.jsはソースコードを直接トランスパイルするため、
  //   dist/index.jsの内容は使用されず、src/index.tsが使用される
  // - そのため、dist/index.jsが空オブジェクトでも問題ない
  // - CSSファイルはcopy-assetsスクリプトでdistにコピーされる
});
