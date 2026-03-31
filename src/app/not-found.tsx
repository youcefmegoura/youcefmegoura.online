'use client';

import { Home } from 'lucide-react';
import Link from 'next/link';
import { useTranslation } from '@/lib/i18n';
import {
  ErrorPageShell,
  TerminalWindow,
  errorStrings,
  btnPrimary,
} from '@/components/v3/ErrorShared';

export default function NotFound() {
  const t = useTranslation();

  return (
    <ErrorPageShell showParticles>
      <TerminalWindow
        command="curl https://youcefmegoura.online/unknown-page"
        output={<>404 — {t(errorStrings.pageNotFound)}</>}
      />

      <h1 className="text-[8rem] font-bold leading-none tracking-tighter sm:text-[10rem]">
        <span className="bg-gradient-to-b from-cyan-400 to-transparent bg-clip-text text-transparent">
          404
        </span>
      </h1>

      <h2 className="mt-4 text-xl font-semibold text-zinc-800 dark:text-zinc-200 sm:text-2xl">
        {t(errorStrings.pageNotFound)}
      </h2>

      <p className="mt-3 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
        {t(errorStrings.notFoundDesc)}
      </p>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
        <Link href="/" className={btnPrimary}>
          <Home className="h-4 w-4" />
          {t(errorStrings.backHome)}
        </Link>

      </div>
    </ErrorPageShell>
  );
}
