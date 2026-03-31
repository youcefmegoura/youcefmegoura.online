'use client';

import { useCallback } from 'react';
import dynamic from 'next/dynamic';
import { useI18n } from '@/lib/i18n';
import { useTheme } from '@/lib/theme';
import type { SiteData } from '@/lib/types';
import { DotGrid } from './shared';
import { Navbar } from './Navbar';
import { Hero } from './Hero';
import { About } from './About';
import { Skills } from './Skills';
import { Experience } from './Experience';
import { Education } from './Education';
import { Contact } from './Contact';
import { Footer } from './Footer';

/* ─── lazy-loaded below-the-fold sections ─── */
const V3Projects = dynamic(
  () => import('./Projects').then((m) => ({ default: m.Projects })),
  {
    loading: () => (
      <section className="border-t border-zinc-200/50 dark:border-zinc-800/50 py-24">
        <div className="mx-auto max-w-5xl px-5">
          <div className="h-6 w-40 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="h-64 animate-pulse rounded-xl bg-zinc-100 dark:bg-zinc-900/50"
              />
            ))}
          </div>
        </div>
      </section>
    ),
  },
);

const V3Languages = dynamic(
  () => import('./Languages').then((m) => ({ default: m.Languages })),
  {
    loading: () => (
      <section className="border-t border-zinc-200/50 dark:border-zinc-800/50 py-24">
        <div className="mx-auto max-w-5xl px-5">
          <div className="h-6 w-32 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="h-20 animate-pulse rounded-xl bg-zinc-100 dark:bg-zinc-900/50"
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
    import('./Certifications').then((m) => ({
      default: m.Certifications,
    })),
  {
    loading: () => (
      <section className="border-t border-zinc-200/50 dark:border-zinc-800/50 py-24">
        <div className="mx-auto max-w-5xl px-5">
          <div className="h-6 w-36 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {[1, 2].map((n) => (
              <div
                key={n}
                className="h-28 animate-pulse rounded-xl bg-zinc-100 dark:bg-zinc-900/50"
              />
            ))}
          </div>
        </div>
      </section>
    ),
  },
);

export function Page({ data }: { data: SiteData }) {
  const { locale, setLocale, t } = useI18n();
  const { theme, toggleTheme } = useTheme();

  const handleToggleLocale = useCallback(() => {
    setLocale(locale === 'fr' ? 'en' : 'fr');
  }, [locale, setLocale]);

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 font-mono text-zinc-900 dark:text-zinc-100 selection:bg-cyan-500/30">
      <DotGrid />

      <Navbar
        locale={locale}
        onToggleLocale={handleToggleLocale}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      <main>
        <Hero
          profile={data.profile}
          meta={data.meta}
          ui={data.ui}
          t={t}
        />
        <About profile={data.profile} ui={data.ui} t={t} />
        <Skills skills={data.skills} t={t} />
        <Experience experience={data.experience} ui={data.ui} t={t} />
        <Education education={data.education} ui={data.ui} t={t} />
        <V3Projects projects={data.projects} t={t} />
        <V3Languages languages={data.languages} t={t} />
        <V3Certifications certifications={data.certifications} t={t} />
        <Contact meta={data.meta} locale={locale} t={t} />
      </main>

      <Footer name={data.profile.name} ui={data.ui} t={t} />
    </div>
  );
}
