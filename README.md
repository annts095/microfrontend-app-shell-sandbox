# Microfrontend App Shell Sandbox

マイクロフロントエンドアーキテクチャのアプリシェルサンドボックスプロジェクトです。pnpm workspaceを使用したmonorepo構成で、Next.jsアプリケーションと共有UIコンポーネントライブラリを含みます。

## プロジェクト構造

```
microfrontend-app-shell-sandbox/
├── apps/
│   └── app/              # Next.jsアプリケーション（アプリシェル）
└── packages/
    └── ui/               # 共有UIコンポーネントライブラリ
```

## 技術スタック

- **フレームワーク**: Next.js 16 (Pages Router)
- **言語**: TypeScript
- **パッケージマネージャー**: pnpm 9.0.0
- **モノレポ**: pnpm workspace
- **UIライブラリ**: React 19

## セットアップ

### 依存関係のインストール

```bash
pnpm install
```

### 開発サーバーの起動

```bash
pnpm dev
```

アプリケーションは [http://localhost:4000](http://localhost:4000) で起動します。

## 利用可能なスクリプト

### ルートレベル

- `pnpm dev` - 開発サーバーを起動
- `pnpm build` - アプリケーションをビルド
- `pnpm build:ui` - UIパッケージをビルド
- `pnpm publish:ui` - UIパッケージを公開
- `pnpm start` - 本番モードでアプリケーションを起動
- `pnpm lint` - リンターを実行

## パッケージ

### `apps/app`

Next.jsアプリケーション（アプリシェル）。ポート4000で実行されます。

- 開発サーバー: `pnpm --filter app dev`
- ビルド: `pnpm --filter app build`
- 本番起動: `pnpm --filter app start`

### `packages/ui`

共有UIコンポーネントライブラリ。GitHub Packagesに公開されます。

パッケージページ: [@annts095/microfrontend-sandbox-ui](https://github.com/annts095/microfrontend-app-shell-sandbox/pkgs/npm/microfrontend-sandbox-ui)

- ビルド: `pnpm --filter @annts095/microfrontend-sandbox-ui build`
- 公開: `pnpm --filter @annts095/microfrontend-sandbox-ui publish`



## 開発

### ページの編集

メインページは `apps/app/src/pages/index.tsx` で編集できます。ファイルを保存すると自動的に更新されます。

### APIルート

[API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) は `apps/app/src/pages/api/` ディレクトリに配置します。

例: [http://localhost:4000/api/hello](http://localhost:4000/api/hello) は `apps/app/src/pages/api/hello.ts` で編集できます。

### UIコンポーネントの使用

アプリケーション内で共有UIコンポーネントを使用する例:

```typescript
import { Header } from "@microfrontend-app-shell-sandbox/ui";
```

## qiankunとの統合

このプロジェクトでは、qiankunを使用してNext.jsアプリケーションをマイクロフロントエンドとして統合しています。

### 既知の問題と解決策

#### 問題: `Cannot read properties of null (reading 'getAttribute')` エラー

qiankunがリモートNext.jsアプリケーションのスクリプトを`eval`で実行する際、スクリプトタグがDOMに存在しないため、Next.jsのwebpackチャンクローダー（`getPathFromScript`関数）がエラーを発生させます。

**原因:**
- Next.jsの`registerChunk`関数は、スクリプトタグからチャンクのパスを取得するために`getPathFromScript`を呼び出します
- qiankunはスクリプトを`eval`で実行するため、スクリプトタグがDOMに存在しません
- その結果、`getPathFromScript`が`null`を受け取り、`getAttribute`を呼び出そうとしてエラーが発生します

**解決策:**

`apps/app/src/pages/_document.tsx`でグローバルエラーハンドラーを設定しています。このエラーハンドラーは、Next.jsのエラーオーバーレイが表示される前に実行される必要があるため、`_document.tsx`の`dangerouslySetInnerHTML`で設定しています。

```typescript
// apps/app/src/pages/_document.tsx
<script
  dangerouslySetInnerHTML={{
    __html: `
      (function() {
        // getPathFromScript関数のエラーを抑制
        // 実行タイミングが重要: Next.jsのエラーオーバーレイが表示される前に設定する必要がある
        if (typeof window !== 'undefined') {
          // エラーハンドラーの設定...
        }
      })();
    `,
  }}
/>
```

**なぜ`_document.tsx`に書くのか:**
- `_app.tsx`の`useEffect`では実行タイミングが遅く、エラーが発生してからエラーハンドラーが設定される
- `_document.tsx`の`dangerouslySetInnerHTML`は、HTMLの解析時に実行されるため、Next.jsのスクリプトが読み込まれる前にエラーハンドラーが設定される
- これは、Google Analyticsなどのスクリプトを`_document.tsx`に追加するのと同じパターンです

**注意:**
- このエラーは、アプリケーションの実行には影響しません（`registerChunk`はチャンクの登録を行うだけで、アプリケーションの実行には直接影響しない）
- エラーが発生しても、Reactアプリケーションは正常にマウントされ、コンテンツが表示されます
- **開発モード（`next dev`）でのみ**: Next.jsのエラーオーバーレイが表示される可能性があるため、エラーハンドラーで抑制しています
- **本番環境（`next build` + `next start`）では**: エラーオーバーレイは表示されませんが、エラー自体は発生するため、コンソールにエラーが出力される可能性があります。エラーハンドラーは本番環境でも動作しますが、主に開発時のエラーオーバーレイを抑制するためのものです
