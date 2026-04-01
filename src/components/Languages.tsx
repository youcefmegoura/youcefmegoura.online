'use client';

import React from 'react';
import { Reveal, TerminalHeader } from './shared';
import type { Language, LocalizedString } from '@/lib/types';

interface LanguagesProps {
  languages: Language[];
  t: (s: LocalizedString) => string;
}

function LanguagesInner({ languages, t }: LanguagesProps) {
  return (
    <section
      id="languages"
      className="border-t border-zinc-200/50 dark:border-zinc-800/50 py-24"
      aria-label="Languages"
    >
      <div className="mx-auto max-w-5xl px-5">
        <TerminalHeader command="locale --list" />
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {languages.map((lang, i) => (
            <Reveal key={t(lang.language)} delay={i * 0.08}>
              <div className="flex items-center gap-4 rounded-xl border border-zinc-200/60 dark:border-zinc-800/60 bg-zinc-50 dark:bg-zinc-900/30 p-5 transition-all hover:border-cyan-500/20">
                <span className="text-2xl" role="img" aria-label={t(lang.language)}>
                  {lang.flag}
                </span>
                <div>
                  <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
                    {t(lang.language)}
                  </p>
                  <p className="font-mono text-xs text-zinc-500">
                    {t(lang.level)}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export const Languages = React.memo(LanguagesInner);
