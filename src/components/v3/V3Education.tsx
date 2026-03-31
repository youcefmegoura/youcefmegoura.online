'use client';

import React from 'react';
import { Reveal, TerminalHeader, formatPeriod } from './shared';
import type { Education, UIStrings, LocalizedString } from '@/lib/types';

interface V3EducationProps {
  education: Education[];
  ui: UIStrings;
  t: (s: LocalizedString) => string;
}

function V3EducationInner({ education, ui, t }: V3EducationProps) {
  return (
    <section
      id="education"
      className="border-t border-zinc-800/50 py-24"
      aria-label="Education"
    >
      <div className="mx-auto max-w-5xl px-5">
        <TerminalHeader command="cat education.json | jq '.[]'" />
        <div className="grid gap-6 md:grid-cols-2">
          {education.map((ed, i) => (
            <Reveal key={ed.id} delay={i * 0.08}>
              <div className="rounded-xl border border-zinc-800/60 bg-zinc-900/30 p-6">
                <div className="mb-3 font-mono text-xs text-zinc-600">
                  {'{'}
                </div>
                <div className="space-y-1 pl-4">
                  <p className="text-sm">
                    <span className="text-cyan-400">&quot;degree&quot;</span>
                    <span className="text-zinc-600">: </span>
                    <span className="text-green-400">
                      &quot;{t(ed.degree)}&quot;
                    </span>
                  </p>
                  <p className="text-sm">
                    <span className="text-cyan-400">&quot;school&quot;</span>
                    <span className="text-zinc-600">: </span>
                    <span className="text-green-400">
                      &quot;{t(ed.school)}&quot;
                    </span>
                  </p>
                  <p className="text-sm">
                    <span className="text-cyan-400">&quot;faculty&quot;</span>
                    <span className="text-zinc-600">: </span>
                    <span className="text-green-400">
                      &quot;{t(ed.faculty)}&quot;
                    </span>
                  </p>
                  <p className="text-sm">
                    <span className="text-cyan-400">&quot;period&quot;</span>
                    <span className="text-zinc-600">: </span>
                    <span className="text-yellow-400">
                      &quot;
                      {formatPeriod(ed.period.start, ed.period.end, t, ui)}
                      &quot;
                    </span>
                  </p>
                  <p className="text-sm">
                    <span className="text-cyan-400">&quot;location&quot;</span>
                    <span className="text-zinc-600">: </span>
                    <span className="text-zinc-400">
                      &quot;{ed.location}&quot;
                    </span>
                  </p>
                </div>
                <div className="mt-3 font-mono text-xs text-zinc-600">
                  {'}'}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export const V3Education = React.memo(V3EducationInner);
