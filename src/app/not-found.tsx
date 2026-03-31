'use client';

import { useCallback } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Home, Terminal } from 'lucide-react';
import Link from 'next/link';
import { useI18n } from '@/lib/i18n';
import { useTheme } from '@/lib/theme';
import { ParticleBackground } from '@/components/v3/ParticleBackground';
import { Navbar } from '@/components/v3/Navbar';
import type { LocalizedString } from '@/lib/types';

const strings = {
  pageNotFound: { fr: 'Page introuvable', en: 'Page Not Found' } satisfies LocalizedString,
  description: {
    fr: "La page que vous recherchez n'existe pas ou a été déplacée.",
    en: "The page you're looking for doesn't exist or has been moved.",
  } satisfies LocalizedString,
  backHome: { fr: "Retour à l'accueil", en: 'Back to Home' } satisfies LocalizedString,
  goBack: { fr: 'Retour', en: 'Go Back' } satisfies LocalizedString,
};

export default function NotFound() {
  const { locale, setLocale, t } = useI18n();
  const { theme, toggleTheme } = useTheme();

  const handleToggleLocale = useCallback(() => {
    setLocale(locale === 'fr' ? 'en' : 'fr');
  }, [locale, setLocale]);

  return (
    <div className="min-h-screen font-mono text-zinc-900 dark:text-zinc-100 selection:bg-cyan-500/30">
      <ParticleBackground />

      <Navbar
        locale={locale}
        onToggleLocale={handleToggleLocale}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      <main className="relative z-10 flex min-h-screen flex-col items-center justify-center px-5 pt-14">
        {/* Subtle glow */}
        <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
          <div className="absolute left-1/2 top-1/3 h-125 w-125 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/5 blur-[120px]" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex max-w-lg flex-col items-center text-center"
        >
          {/* Terminal prompt */}
          <div className="mb-8 w-full rounded-xl border border-zinc-200/50 dark:border-zinc-800/50 bg-zinc-50/80 dark:bg-zinc-900/80 p-5 text-left backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-3 w-3 rounded-full bg-red-500/80" />
              <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
              <div className="h-3 w-3 rounded-full bg-green-500/80" />
              <span className="ml-2 text-xs text-zinc-500">terminal</span>
            </div>
            <p className="font-mono text-sm text-zinc-500">
              <span className="text-green-500">$</span>{' '}
              <span className="text-zinc-700 dark:text-zinc-300">
                curl https://youcefmegoura.online/unknown-page
              </span>
            </p>
            <p className="mt-2 font-mono text-sm text-red-400">
              <span className="text-zinc-500">{'>'}</span> 404 — {t(strings.pageNotFound)}
            </p>
            <span className="mt-1 inline-block animate-pulse text-cyan-400">▌</span>
          </div>

          {/* Large 404 */}
          <h1 className="text-[8rem] font-bold leading-none tracking-tighter sm:text-[10rem]">
            <span className="bg-gradient-to-b from-cyan-400 to-transparent bg-clip-text text-transparent">
              404
            </span>
          </h1>

          {/* Title */}
          <h2 className="mt-4 text-xl font-semibold text-zinc-800 dark:text-zinc-200 sm:text-2xl">
            {t(strings.pageNotFound)}
          </h2>

          {/* Description */}
          <p className="mt-3 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
            {t(strings.description)}
          </p>

          {/* Actions */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-lg border border-cyan-500/20 bg-cyan-500/10 px-5 py-2.5 font-mono text-sm text-cyan-400 transition-all hover:bg-cyan-500/20 hover:shadow-[0_0_20px_rgba(6,182,212,0.15)]"
            >
              <Home className="h-4 w-4" />
              {t(strings.backHome)}
            </Link>
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center gap-2 rounded-lg border border-zinc-300 dark:border-zinc-700 px-5 py-2.5 font-mono text-sm text-zinc-600 dark:text-zinc-400 transition-all hover:border-zinc-400 dark:hover:border-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
            >
              <ArrowLeft className="h-4 w-4" />
              {t(strings.goBack)}
            </button>
          </div>

          {/* Footer hint */}
          <p className="mt-12 flex items-center gap-1.5 text-xs text-zinc-400 dark:text-zinc-600">
            <Terminal className="h-3 w-3" />
            ~/youcefmegoura
          </p>
        </motion.div>
      </main>
    </div>
  );
}
