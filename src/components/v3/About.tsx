'use client';

import { Reveal, TerminalHeader } from './shared';
import type { Profile, UIStrings, LocalizedString } from '@/lib/types';

interface AboutProps {
  profile: Profile;
  ui: UIStrings;
  t: (s: LocalizedString) => string;
}

export function About({ profile, ui, t }: AboutProps) {
  const stats = [
    {
      val: `${profile.stats.years_experience}+`,
      label: t(ui.years_experience),
    },
    { val: `${profile.stats.clients}+`, label: t(ui.clients) },
    { val: `${profile.stats.projects}+`, label: t(ui.projects_count) },
  ];

  return (
    <section id="about" className="py-24" aria-label="About">
      <div className="mx-auto max-w-5xl px-5">
        <TerminalHeader command="cat about.md" />
        <Reveal>
          <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-100/50 dark:bg-zinc-900/50 p-6 md:p-8">
            <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-400 md:text-lg">
              {t(profile.summary)}
            </p>
            <div className="mt-8 grid grid-cols-3 gap-4">
              {stats.map((s) => (
                <div key={s.label} className="text-center">
                  <div className="text-2xl font-bold text-cyan-400 md:text-3xl">
                    {s.val}
                  </div>
                  <div className="mt-1 text-xs uppercase tracking-wider text-zinc-500">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
