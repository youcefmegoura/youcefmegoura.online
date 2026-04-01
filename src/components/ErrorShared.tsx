'use client';

import { useCallback, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Terminal } from 'lucide-react';
import { useI18n } from '@/lib/i18n';
import { useTheme } from '@/lib/theme';
import { ParticleBackground } from './ParticleBackground';
import { Navbar } from './Navbar';
import type { LocalizedString } from '@/lib/types';

/* ─── centralized error strings ─── */
export const errorStrings = {
  pageNotFound: {
    fr: 'Page introuvable',
    en: 'Page Not Found',
  } satisfies LocalizedString,
  notFoundDesc: {
    fr: "La page que vous recherchez n'existe pas ou a été déplacée.",
    en: "The page you're looking for doesn't exist or has been moved.",
  } satisfies LocalizedString,
  backHome: {
    fr: "Retour à l'accueil",
    en: 'Back to Home',
  } satisfies LocalizedString,
  goBack: {
    fr: 'Retour',
    en: 'Go Back',
  } satisfies LocalizedString,
  errorOccurred: {
    fr: 'Une erreur est survenue',
    en: 'Something Went Wrong',
  } satisfies LocalizedString,
  errorDesc: {
    fr: "Une erreur inattendue s'est produite. Veuillez réessayer.",
    en: 'An unexpected error occurred. Please try again.',
  } satisfies LocalizedString,
  tryAgain: {
    fr: 'Réessayer',
    en: 'Try Again',
  } satisfies LocalizedString,
} as const;

/* ─── shared motion preset ─── */
export const fadeInUp = {
  initial: { opacity: 0, y: 20 } as const,
  animate: { opacity: 1, y: 0 } as const,
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
};

/* ─── shared button class strings ─── */
export const btnPrimary =
  'inline-flex items-center gap-2 rounded-lg border border-cyan-500/20 bg-cyan-500/10 px-5 py-2.5 font-mono text-sm text-cyan-400 transition-all hover:bg-cyan-500/20 hover:shadow-[0_0_20px_rgba(6,182,212,0.15)]';

export const btnSecondary =
  'inline-flex items-center gap-2 rounded-lg border border-zinc-300 dark:border-zinc-700 px-5 py-2.5 font-mono text-sm text-zinc-600 dark:text-zinc-400 transition-all hover:border-zinc-400 dark:hover:border-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200';

/* ─── terminal window (macOS-style) ─── */
export function TerminalWindow({
  command,
  output,
  outputClassName = 'text-red-400',
}: {
  command: string;
  output: ReactNode;
  outputClassName?: string;
}) {
  return (
    <div className="mb-8 w-full rounded-xl border border-zinc-200/50 dark:border-zinc-800/50 bg-zinc-50/80 dark:bg-zinc-900/80 p-5 text-left backdrop-blur-sm">
      <div className="mb-4 flex items-center gap-2">
        <div className="h-3 w-3 rounded-full bg-red-500/80" />
        <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
        <div className="h-3 w-3 rounded-full bg-green-500/80" />
        <span className="ml-2 text-xs text-zinc-500">terminal</span>
      </div>
      <p className="font-mono text-sm text-zinc-500">
        <span className="text-green-500">$</span>{' '}
        <span className="text-zinc-700 dark:text-zinc-300">{command}</span>
      </p>
      <p className={`mt-2 font-mono text-sm ${outputClassName}`}>
        <span className="text-zinc-500">{'>'}</span> {output}
      </p>
      <span className="mt-1 inline-block animate-pulse text-cyan-400">▌</span>
    </div>
  );
}

/* ─── error page shell (layout wrapper with navbar + theme) ─── */
export function ErrorPageShell({
  children,
  showParticles = false,
  glowColor = 'cyan',
}: {
  children: ReactNode;
  showParticles?: boolean;
  glowColor?: 'cyan' | 'red';
}) {
  const { locale, setLocale } = useI18n();
  const { theme, toggleTheme } = useTheme();

  const handleToggleLocale = useCallback(() => {
    setLocale(locale === 'fr' ? 'en' : 'fr');
  }, [locale, setLocale]);

  return (
    <div className="min-h-screen font-mono text-zinc-900 dark:text-zinc-100 selection:bg-cyan-500/30">
      {showParticles && <ParticleBackground />}

      <Navbar
        locale={locale}
        onToggleLocale={handleToggleLocale}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      <main className="relative z-10 flex min-h-screen flex-col items-center justify-center px-5 pt-14">
        <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
          <div
            className={`absolute left-1/2 top-1/3 h-125 w-125 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px] ${
              glowColor === 'red' ? 'bg-red-500/5' : 'bg-cyan-500/5'
            }`}
          />
        </div>

        <motion.div
          {...fadeInUp}
          className="flex max-w-lg flex-col items-center text-center"
        >
          {children}

          <p className="mt-12 flex items-center gap-1.5 text-xs text-zinc-400 dark:text-zinc-600">
            <Terminal className="h-3 w-3" />
            ~/youcefmegoura
          </p>
        </motion.div>
      </main>
    </div>
  );
}
