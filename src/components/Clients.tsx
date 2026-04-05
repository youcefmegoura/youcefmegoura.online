'use client';

import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import Image from 'next/image';
import { Reveal, TerminalHeader } from './shared';
import type { Client, ClientProject, LocalizedString } from '@/lib/types';

interface ClientsProps {
  clients: Client[];
  t: (s: LocalizedString) => string;
}

/* ── company logo — rounded rect, never clipped ── */
function CompanyLogo({ logo, name }: { logo: string; name: string }) {
  const [failed, setFailed] = useState(false);

  if (!logo || failed) {
    return (
      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-zinc-300/50 dark:border-zinc-700/50 bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-800/60">
        <span className="font-mono text-xl font-bold text-cyan-400">
          {name.charAt(0).toUpperCase()}
        </span>
      </div>
    );
  }

  return (
    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-zinc-300/50 dark:border-zinc-700/50 bg-white dark:bg-zinc-800/80 p-2">
      <Image
        src={logo}
        alt={`${name} logo`}
        className="h-full w-full object-contain"
        width={56}
        height={56}
        onError={() => setFailed(true)}
      />
    </div>
  );
}

/* ── project row inside tree ── */
function ProjectRow({
  project,
  t,
  index,
  isLast,
  isExpanded,
  onToggle,
}: {
  project: ClientProject;
  t: (s: LocalizedString) => string;
  index: number;
  isLast: boolean;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.07 }}
      className="flex items-stretch"
    >
      {/* tree connector */}
      <div className="relative flex w-5 shrink-0 flex-col items-center" aria-hidden="true">
        <div className={`w-px ${isLast ? 'h-4' : 'h-full'} bg-zinc-300/40 dark:bg-zinc-700/40`} />
        <div className="absolute top-4 left-1/2 h-px w-2.5 bg-zinc-300/40 dark:bg-zinc-700/40" />
        <div
          className={`absolute top-[13px] left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full transition-all duration-300 ${
            hovered || isExpanded
              ? 'bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.6)]'
              : 'bg-zinc-400 dark:bg-zinc-600'
          }`}
        />
      </div>

      {/* project content */}
      <div
        className="ml-1 min-w-0 flex-1 pb-3"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <button
          onClick={onToggle}
          className={`flex w-full items-center gap-1.5 rounded-lg border px-3 py-2 text-left font-mono text-xs transition-all duration-200 ${
            isExpanded
              ? 'border-cyan-500/30 bg-cyan-400/[0.06] text-cyan-400'
              : hovered
                ? 'border-cyan-500/20 bg-zinc-100/50 dark:bg-zinc-800/40 text-cyan-400'
                : 'border-transparent text-zinc-600 dark:text-zinc-400'
          }`}
          aria-expanded={isExpanded}
        >
          <span className={`transition-colors duration-200 ${
            hovered || isExpanded ? 'text-cyan-400' : 'text-green-500/60'
          }`}>
            ▸
          </span>
          <span className="flex-1 truncate">{t(project.name)}</span>
          <motion.span
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="shrink-0 opacity-40"
          >
            <ChevronDown className="h-3 w-3" />
          </motion.span>
        </button>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <p className="mt-1.5 ml-1 border-l-2 border-cyan-500/15 pl-3 font-mono text-[11px] leading-relaxed text-zinc-500">
                {t(project.description)}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

