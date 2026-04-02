'use client';

import { Reveal, TerminalHeader, SkillPill } from './shared';
import type { SkillCategory, LocalizedString } from '@/lib/types';

interface SkillsProps {
  skills: SkillCategory[];
  t: (s: LocalizedString) => string;
}

export function Skills({ skills, t }: SkillsProps) {
  return (
    <section
      id="skills"
      className="border-t border-zinc-200/50 dark:border-zinc-800/50 py-24"
      aria-label="Skills"
    >
      <div className="mx-auto max-w-5xl px-5">
        <TerminalHeader command="ls --skills --all" />
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((cat, i) => (
            <Reveal key={cat.category.en} delay={i * 0.06}>
              <div className="group">
                <h3 className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-cyan-400/80">
                  {`// ${t(cat.category)}`}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((s) => (
                    <SkillPill key={s}>{s}</SkillPill>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
