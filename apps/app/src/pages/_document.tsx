import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                // getPathFromScript関数のエラーを抑制
                // qiankunがリモートアプリのスクリプトをevalで実行する際に、
                // スクリプトタグがDOMに存在しないため、エラーが発生するのを防ぐ
                // 実行タイミングが重要: Next.jsのエラーオーバーレイが表示される前に設定する必要がある
                // 注意: エラーオーバーレイは開発モード（next dev）でのみ表示される
                //       本番環境では表示されないが、エラー自体は発生するため、コンソールに出力される可能性がある
                if (typeof window !== 'undefined') {
                  const originalOnError = window.onerror;
                  window.onerror = function(message, source, lineno, colno, error) {
                    const messageStr = typeof message === "string" ? message : String(message);
                    const shouldSuppress =
                      (messageStr?.includes("getAttribute") || messageStr?.includes("replace")) &&
                      (source?.includes("localhost:4000") ||
                        source?.includes("localhost:4001") ||
                        error?.stack?.includes("getPathFromScript") ||
                        error?.stack?.includes("registerChunk") ||
                        error?.stack?.includes("Proxy.eval") ||
                        error?.stack?.includes("eval"));

                    if (shouldSuppress) {
                      return true;
                    }
                    if (originalOnError) {
                      return originalOnError(message, source, lineno, colno, error);
                    }
                    return false;
                  };

                  window.addEventListener("error", function(event) {
                    const shouldSuppress =
                      (event.message?.includes("getAttribute") || event.message?.includes("replace")) &&
                      (event.filename?.includes("localhost:4000") ||
                        event.filename?.includes("localhost:4001") ||
                        event.error?.stack?.includes("getPathFromScript") ||
                        event.error?.stack?.includes("registerChunk") ||
                        event.error?.stack?.includes("Proxy.eval") ||
                        event.error?.stack?.includes("eval"));

                    if (shouldSuppress) {
                      event.preventDefault();
                      event.stopPropagation();
                      event.stopImmediatePropagation();
                      return false;
                    }
                  }, true);

                  // import-html-entryのエラーを抑制（スクリプト実行エラーは無視）
                  const originalConsoleError = console.error;
                  console.error = function(...args) {
                    const message = args.join(' ');
                    if (message.includes('[import-html-entry]: error occurs while executing normal script')) {
                      // このエラーは抑制（getAttributeエラーなどは既に抑制されている）
                      return;
                    }
                    originalConsoleError.apply(console, args);
                  };
                }
              })();
            `,
          }}
        />
      </body>
    </Html>
  );
}
