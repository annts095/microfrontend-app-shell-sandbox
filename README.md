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


## マイクロフロントエンドの検証

本プロジェクトの `/next-qiankun` から始まるルートは　[https://github.com/annts095/microfrontend-remote-app-sandbox-](https://github.com/annts095/microfrontend-remote-app-sandbox-)で実装したアプリケーションをマイクロアプリとして読み込みます。合わせてcloneを行い、npm run devで起動してください。

