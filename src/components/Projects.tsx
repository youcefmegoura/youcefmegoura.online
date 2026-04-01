'use client';

import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { ExternalLink, ChevronDown } from 'lucide-react';
import { Reveal, TerminalHeader, CodeBadge } from './shared';
import type { Project, UIStrings, LocalizedString } from '@/lib/types';

const BATCH_SIZE = 6;

interface ProjectsProps {
  projects: Project[];
  ui: UIStrings;
  t: (s: LocalizedString) => string;
}

function ProjectsInner({ projects, ui, t }: ProjectsProps) {
  const [visibleCount, setVisibleCount] = useState(BATCH_SIZE);

  const visible = projects.slice(0, visibleCount);
  const hasMore = visibleCount < projects.length;
  const isExpanded = visibleCount > BATCH_SIZE;

  const handleShowMore = useCallback(() => {
    setVisibleCount((prev) => Math.min(prev + BATCH_SIZE, projects.length));
  }, [projects.length]);

  const handleShowLess = useCallback(() => {
    setVisibleCount(BATCH_SIZE);
  }, []);

  return (
    <section
      id="projects"
      className="border-t border-zinc-200/50 dark:border-zinc-800/50 py-24"
      aria-label="Projects"
    >
      <div className="mx-auto max-w-5xl px-5">
        <TerminalHeader command="ls ~/projects" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence initial={false}>
            {visible.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.3, delay: i >= BATCH_SIZE ? (i % BATCH_SIZE) * 0.05 : 0 }}
              >
                <Reveal delay={i < BATCH_SIZE ? i * 0.06 : 0}>
                  <div className="group overflow-hidden rounded-xl border border-zinc-200/60 dark:border-zinc-800/60 bg-zinc-50 dark:bg-zinc-900/30 transition-all hover:border-cyan-500/30 hover:shadow-[0_0_30px_rgba(6,182,212,0.05)]">
                    {p.image && (
                      <div className="relative h-40 overflow-hidden">
                        <Image
                          src={p.image}
                          alt={t(p.title)}
                          loading="lazy"
                          width={400}
                          height={160}
                          unoptimized
                          className="h-full w-full object-cover opacity-60 transition-all duration-500 group-hover:scale-105 group-hover:opacity-80"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-white dark:from-zinc-900 to-transparent" />
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
                      {p.date && (
                        <p className="mt-1 font-mono text-[10px] text-zinc-400 dark:text-zinc-600">
                          {'// '}{p.date}
                        </p>
                      )}
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
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* show more / show less */}
        {projects.length > BATCH_SIZE && (
          <div className="mt-8 flex justify-center">
            {hasMore ? (
              <button
                onClick={handleShowMore}
                className="inline-flex items-center gap-1 font-mono text-xs text-cyan-400/70 transition-colors hover:text-cyan-400"
              >
                <span>{'// '}{t(ui.show_more)}</span>
                <ChevronDown className="h-3 w-3" />
              </button>
            ) : isExpanded ? (
              <button
                onClick={handleShowLess}
                className="inline-flex items-center gap-1 font-mono text-xs text-cyan-400/70 transition-colors hover:text-cyan-400"
              >
                <span>{'// '}{t(ui.show_less)}</span>
                <motion.span
                  animate={{ rotate: 180 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="h-3 w-3" />
                </motion.span>
              </button>
            ) : null}
          </div>
        )}
      </div>
    </section>
  );
}

export const Projects = React.memo(ProjectsInner);
