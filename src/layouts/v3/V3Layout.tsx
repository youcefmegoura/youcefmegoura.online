'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Sun,
  Moon,
  Globe,
  MapPin,
  ExternalLink,
  Mail,
  Phone,
  Download,
  Terminal,
  Award,
} from 'lucide-react';
import { useI18n } from '@/lib/i18n';
import { useTheme } from '@/lib/theme';
import type { SiteData, LocalizedString } from '@/lib/types';

/* ─── brand icons ─── */
function IconGitHub({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

function IconLinkedIn({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function IconX({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

/* ─── constants ─── */
const CYAN = '#06b6d4';
const GREEN = '#22c55e';

/* ─── typing cursor ─── */
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

/* ─── animated section ─── */
function Reveal({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── dot grid background ─── */
function DotGrid() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 opacity-[0.03]">
      <svg width="100%" height="100%">
        <defs>
          <pattern
            id="dot-grid"
            width="24"
            height="24"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="1" cy="1" r="1" fill="currentColor" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dot-grid)" />
      </svg>
    </div>
  );
}

/* ─── terminal section header ─── */
function TerminalHeader({
  command,
  className = '',
}: {
  command: string;
  className?: string;
}) {
  return (
    <Reveal className={className}>
      <h2 className="mb-10 font-mono text-sm font-normal tracking-wider text-zinc-500 md:text-base">
        <span className="text-green-500">$</span>{' '}
        <span className="text-zinc-300">{command}</span>
        <span className="animate-pulse text-cyan-400 ml-1">_</span>
      </h2>
    </Reveal>
  );
}

/* ─── code badge ─── */
function CodeBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block rounded-md bg-zinc-800 px-2.5 py-1 font-mono text-xs text-cyan-400 border border-zinc-700/50">
      {children}
    </span>
  );
}

/* ─── skill pill ─── */
function SkillPill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block rounded-full bg-zinc-800/80 border border-zinc-700/50 px-3 py-1.5 font-mono text-xs text-zinc-300 transition-all hover:border-cyan-500/40 hover:text-cyan-400 hover:shadow-[0_0_12px_rgba(6,182,212,0.1)]">
      {children}
    </span>
  );
}

/* ─── format period ─── */
function formatPeriod(
  start: string,
  end: string | null,
  t: (s: LocalizedString) => string,
  ui: SiteData['ui'],
) {
  const fmt = (d: string) => {
    const [y, m] = d.split('-');
    return `${m}/${y}`;
  };
  return `${fmt(start)} → ${end ? fmt(end) : t(ui.present)}`;
}

/* ═══════════════════════════════════════════════
   V3 LAYOUT — MINIMAL DARK
   ═══════════════════════════════════════════════ */

export function V3Layout({ data }: { data: SiteData }) {
  const { locale, setLocale, t } = useI18n();
  const { theme, toggleTheme, setTheme } = useTheme();
  const {
    profile,
    experience,
    skills,
    education,
    projects,
    languages,
    certifications,
    meta,
    ui,
  } = data;

  // Default to dark mode for V3
  useEffect(() => {
    setTheme('dark');
  }, [setTheme]);

  const navItems = [
    { id: 'about', label: '// about' },
    { id: 'skills', label: '// skills' },
    { id: 'experience', label: '// exp' },
    { id: 'projects', label: '// projects' },
    { id: 'contact', label: '// contact' },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-mono selection:bg-cyan-500/30">
      <DotGrid />

      {/* ── NAVBAR ── */}
      <motion.nav
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="fixed inset-x-0 top-0 z-50 border-b border-zinc-800/80 bg-zinc-950/90 backdrop-blur-xl"
      >
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-3">
          <a href="#hero" className="group flex items-center gap-2">
            <Terminal className="h-4 w-4 text-cyan-400" />
            <span className="text-sm font-medium text-zinc-400 group-hover:text-cyan-400 transition-colors">
              ~/youcef
            </span>
          </a>

          <div className="hidden items-center gap-5 md:flex">
            {navItems.map((n) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                className="text-xs text-zinc-500 hover:text-cyan-400 transition-colors"
              >
                {n.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setLocale(locale === 'fr' ? 'en' : 'fr')}
              className="rounded-md p-2 text-zinc-500 hover:bg-zinc-800 hover:text-zinc-300 transition-colors"
              aria-label="Toggle language"
            >
              <Globe className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={toggleTheme}
              className="rounded-md p-2 text-zinc-500 hover:bg-zinc-800 hover:text-zinc-300 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="h-3.5 w-3.5" />
              ) : (
                <Moon className="h-3.5 w-3.5" />
              )}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* ── HERO ── */}
      <section
        id="hero"
        className="relative flex min-h-screen items-center justify-center overflow-hidden pt-14"
      >
        {/* subtle gradient glow */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-1/3 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/5 blur-[120px]" />
        </div>

        <div className="mx-auto max-w-4xl px-5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="font-mono text-sm text-zinc-500">
              <span className="text-green-500">~/portfolio</span>{' '}
              <span className="text-zinc-600">on</span>{' '}
              <span className="text-cyan-400">main</span>{' '}
              <span className="text-zinc-600">via</span>{' '}
              <span className="text-yellow-500">⬡ v18</span>
            </p>

            <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              <span className="text-zinc-100">{profile.name.split(' ')[0]}</span>{' '}
              <span className="text-cyan-400">
                {profile.name.split(' ').slice(1).join(' ')}
              </span>
            </h1>

            <div className="mt-4 text-lg text-zinc-400 sm:text-xl">
              <span className="text-green-500 mr-2">{'>'}</span>
              <TypingText
                texts={[
                  t(profile.title),
                  t(profile.tagline),
                  `📍 ${profile.location}`,
                ]}
                className="text-zinc-300"
              />
            </div>

            <div className="mt-3 flex items-center gap-2 text-sm text-zinc-500">
              <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              <span>{t(profile.availability)}</span>
              <span className="text-zinc-700">·</span>
              <MapPin className="h-3 w-3" />
              <span>{profile.location}</span>
            </div>

            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href={meta.cv_download_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20 px-5 py-2.5 font-mono text-sm text-cyan-400 transition-all hover:bg-cyan-500/20 hover:shadow-[0_0_20px_rgba(6,182,212,0.15)]"
              >
                <Download className="h-4 w-4" />
                {t(ui.download_cv)}
              </a>
              <a
                href={`mailto:${meta.social.email}`}
                className="inline-flex items-center gap-2 rounded-lg border border-zinc-700 px-5 py-2.5 font-mono text-sm text-zinc-400 transition-all hover:border-zinc-500 hover:text-zinc-200"
              >
                <Mail className="h-4 w-4" />
                {t(ui.contact)}
              </a>
            </div>

            {/* social row */}
            <div className="mt-8 flex gap-3">
              {[
                { href: meta.social.github, icon: IconGitHub },
                { href: meta.social.linkedin, icon: IconLinkedIn },
                { href: meta.social.twitter, icon: IconX },
              ].map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-800 text-zinc-500 transition-colors hover:border-cyan-500/40 hover:text-cyan-400"
                >
                  <s.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="py-24">
        <div className="mx-auto max-w-5xl px-5">
          <TerminalHeader command="cat about.md" />
          <Reveal>
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 md:p-8">
              <p className="text-base leading-relaxed text-zinc-400 md:text-lg">
                {t(profile.summary)}
              </p>
              <div className="mt-8 grid grid-cols-3 gap-4">
                {[
                  {
                    val: `${profile.stats.years_experience}+`,
                    label: t(ui.years_experience),
                  },
                  { val: `${profile.stats.clients}+`, label: t(ui.clients) },
                  {
                    val: `${profile.stats.projects}+`,
                    label: t(ui.projects_count),
                  },
                ].map((s) => (
                  <div key={s.label} className="text-center">
                    <div className="text-2xl font-bold text-cyan-400 md:text-3xl">
                      {s.val}
                    </div>
                    <div className="mt-1 text-xs text-zinc-500 uppercase tracking-wider">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section id="skills" className="py-24 border-t border-zinc-800/50">
        <div className="mx-auto max-w-5xl px-5">
          <TerminalHeader command="ls --skills --all" />
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {skills.map((cat, i) => (
              <Reveal key={t(cat.category)} delay={i * 0.06}>
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

      {/* ── EXPERIENCE ── */}
      <section
        id="experience"
        className="py-24 border-t border-zinc-800/50"
      >
        <div className="mx-auto max-w-5xl px-5">
          <TerminalHeader command="experience --list --verbose" />
          <div className="space-y-6">
            {experience.map((exp, i) => (
              <Reveal key={exp.id} delay={i * 0.08}>
                <div className="group rounded-xl border border-zinc-800/60 bg-zinc-900/30 p-6 transition-all hover:border-cyan-500/20 hover:bg-zinc-900/50">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h3 className="text-base font-semibold text-zinc-200">
                        {t(exp.role)}
                      </h3>
                      <p className="text-sm text-cyan-400">{t(exp.company)}</p>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-zinc-500 font-mono shrink-0">
                      <span>
                        {formatPeriod(exp.period.start, exp.period.end, t, ui)}
                      </span>
                      <span className="text-zinc-700">|</span>
                      <span>{exp.location}</span>
                    </div>
                  </div>

                  <p className="mt-3 text-sm text-zinc-400">{t(exp.short)}</p>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {exp.environment.map((e) => (
                      <CodeBadge key={e}>{e}</CodeBadge>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── EDUCATION ── */}
      <section id="education" className="py-24 border-t border-zinc-800/50">
        <div className="mx-auto max-w-5xl px-5">
          <TerminalHeader command="cat education.json | jq '.[]'" />
          <div className="grid gap-6 md:grid-cols-2">
            {education.map((ed, i) => (
              <Reveal key={ed.id} delay={i * 0.08}>
                <div className="rounded-xl border border-zinc-800/60 bg-zinc-900/30 p-6">
                  <div className="font-mono text-xs text-zinc-600 mb-3">
                    {`{`}
                  </div>
                  <div className="pl-4 space-y-1">
                    <p className="text-sm">
                      <span className="text-cyan-400">&quot;degree&quot;</span>
                      <span className="text-zinc-600">: </span>
                      <span className="text-green-400">&quot;{t(ed.degree)}&quot;</span>
                    </p>
                    <p className="text-sm">
                      <span className="text-cyan-400">&quot;school&quot;</span>
                      <span className="text-zinc-600">: </span>
                      <span className="text-green-400">&quot;{t(ed.school)}&quot;</span>
                    </p>
                    <p className="text-sm">
                      <span className="text-cyan-400">&quot;faculty&quot;</span>
                      <span className="text-zinc-600">: </span>
                      <span className="text-green-400">&quot;{t(ed.faculty)}&quot;</span>
                    </p>
                    <p className="text-sm">
                      <span className="text-cyan-400">&quot;period&quot;</span>
                      <span className="text-zinc-600">: </span>
                      <span className="text-yellow-400">
                        &quot;{formatPeriod(ed.period.start, ed.period.end, t, ui)}&quot;
                      </span>
                    </p>
                    <p className="text-sm">
                      <span className="text-cyan-400">&quot;location&quot;</span>
                      <span className="text-zinc-600">: </span>
                      <span className="text-zinc-400">&quot;{ed.location}&quot;</span>
                    </p>
                  </div>
                  <div className="font-mono text-xs text-zinc-600 mt-3">
                    {`}`}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects" className="py-24 border-t border-zinc-800/50">
        <div className="mx-auto max-w-5xl px-5">
          <TerminalHeader command="ls ~/projects --dev" />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.dev.map((p, i) => (
              <Reveal key={p.id} delay={i * 0.06}>
                <div className="group rounded-xl border border-zinc-800/60 bg-zinc-900/30 overflow-hidden transition-all hover:border-cyan-500/30 hover:shadow-[0_0_30px_rgba(6,182,212,0.05)]">
                  {p.image && (
                    <div className="relative h-40 overflow-hidden">
                      <img
                        src={p.image}
                        alt={t(p.title)}
                        className="h-full w-full object-cover opacity-60 transition-all duration-500 group-hover:opacity-80 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent" />
                    </div>
                  )}
                  <div className="p-5">
                    <div className="flex items-start justify-between">
                      <h4 className="text-sm font-semibold text-zinc-200 group-hover:text-cyan-400 transition-colors">
                        {t(p.title)}
                      </h4>
                      {p.link && (
                        <a
                          href={p.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-zinc-600 hover:text-cyan-400 transition-colors"
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      )}
                    </div>
                    <p className="mt-2 text-xs text-zinc-500 line-clamp-2">
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

          {/* design projects */}
          {projects.design.length > 0 && (
            <>
              <TerminalHeader
                command="ls ~/projects --design"
                className="mt-16"
              />
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {projects.design.map((d, i) => (
                  <Reveal key={d.id} delay={i * 0.06}>
                    <div className="group rounded-xl border border-zinc-800/60 bg-zinc-900/30 overflow-hidden transition-all hover:border-cyan-500/30">
                      <div className="relative h-36 overflow-hidden">
                        <img
                          src={d.image}
                          alt={t(d.title)}
                          className="h-full w-full object-cover opacity-50 transition-all duration-500 group-hover:opacity-70 group-hover:scale-105"
                        />
                      </div>
                      <div className="p-4">
                        <h4 className="text-xs font-semibold text-zinc-300">
                          {t(d.title)}
                        </h4>
                        <div className="mt-2 flex flex-wrap gap-1">
                          {d.tools.map((tl) => (
                            <span
                              key={tl}
                              className="text-[10px] text-zinc-600 font-mono"
                            >
                              {tl}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* ── LANGUAGES ── */}
      <section id="languages" className="py-24 border-t border-zinc-800/50">
        <div className="mx-auto max-w-5xl px-5">
          <TerminalHeader command="locale --list" />
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {languages.map((lang, i) => (
              <Reveal key={t(lang.language)} delay={i * 0.08}>
                <div className="flex items-center gap-4 rounded-xl border border-zinc-800/60 bg-zinc-900/30 p-5 transition-all hover:border-cyan-500/20">
                  <span className="text-2xl">{lang.flag}</span>
                  <div>
                    <p className="text-sm font-medium text-zinc-200">
                      {t(lang.language)}
                    </p>
                    <p className="text-xs text-zinc-500 font-mono">
                      {t(lang.level)}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CERTIFICATIONS ── */}
      <section
        id="certifications"
        className="py-24 border-t border-zinc-800/50"
      >
        <div className="mx-auto max-w-5xl px-5">
          <TerminalHeader command="gpg --list-certs" />
          <div className="grid gap-6 sm:grid-cols-2">
            {certifications.map((cert, i) => (
              <Reveal key={cert.title} delay={i * 0.08}>
                <div className="rounded-xl border border-zinc-800/60 bg-zinc-900/30 p-6 transition-all hover:border-green-500/20">
                  <div className="flex items-start gap-3">
                    <Award className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                    <div>
                      <h3 className="text-sm font-semibold text-zinc-200">
                        {cert.title}
                      </h3>
                      <p className="text-xs text-cyan-400 mt-0.5">
                        {cert.issuer}
                      </p>
                      <p className="mt-2 text-xs text-zinc-500">
                        {t(cert.description)}
                      </p>
                      {cert.date && (
                        <p className="mt-2 font-mono text-[10px] text-zinc-600">
                          issued: {cert.date}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="py-24 border-t border-zinc-800/50">
        <div className="mx-auto max-w-5xl px-5">
          <TerminalHeader command="echo $CONTACT_INFO" />
          <Reveal>
            <div className="mx-auto max-w-2xl">
              <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 md:p-8">
                {/* terminal window chrome */}
                <div className="flex items-center gap-2 mb-6 pb-4 border-b border-zinc-800">
                  <span className="h-3 w-3 rounded-full bg-red-500/80" />
                  <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
                  <span className="h-3 w-3 rounded-full bg-green-500/80" />
                  <span className="ml-3 text-xs text-zinc-600 font-mono">
                    contact.sh
                  </span>
                </div>

                <div className="space-y-3 font-mono text-sm">
                  <p>
                    <span className="text-zinc-600">{'>'}</span>{' '}
                    <span className="text-cyan-400">email</span>{' '}
                    <span className="text-zinc-600">=</span>{' '}
                    <a
                      href={`mailto:${meta.social.email}`}
                      className="text-green-400 hover:underline"
                    >
                      &quot;{meta.social.email}&quot;
                    </a>
                  </p>
                  <p>
                    <span className="text-zinc-600">{'>'}</span>{' '}
                    <span className="text-cyan-400">phone</span>{' '}
                    <span className="text-zinc-600">=</span>{' '}
                    <a
                      href={`tel:${meta.social.phone}`}
                      className="text-green-400 hover:underline"
                    >
                      &quot;{meta.social.phone}&quot;
                    </a>
                  </p>
                  <p>
                    <span className="text-zinc-600">{'>'}</span>{' '}
                    <span className="text-cyan-400">linkedin</span>{' '}
                    <span className="text-zinc-600">=</span>{' '}
                    <a
                      href={meta.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-400 hover:underline"
                    >
                      &quot;{meta.social.linkedin.replace('https://www.', '')}&quot;
                    </a>
                  </p>
                  <p>
                    <span className="text-zinc-600">{'>'}</span>{' '}
                    <span className="text-cyan-400">github</span>{' '}
                    <span className="text-zinc-600">=</span>{' '}
                    <a
                      href={meta.social.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-400 hover:underline"
                    >
                      &quot;{meta.social.github.replace('https://', '')}&quot;
                    </a>
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-zinc-800">
                  <p className="text-xs text-zinc-500">
                    <span className="text-green-500">$</span>{' '}
                    {locale === 'fr'
                      ? "N'hésitez pas à me contacter 🚀"
                      : "Don't hesitate to reach out 🚀"}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-zinc-800/50 py-8">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-5 sm:flex-row">
          <p className="font-mono text-xs text-zinc-600">
            <span className="text-green-500">$</span> echo &quot;©{' '}
            {new Date().getFullYear()} {profile.name}. {t(ui.all_rights_reserved)}.&quot;
          </p>
          <a
            href="/"
            className="font-mono text-xs text-zinc-600 hover:text-cyan-400 transition-colors"
          >
            cd ~/versions
          </a>
        </div>
      </footer>
    </div>
  );
}
