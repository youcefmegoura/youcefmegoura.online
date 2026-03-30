'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Sun,
  Moon,
  Globe,
  MapPin,
  Briefcase,
  GraduationCap,
  Code2,
  Mail,
  Phone,
  ExternalLink,
  ChevronDown,
  Download,
  Award,
  MessageSquare,
  Layers,
} from 'lucide-react';
import { useI18n } from '@/lib/i18n';
import { useTheme } from '@/lib/theme';
import type { SiteData, LocalizedString } from '@/lib/types';

/* ─── brand icons (removed from lucide-react) ─── */
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

/* ─── animation helper ─── */
function FadeIn({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── section wrapper ─── */
function Section({
  id,
  children,
  className = '',
}: {
  id: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`py-20 md:py-28 ${className}`}>
      <div className="mx-auto max-w-6xl px-5 sm:px-8">{children}</div>
    </section>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <FadeIn>
      <h2 className="mb-12 text-3xl font-bold tracking-tight md:text-4xl">
        <span className="relative inline-block">
          {children}
          <span className="absolute -bottom-2 left-0 h-1 w-12 rounded-full bg-accent" />
        </span>
      </h2>
    </FadeIn>
  );
}

/* ─── tag chip ─── */
function Chip({
  children,
  variant = 'default',
}: {
  children: React.ReactNode;
  variant?: 'default' | 'accent';
}) {
  const base =
    'inline-block rounded-full px-3 py-1 text-xs font-medium transition-colors';
  const styles =
    variant === 'accent'
      ? 'bg-accent/10 text-accent'
      : 'bg-surface text-muted-foreground hover:bg-border';
  return <span className={`${base} ${styles}`}>{children}</span>;
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
  return `${fmt(start)} — ${end ? fmt(end) : t(ui.present)}`;
}

/* ═══════════════════════════════════════════════
   MAIN LAYOUT
   ═══════════════════════════════════════════════ */

export function V2Layout({ data }: { data: SiteData }) {
  const { locale, setLocale, t } = useI18n();
  const { theme, toggleTheme } = useTheme();
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

  const navItems = [
    { id: 'about', label: t(ui.about) },
    { id: 'skills', label: t(ui.skills) },
    { id: 'experience', label: t(ui.experience) },
    { id: 'education', label: t(ui.education) },
    { id: 'projects', label: t(ui.projects) },
    { id: 'contact', label: t(ui.contact) },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      {/* ── NAVBAR ── */}
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="fixed inset-x-0 top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl"
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3 sm:px-8">
          <a
            href="#hero"
            className="text-lg font-bold tracking-tight hover:text-accent transition-colors"
          >
            YM<span className="text-accent">.</span>
          </a>

          <div className="hidden items-center gap-6 md:flex">
            {navItems.map((n) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                className="text-sm text-muted hover:text-foreground transition-colors"
              >
                {n.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setLocale(locale === 'fr' ? 'en' : 'fr')}
              className="rounded-lg p-2 text-muted hover:bg-surface hover:text-foreground transition-colors"
              aria-label="Toggle language"
            >
              <Globe className="h-4 w-4" />
            </button>
            <button
              onClick={toggleTheme}
              className="rounded-lg p-2 text-muted hover:bg-surface hover:text-foreground transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* ── HERO ── */}
      <section
        id="hero"
        className="relative flex min-h-screen items-center justify-center overflow-hidden pt-16"
      >
        {/* gradient bg */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-1/3 left-1/2 h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-accent/8 blur-[120px]" />
          <div className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-accent/5 blur-[100px]" />
        </div>

        <div className="mx-auto max-w-4xl px-5 text-center sm:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-medium text-muted">
              <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              {t(profile.availability)}
            </div>

            <h1 className="text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              {profile.name.split(' ')[0]}{' '}
              <span className="text-accent">
                {profile.name.split(' ').slice(1).join(' ')}
              </span>
            </h1>

            <p className="mt-4 text-xl text-muted sm:text-2xl">
              {t(profile.title)}
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              <MapPin className="mr-1 inline-block h-3.5 w-3.5" />
              {profile.location}
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <a
                href={meta.cv_download_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground shadow-lg shadow-accent/25 transition-all hover:bg-accent-hover hover:shadow-xl hover:shadow-accent/30"
              >
                <Download className="h-4 w-4" />
                {t(ui.download_cv)}
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-semibold transition-colors hover:bg-surface"
              >
                <MessageSquare className="h-4 w-4" />
                {t(ui.contact)}
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="mt-20"
          >
            <a
              href="#about"
              className="inline-flex animate-bounce text-muted hover:text-foreground transition-colors"
            >
              <ChevronDown className="h-6 w-6" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <Section id="about">
        <SectionTitle>{t(ui.about)}</SectionTitle>
        <div className="grid gap-10 md:grid-cols-3">
          <FadeIn className="md:col-span-2">
            <p className="text-lg leading-relaxed text-muted">
              {t(profile.summary)}
            </p>
            <p className="mt-4 text-sm text-muted-foreground">
              {t(profile.tagline)}
            </p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div className="grid grid-cols-3 gap-4 md:grid-cols-1">
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
                <div
                  key={s.label}
                  className="rounded-2xl border border-border bg-card p-4 text-center"
                >
                  <div className="text-2xl font-bold text-accent">{s.val}</div>
                  <div className="mt-1 text-xs text-muted">{s.label}</div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </Section>

      {/* ── SKILLS ── */}
      <Section id="skills" className="bg-surface/50">
        <SectionTitle>{t(ui.skills)}</SectionTitle>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((cat, i) => (
            <FadeIn key={t(cat.category)} delay={i * 0.08}>
              <div className="rounded-2xl border border-border bg-card p-6">
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-accent">
                  {t(cat.category)}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((s) => (
                    <Chip key={s}>{s}</Chip>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* ── EXPERIENCE ── */}
      <Section id="experience">
        <SectionTitle>{t(ui.experience)}</SectionTitle>
        <div className="relative space-y-10 pl-8 before:absolute before:left-3 before:top-2 before:h-[calc(100%-16px)] before:w-px before:bg-border md:pl-10 md:before:left-4">
          {experience.map((exp, i) => (
            <FadeIn key={exp.id} delay={i * 0.1}>
              <div className="relative">
                {/* timeline dot */}
                <div className="absolute -left-8 top-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-accent bg-background md:-left-10 md:h-8 md:w-8">
                  <Briefcase className="h-3 w-3 text-accent md:h-4 md:w-4" />
                </div>

                <div className="rounded-2xl border border-border bg-card p-6 transition-shadow hover:shadow-lg hover:shadow-accent/5">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <h3 className="text-lg font-semibold">
                        {t(exp.role)}
                      </h3>
                      <p className="text-sm text-accent font-medium">
                        {t(exp.company)}
                      </p>
                    </div>
                    <span className="rounded-full bg-surface px-3 py-1 text-xs text-muted">
                      {formatPeriod(exp.period.start, exp.period.end, t, ui)}
                    </span>
                  </div>

                  <p className="mt-3 text-sm text-muted">{t(exp.short)}</p>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {exp.environment.map((e) => (
                      <Chip key={e} variant="accent">
                        {e}
                      </Chip>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* ── EDUCATION ── */}
      <Section id="education" className="bg-surface/50">
        <SectionTitle>{t(ui.education)}</SectionTitle>
        <div className="grid gap-6 md:grid-cols-2">
          {education.map((ed, i) => (
            <FadeIn key={ed.id} delay={i * 0.1}>
              <div className="rounded-2xl border border-border bg-card p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                    <GraduationCap className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{t(ed.degree)}</h3>
                    <p className="text-sm text-accent">{t(ed.school)}</p>
                    <p className="text-xs text-muted">{t(ed.faculty)}</p>
                    <p className="mt-2 text-xs text-muted-foreground">
                      {formatPeriod(ed.period.start, ed.period.end, t, ui)} ·{' '}
                      {ed.location}
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* ── PROJECTS ── */}
      <Section id="projects">
        <SectionTitle>{t(ui.projects)}</SectionTitle>

        {/* dev projects */}
        <FadeIn>
          <h3 className="mb-6 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-muted">
            <Code2 className="h-4 w-4" />
            {t(ui.development)}
          </h3>
        </FadeIn>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.dev.map((p, i) => (
            <FadeIn key={p.id} delay={i * 0.08}>
              <div className="group rounded-2xl border border-border bg-card overflow-hidden transition-all hover:border-accent/40 hover:shadow-lg hover:shadow-accent/5">
                {p.image && (
                  <div className="relative h-44 overflow-hidden bg-surface">
                    <img
                      src={p.image}
                      alt={t(p.title)}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                )}
                <div className="p-5">
                  <div className="flex items-start justify-between">
                    <h4 className="font-semibold group-hover:text-accent transition-colors">
                      {t(p.title)}
                    </h4>
                    {p.link && (
                      <a
                        href={p.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted hover:text-accent transition-colors"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                  <p className="mt-2 text-sm text-muted line-clamp-2">
                    {t(p.description)}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {p.tech.map((tch) => (
                      <Chip key={tch}>{tch}</Chip>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* design projects */}
        {projects.design.length > 0 && (
          <>
            <FadeIn className="mt-14">
              <h3 className="mb-6 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-muted">
                <Layers className="h-4 w-4" />
                {t(ui.design)}
              </h3>
            </FadeIn>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {projects.design.map((d, i) => (
                <FadeIn key={d.id} delay={i * 0.06}>
                  <div className="group rounded-2xl border border-border bg-card overflow-hidden transition-all hover:border-accent/40">
                    <div className="relative h-40 overflow-hidden bg-surface">
                      <img
                        src={d.image}
                        alt={t(d.title)}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-4">
                      <h4 className="text-sm font-semibold">{t(d.title)}</h4>
                      <div className="mt-2 flex flex-wrap gap-1">
                        {d.tools.map((tl) => (
                          <span
                            key={tl}
                            className="text-[10px] text-muted-foreground"
                          >
                            {tl}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </>
        )}
      </Section>

      {/* ── LANGUAGES ── */}
      <Section id="languages" className="bg-surface/50">
        <SectionTitle>{t(ui.languages)}</SectionTitle>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {languages.map((lang, i) => (
            <FadeIn key={t(lang.language)} delay={i * 0.08}>
              <div className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5">
                <span className="text-2xl">{lang.flag}</span>
                <div>
                  <p className="font-semibold">{t(lang.language)}</p>
                  <p className="text-sm text-muted">{t(lang.level)}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* ── CERTIFICATIONS ── */}
      <Section id="certifications">
        <SectionTitle>{t(ui.certifications)}</SectionTitle>
        <div className="grid gap-6 sm:grid-cols-2">
          {certifications.map((cert, i) => (
            <FadeIn key={cert.title} delay={i * 0.08}>
              <div className="flex gap-4 rounded-2xl border border-border bg-card p-6">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <Award className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold">{cert.title}</h3>
                  <p className="text-sm text-accent">{cert.issuer}</p>
                  <p className="mt-1 text-sm text-muted">
                    {t(cert.description)}
                  </p>
                  {cert.date && (
                    <p className="mt-2 text-xs text-muted-foreground">
                      {cert.date}
                    </p>
                  )}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* ── CONTACT ── */}
      <Section id="contact" className="bg-surface/50">
        <SectionTitle>{t(ui.contact)}</SectionTitle>
        <FadeIn>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-lg text-muted">
              {locale === 'fr'
                ? "N'hésitez pas à me contacter pour discuter de vos projets."
                : "Don't hesitate to reach out to discuss your projects."}
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <a
                href={`mailto:${meta.social.email}`}
                className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
              >
                <Mail className="h-4 w-4" />
                {meta.social.email}
              </a>
              <a
                href={`tel:${meta.social.phone}`}
                className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
              >
                <Phone className="h-4 w-4" />
                {meta.social.phone}
              </a>
            </div>

            <div className="mt-8 flex justify-center gap-4">
              {[
                { href: meta.social.linkedin, icon: IconLinkedIn, label: 'LinkedIn' },
                { href: meta.social.github, icon: IconGitHub, label: 'GitHub' },
                { href: meta.social.twitter, icon: IconX, label: 'X' },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-accent hover:text-accent"
                >
                  <s.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </FadeIn>
      </Section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-border py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 sm:flex-row sm:px-8">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} {profile.name}.{' '}
            {t(ui.all_rights_reserved)}.
          </p>
          <a
            href="/"
            className="text-xs text-muted-foreground hover:text-accent transition-colors"
          >
            {t(ui.version_select)}
          </a>
        </div>
      </footer>
    </div>
  );
}