/* ── company card with expandable project tree ── */
function CompanyCard({
  client,
  t,
  delay,
  isActive,
  onToggle,
}: {
  client: Client;
  t: (s: LocalizedString) => string;
  delay: number;
  isActive: boolean;
  onToggle: () => void;
}) {
  const [expandedProject, setExpandedProject] = useState<number | null>(null);

  const toggleProject = useCallback((idx: number) => {
    setExpandedProject((prev) => (prev === idx ? null : idx));
  }, []);

  return (
    <Reveal delay={delay}>
      <div
        className={`group relative overflow-hidden rounded-xl border transition-all duration-300 ${
          isActive
            ? 'border-cyan-500/25 bg-zinc-50/80 dark:bg-zinc-900/50 shadow-[0_0_40px_rgba(34,211,238,0.04)]'
            : 'border-zinc-200/60 dark:border-zinc-800/60 bg-zinc-50 dark:bg-zinc-900/30 hover:border-cyan-500/15'
        }`}
      >
        {/* ambient glow */}
        {isActive && (
          <div className="pointer-events-none absolute -top-16 -right-16 h-32 w-32 rounded-full bg-cyan-400/[0.03] blur-3xl" aria-hidden="true" />
        )}

        {/* company header */}
        <button
          onClick={onToggle}
          className="relative flex w-full items-start gap-4 p-5 text-left"
          aria-expanded={isActive}
        >
          <CompanyLogo logo={client.logo} name={client.name} />

          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                  {client.name}
                </h3>
                <p className="mt-0.5 font-mono text-xs text-cyan-400">
                  {t(client.role)}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <span className="hidden sm:inline-block rounded-full border border-zinc-300/40 dark:border-zinc-700/40 bg-zinc-200/60 dark:bg-zinc-800/60 px-2.5 py-0.5 font-mono text-[10px] text-zinc-500">
                  {client.projects.length}{' '}
                  {client.projects.length === 1 ? 'project' : 'projects'}
                </span>
                <motion.span
                  animate={{ rotate: isActive ? 180 : 0 }}
                  transition={{ duration: 0.25 }}
                  className="text-zinc-400"
                >
                  <ChevronDown className="h-4 w-4" />
                </motion.span>
              </div>
            </div>
            <p className="mt-1.5 text-xs leading-relaxed text-zinc-500">
              {t(client.description)}
            </p>
          </div>
        </button>

        {/* expandable project tree */}
        <AnimatePresence>
          {isActive && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="relative px-5 pb-5">
                {/* separator */}
                <div className="mb-4 flex items-center gap-3">
                  <div className="h-px flex-1 bg-zinc-200/40 dark:bg-zinc-800/40" />
                  <span className="font-mono text-[10px] text-zinc-400/60 dark:text-zinc-600/60 select-none">
                    {'// projects'}
                  </span>
                  <div className="h-px flex-1 bg-zinc-200/40 dark:bg-zinc-800/40" />
                </div>

                {/* dot-grid background */}
                <div className="pointer-events-none absolute inset-0 opacity-20" aria-hidden="true">
                  <svg className="h-full w-full">
                    <defs>
                      <pattern
                        id={`dots-${client.id}`}
                        width="24"
                        height="24"
                        patternUnits="userSpaceOnUse"
                      >
                        <circle cx="12" cy="12" r="0.6" className="fill-zinc-400/30 dark:fill-zinc-600/30" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill={`url(#dots-${client.id})`} />
                  </svg>
                </div>

                {/* project rows */}
                <div className="relative ml-3 sm:ml-6">
                  {client.projects.map((proj, pi) => (
                    <ProjectRow
                      key={`${client.id}-p${pi}`}
                      project={proj}
                      t={t}
                      index={pi}
                      isLast={pi === client.projects.length - 1}
                      isExpanded={expandedProject === pi}
                      onToggle={() => toggleProject(pi)}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Reveal>
  );
}

/* ── main component ── */
function ClientsInner({ clients, t }: ClientsProps) {
  const [activeId, setActiveId] = useState<string | null>(
    clients.length > 0 ? clients[0].id : null,
  );

  const handleToggle = useCallback((id: string) => {
    setActiveId((prev) => (prev === id ? null : id));
  }, []);

  return (
    <section
      id="clients"
      className="border-t border-zinc-200/50 dark:border-zinc-800/50 py-24"
      aria-label="Clients"
    >
      <div className="mx-auto max-w-5xl px-5">
        <TerminalHeader command="tree --clients --graph" />

        <div className="space-y-4">
          {clients.map((client, i) => (
            <CompanyCard
              key={client.id}
              client={client}
              t={t}
              delay={i * 0.08}
              isActive={activeId === client.id}
              onToggle={() => handleToggle(client.id)}
            />
          ))}
        </div>

        <Reveal delay={clients.length * 0.08 + 0.1}>
          <p className="mt-6 text-center font-mono text-[10px] text-zinc-400/50 dark:text-zinc-600/50 select-none">
            {'// click to expand • explore projects'}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

export const Clients = React.memo(ClientsInner);