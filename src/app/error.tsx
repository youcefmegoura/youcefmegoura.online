'use client';

import { useEffect } from 'react';
import { Home, RefreshCw } from 'lucide-react';
import Link from 'next/link';
import { useTranslation } from '@/lib/i18n';
import {
  ErrorPageShell,
  TerminalWindow,
  errorStrings,
  btnPrimary,
  btnSecondary,
} from '@/components/v3/ErrorShared';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslation();

  useEffect(() => {
    console.error('[ErrorBoundary]', error);
  }, [error]);

  return (
    <ErrorPageShell glowColor="red">
      <TerminalWindow
        command="npm run build"
        output={<>Error: {t(errorStrings.errorOccurred)}</>}
      />

      {error.message && (
        <div className="mb-6 w-full rounded-lg border border-red-500/20 bg-red-500/5 px-4 py-3 text-left">
          <p className="font-mono text-xs text-red-400 break-all">
            {error.message}
          </p>
          {error.digest && (
            <p className="mt-1 font-mono text-xs text-zinc-500">
              digest: {error.digest}
            </p>
          )}
        </div>
      )}

      <h1 className="text-2xl font-bold text-zinc-800 dark:text-zinc-200 sm:text-3xl">
        {t(errorStrings.errorOccurred)}
      </h1>

      <p className="mt-3 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
        {t(errorStrings.errorDesc)}
      </p>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
        <button onClick={reset} className={btnPrimary}>
          <RefreshCw className="h-4 w-4" />
          {t(errorStrings.tryAgain)}
        </button>
        <Link href="/" className={btnSecondary}>
          <Home className="h-4 w-4" />
          {t(errorStrings.backHome)}
        </Link>
      </div>
    </ErrorPageShell>
  );
}
