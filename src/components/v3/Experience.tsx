'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Reveal, TerminalHeader, CodeBadge, formatPeriod } from './shared';
import type { Experience as ExperienceData, UIStrings, LocalizedString } from '@/lib/types';

interface V3ExperienceProps {
  experience: ExperienceData[];
  ui: UIStrings;
  t: (s: LocalizedString) => string;
}

function ExperienceCard({
  exp,
  ui,
  t,
  delay,
}: {
  exp: ExperienceData;
  ui: UIStrings;
  t: (s: LocalizedString) => string;
  delay: number;
}) {
  const [expanded, setExpanded] = useState(false);

  const handleToggle = useCallback(() => {
    setExpanded((prev) => !prev);
  }, []);

  return (
    <Reveal delay={delay}>
      <div className="group rounded-xl border border-zinc-200/60 dark:border-zinc-800/60 bg-zinc-50 dark:bg-zinc-900/30 p-6 transition-all hover:border-cyan-500/20 hover:bg-zinc-100/50 dark:hover:bg-zinc-900/50">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h3 className="text-base font-semibold text-zinc-800 dark:text-zinc-200">
              {t(exp.role)}
            </h3>
            <p className="text-sm text-cyan-400">{t(exp.company)}</p>
          </div>
          <div className="flex shrink-0 items-center gap-2 font-mono text-xs text-zinc-500">
            <span>
              {formatPeriod(exp.period.start, exp.period.end, t, ui)}
            </span>
            <span className="text-zinc-300 dark:text-zinc-700">|</span>
            <span>{exp.location}</span>
          </div>
        </div>

        <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">{t(exp.short)}</p>

        {/* Expandable details */}
        <button
          onClick={handleToggle}
          className="mt-3 inline-flex items-center gap-1 font-mono text-xs text-cyan-400/70 transition-colors hover:text-cyan-400"
          aria-expanded={expanded}
          aria-controls={`exp-details-${exp.id}`}
        >
          <span>{expanded ? '// hide details' : '// see details'}</span>
          <motion.span
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="h-3 w-3" />
          </motion.span>
        </button>

        <AnimatePresence>
          {expanded && (
            <motion.div
              id={`exp-details-${exp.id}`}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden"
            >
              <p className="mt-3 whitespace-pre-line border-l-2 border-cyan-500/20 pl-4 text-sm leading-relaxed text-zinc-500">
                {t(exp.detailed)}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {exp.environment.map((e) => (
            <CodeBadge key={e}>{e}</CodeBadge>
          ))}
        </div>
      </div>
    </Reveal>
  );
}

export function Experience({ experience, ui, t }: V3ExperienceProps) {
  return (
    <section
      id="experience"
      className="border-t border-zinc-200/50 dark:border-zinc-800/50 py-24"
      aria-label="Experience"
    >
      <div className="mx-auto max-w-5xl px-5">
        <TerminalHeader command="experience --list --verbose" />
        <div className="space-y-6">
          {experience.map((exp, i) => (
            <ExperienceCard
              key={exp.id}
              exp={exp}
              ui={ui}
              t={t}
              delay={i * 0.08}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
