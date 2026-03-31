'use client';

import { useEffect, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { useI18n } from '@/lib/i18n';
import { useTheme } from '@/lib/theme';
import type { SiteData } from '@/lib/types';
import { DotGrid } from './shared';
import { V3Navbar } from './V3Navbar';
import { V3Hero } from './V3Hero';
import { V3About } from './V3About';
import { V3Skills } from './V3Skills';
import { V3Experience } from './V3Experience';
import { V3Education } from './V3Education';
import { V3Contact } from './V3Contact';
import { V3Footer } from './V3Footer';

/* ─── lazy-loaded below-the-fold sections ─── */
const V3Projects = dynamic(
  () => import('./V3Projects').then((m) => ({ default: m.V3Projects })),
  {
    loading: () => (
      <section className="border-t border-zinc-800/50 py-24">
        <div className="mx-auto max-w-5xl px-5">
          <div className="h-6 w-40 animate-pulse rounded bg-zinc-800" />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="h-64 animate-pulse rounded-xl bg-zinc-900/50"
              />
            ))}
          </div>
        </div>
      </section>
    ),
  },
);

const V3Languages = dynamic(
  () => import('./V3Languages').then((m) => ({ default: m.V3Languages })),
  {
    loading: () => (
      <section className="border-t border-zinc-800/50 py-24">
        <div className="mx-auto max-w-5xl px-5">
          <div className="h-6 w-32 animate-pulse rounded bg-zinc-800" />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="h-20 animate-pulse rounded-xl bg-zinc-900/50"
              />
            ))}
          </div>
        </div>
      </section>
    ),
  },
);

const V3Certifications = dynamic(
  () =>
    import('./V3Certifications').then((m) => ({
      default: m.V3Certifications,
    })),
  {
    loading: () => (
      <section className="border-t border-zinc-800/50 py-24">
        <div className="mx-auto max-w-5xl px-5">
          <div className="h-6 w-36 animate-pulse rounded bg-zinc-800" />
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {[1, 2].map((n) => (
              <div
                key={n}
                className="h-28 animate-pulse rounded-xl bg-zinc-900/50"
              />
            ))}
          </div>
        </div>
      </section>
    ),
  },
);

export function V3Page({ data }: { data: SiteData }) {
  const { locale, setLocale, t } = useI18n();
  const { theme, toggleTheme, setTheme } = useTheme();

  // Default to dark mode for V3
  useEffect(() => {
    setTheme('dark');
  }, [setTheme]);

  const handleToggleLocale = useCallback(() => {
    setLocale(locale === 'fr' ? 'en' : 'fr');
  }, [locale, setLocale]);

  return (
    <div className="min-h-screen bg-zinc-950 font-mono text-zinc-100 selection:bg-cyan-500/30">
      <DotGrid />

      <V3Navbar
        locale={locale}
        onToggleLocale={handleToggleLocale}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      <main>
        <V3Hero
          profile={data.profile}
          meta={data.meta}
          ui={data.ui}
          t={t}
        />
        <V3About profile={data.profile} ui={data.ui} t={t} />
        <V3Skills skills={data.skills} t={t} />
        <V3Experience experience={data.experience} ui={data.ui} t={t} />
        <V3Education education={data.education} ui={data.ui} t={t} />
        <V3Projects projects={data.projects} t={t} />
        <V3Languages languages={data.languages} t={t} />
        <V3Certifications certifications={data.certifications} t={t} />
        <V3Contact meta={data.meta} locale={locale} t={t} />
      </main>

      <V3Footer name={data.profile.name} ui={data.ui} t={t} />
    </div>
  );
}
