'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Download, Mail } from 'lucide-react';
import { IconGitHub, IconLinkedIn, IconX } from './shared';
import type { Profile, Meta, UIStrings, LocalizedString } from '@/lib/types';

/* ─── typing cursor animation ─── */
function TypingText({
  texts,
  className = '',
}: {
  texts: string[];
  className?: string;
}) {
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = texts[index];
    let timeout: NodeJS.Timeout;

    if (!deleting && displayed.length < current.length) {
      timeout = setTimeout(
        () => setDisplayed(current.slice(0, displayed.length + 1)),
        60,
      );
    } else if (!deleting && displayed.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), 2200);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(
        () => setDisplayed(displayed.slice(0, -1)),
        30,
      );
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setIndex((i) => (i + 1) % texts.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, deleting, index, texts]);

  return (
    <span className={className}>
      {displayed}
      <span className="animate-pulse text-cyan-400">▌</span>
    </span>
  );
}

interface HeroProps {
  profile: Profile;
  meta: Meta;
  ui: UIStrings;
  t: (s: LocalizedString) => string;
}

export function Hero({ profile, meta, ui, t }: HeroProps) {
  const socialLinks = [
    { href: meta.social.github, icon: IconGitHub, label: 'GitHub' },
    { href: meta.social.linkedin, icon: IconLinkedIn, label: 'LinkedIn' },
  ];

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden pt-14"
      aria-label="Introduction"
    >
      {/* subtle gradient glow */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute left-1/2 top-1/3 h-125 w-125 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/5 blur-[120px]" />
      </div>

      <div className="mx-auto w-full max-w-4xl px-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <p className="font-mono text-sm text-zinc-500">
            <span className="text-green-500">~/portfolio</span>{' '}
            <span className="text-zinc-400 dark:text-zinc-600">on</span>{' '}
            <span className="text-cyan-400">main</span>{' '}
            <span className="text-zinc-400 dark:text-zinc-600">via</span>{' '}
            <span className="text-yellow-500">⬡ v1.0.0</span>
          </p>

          <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            <span className="text-zinc-900 dark:text-zinc-100">{profile.name.split(' ')[0]}</span>{' '}
            <span className="text-cyan-400">
              {profile.name.split(' ').slice(1).join(' ')}
            </span>
          </h1>

          <div className="mt-4 min-h-[3.5em] text-lg text-zinc-600 dark:text-zinc-400 sm:min-h-[2.5em] sm:text-xl">
            <span className="mr-2 text-green-500">{'>'}</span>
            <TypingText
              texts={[
                t(profile.title),
                t(profile.tagline),
              ]}
              className="text-zinc-700 dark:text-zinc-300"
            />
          </div>

          <div className="mt-3 flex items-center gap-2 text-sm text-zinc-500">
            <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
            <span>{t(profile.availability)}</span>
            <span className="text-zinc-300 dark:text-zinc-700">·</span>
            <MapPin className="h-3 w-3" />
            <span>{profile.location}</span>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href={meta.cv_download_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-cyan-500/20 bg-cyan-500/10 px-5 py-2.5 font-mono text-sm text-cyan-400 transition-all hover:bg-cyan-500/20 hover:shadow-[0_0_20px_rgba(6,182,212,0.15)]"
            >
              <Download className="h-4 w-4" />
              {t(ui.download_cv)}
            </a>
            <a
              href={`mailto:${meta.social.email}`}
              className="inline-flex items-center gap-2 rounded-lg border border-zinc-300 dark:border-zinc-700 px-5 py-2.5 font-mono text-sm text-zinc-600 dark:text-zinc-400 transition-all hover:border-zinc-400 dark:hover:border-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
            >
              <Mail className="h-4 w-4" />
              {t(ui.contact)}
            </a>
          </div>

          {/* social row */}
          <div className="mt-8 flex gap-3">
            {socialLinks.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-500 transition-colors hover:border-cyan-500/40 hover:text-cyan-400"
              >
                <s.icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
