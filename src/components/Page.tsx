'use client';

import { useCallback, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useI18n } from '@/lib/i18n';
import { useTheme } from '@/lib/theme';
import type { SiteData } from '@/lib/types';
import { Navbar } from './Navbar';
import { ParticleBackground } from './ParticleBackground';
import { Hero } from './Hero';
import { About } from './About';
import { Skills } from './Skills';
import { Experience } from './Experience';
import { Education } from './Education';
import { Contact } from './Contact';
import { Footer } from './Footer';

/* ─── lazy-loaded below-the-fold sections ─── */
const Projects = dynamic(
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

const Clients = dynamic(
  () => import('./Clients').then((m) => ({ default: m.Clients })),
  {
    loading: () => (
      <section className="border-t border-zinc-200/50 dark:border-zinc-800/50 py-24">
        <div className="mx-auto max-w-5xl px-5">
          <div className="h-6 w-36 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
          <div className="mt-10 flex items-center justify-center">
            <div className="h-80 w-full animate-pulse rounded-xl bg-zinc-100 dark:bg-zinc-900/50" />
          </div>
        </div>
      </section>
    ),
  },
);

const Languages = dynamic(
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

const Certifications = dynamic(
  () =>
    import('./Certifications').then((m) => ({
      default: m.Certifications,
    })),
  {
    loading: () => (
      <section className="border-t border-zinc-200/50 dark:border-zinc-800/50 py-24">
        <div className="mx-auto max-w-5xl px-5">
          <div className="h-6 w-36 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
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

  useEffect(() => {
    console.log(
      '%c👋 Hey there, curious developer!',
      'color:#22d3ee;font-size:20px;font-weight:bold;',
    );
    console.log(
      '%cThis portfolio is built with Next.js, Tailwind CSS & Framer Motion.\nFeel free to poke around — clean code is the best documentation. 🚀',
      'color:#a1a1aa;font-size:13px;line-height:1.6;',
    );
    console.log(
      '%c📬 Let\'s connect!',
      'color:#22d3ee;font-size:15px;font-weight:bold;margin-top:4px;',
    );
    console.log(
      '%c  LinkedIn → https://linkedin.com/in/youcefmegoura\n  GitHub   → https://github.com/youcefmegoura\n  Email    → ymegoura@gmail.com',
      'color:#a1a1aa;font-size:12px;line-height:1.8;',
    );
  }, []);

  return (
    <div className="min-h-screen font-mono text-zinc-900 dark:text-zinc-100 selection:bg-cyan-500/30">
      <ParticleBackground />

      <Navbar
        locale={locale}
        onToggleLocale={handleToggleLocale}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      <main>
        {data.sections.hero !== false && (
          <Hero
            profile={data.profile}
            meta={data.meta}
            ui={data.ui}
            t={t}
          />
        )}
        {data.sections.about !== false && <About profile={data.profile} ui={data.ui} t={t} />}
        {data.sections.skills !== false && <Skills skills={data.skills} t={t} />}
        {data.sections.experience !== false && <Experience experience={data.experience} ui={data.ui} t={t} />}
        {data.sections.projects !== false && <Projects projects={data.projects} ui={data.ui} t={t} />}
        {data.sections.clients !== false && <Clients clients={data.clients} t={t} />}
        {data.sections.languages !== false && <Languages languages={data.languages} t={t} />}
        {data.sections.education !== false && <Education education={data.education} ui={data.ui} t={t} />}
        {data.sections.certifications !== false && <Certifications certifications={data.certifications} ui={data.ui} t={t} />}
        {data.sections.contact !== false && <Contact meta={data.meta} locale={locale} t={t} />}
      </main>

      {data.sections.footer !== false && <Footer name={data.profile.name} ui={data.ui} t={t} />}
    </div>
  );
}
