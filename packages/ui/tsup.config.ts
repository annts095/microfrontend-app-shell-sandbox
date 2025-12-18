import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  external: ['react', 'react-dom', 'next', 'next/router'],
  outDir: 'dist',
  outExtension({ format }) {
    return {
      js: format === 'cjs' ? '.cjs' : '.js',
    };
  },
  // CSSファイルをバンドルに含めない（Next.jsが処理する）
  // CSS ModulesはNext.jsが実行時に処理するため、ここでは空オブジェクトとして扱う
  esbuildOptions(options) {
    options.loader = {
      ...options.loader,
      '.css': 'empty',
    };
  },
});

