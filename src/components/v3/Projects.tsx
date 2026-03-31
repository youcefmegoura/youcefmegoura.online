'use client';

import { ExternalLink } from 'lucide-react';
import { Reveal, TerminalHeader, CodeBadge } from './shared';
import type { Project, LocalizedString } from '@/lib/types';

interface V3ProjectsProps {
  projects: Project[];
  t: (s: LocalizedString) => string;
}

export function Projects({ projects, t }: V3ProjectsProps) {
  return (
    <section
      id="projects"
      className="border-t border-zinc-200/50 dark:border-zinc-800/50 py-24"
      aria-label="Projects"
    >
      <div className="mx-auto max-w-5xl px-5">
        <TerminalHeader command="ls ~/projects" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.06}>
              <div className="group overflow-hidden rounded-xl border border-zinc-200/60 dark:border-zinc-800/60 bg-zinc-50 dark:bg-zinc-900/30 transition-all hover:border-cyan-500/30 hover:shadow-[0_0_30px_rgba(6,182,212,0.05)]">
                {p.image && (
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={p.image}
                      alt={t(p.title)}
                      loading="lazy"
                      width={400}
                      height={160}
                      className="h-full w-full object-cover opacity-60 transition-all duration-500 group-hover:scale-105 group-hover:opacity-80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-zinc-900 to-transparent" />
                  </div>
                )}
                <div className="p-5">
                  <div className="flex items-start justify-between">
                    <h4 className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 transition-colors group-hover:text-cyan-400">
                      {t(p.title)}
                    </h4>
                    {p.link && (
                      <a
                        href={p.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-zinc-400 dark:text-zinc-600 transition-colors hover:text-cyan-400"
                        aria-label={`Visit ${t(p.title)}`}
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    )}
                  </div>
                  <p className="mt-2 line-clamp-2 text-xs text-zinc-500">
                    {t(p.description)}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {p.tech.map((tch) => (
                      <CodeBadge key={tch}>{tch}</CodeBadge>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
