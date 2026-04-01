'use client';

import React, { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, ExternalLink, ChevronDown } from 'lucide-react';
import { Reveal, TerminalHeader } from './shared';
import type { Certification, UIStrings, LocalizedString } from '@/lib/types';

const BATCH_SIZE = 6;

interface CertificationsProps {
  certifications: Certification[];
  ui: UIStrings;
  t: (s: LocalizedString) => string;
}

function compareDateDesc(a: string | null, b: string | null): number {
  if (!a && !b) return 0;
  if (!a) return 1;
  if (!b) return -1;
  return b.localeCompare(a);
}

function CertificationsInner({ certifications, ui, t }: CertificationsProps) {
  const sorted = useMemo(() => {
    const pinned = certifications.filter((c) => c.pinned);
    const unpinned = certifications.filter((c) => !c.pinned);
    pinned.sort((a, b) => compareDateDesc(a.date, b.date));
    unpinned.sort((a, b) => compareDateDesc(a.date, b.date));
    return [...pinned, ...unpinned];
  }, [certifications]);

  const [visibleCount, setVisibleCount] = useState(BATCH_SIZE);

  const visible = sorted.slice(0, visibleCount);
  const hasMore = visibleCount < sorted.length;
  const isExpanded = visibleCount > BATCH_SIZE;

  const handleShowMore = useCallback(() => {
    setVisibleCount((prev) => Math.min(prev + BATCH_SIZE, sorted.length));
  }, [sorted.length]);

  const handleShowLess = useCallback(() => {
    setVisibleCount(BATCH_SIZE);
  }, []);

  return (
    <section
      id="certifications"
      className="border-t border-zinc-200/50 dark:border-zinc-800/50 py-24"
      aria-label="Certifications"
    >
      <div className="mx-auto max-w-5xl px-5">
        <TerminalHeader command="gpg --list-certs" />

        <div className="grid gap-4 sm:grid-cols-2">
          <AnimatePresence initial={false}>
            {visible.map((cert, i) => (
              <motion.div
                key={cert.title}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.3, delay: i >= BATCH_SIZE ? (i % BATCH_SIZE) * 0.05 : 0 }}
              >
                <Reveal delay={i < BATCH_SIZE ? i * 0.08 : 0}>
                  <div className="h-full flex flex-col rounded-xl border border-zinc-200/60 dark:border-zinc-800/60 bg-zinc-50 dark:bg-zinc-900/30 p-6 transition-all hover:border-green-500/20">
                    <div className="flex items-start gap-3">
                      <Award className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                      <div className="min-w-0 flex-1">
                        <h3 className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                          {cert.title}
                        </h3>
                        <p className="mt-0.5 text-xs text-cyan-400">
                          {cert.issuer}
                          {cert.pinned && (
                            <span className="ml-1.5 text-[10px] text-amber-500" title="Pinned">
                              📌
                            </span>
                          )}
                        </p>
                      </div>
                    </div>

                    <p className="mt-2 flex-1 text-xs text-zinc-500">
                      {t(cert.description)}
                    </p>

                    <div className="mt-3 flex items-center justify-between">
                      {cert.date ? (
                        <p className="font-mono text-[10px] text-zinc-400 dark:text-zinc-600">
                          issued: {cert.date}
                        </p>
                      ) : (
                        <span />
                      )}
                      {cert.link && (
                        <a
                          href={cert.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 rounded-md border border-cyan-500/20 bg-cyan-500/10 px-2 py-1 font-mono text-[10px] text-cyan-400 transition-all hover:bg-cyan-500/20"
                        >
                          <ExternalLink className="h-3 w-3" />
                          {t(ui.verify)}
                        </a>
                      )}
                    </div>
                  </div>
                </Reveal>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* show more / show less */}
        {sorted.length > BATCH_SIZE && (
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

export const Certifications = React.memo(CertificationsInner);
