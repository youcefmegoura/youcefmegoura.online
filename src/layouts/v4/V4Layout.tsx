'use client';

import { motion } from 'framer-motion';
import { useTranslation, useI18n } from '@/lib/i18n';
import { useTheme } from '@/lib/theme';
import type { SiteData } from '@/lib/types';
import {
  Sun, Moon, Languages, MapPin, Calendar, ExternalLink,
  Download, Mail, Phone, AtSign, Link2, Code2,
  Briefcase, GraduationCap, Code, Palette, Award,
  ChevronRight, ArrowUpRight, Globe,
} from 'lucide-react';

interface Props {
  data: SiteData;
}

const cardBase =
  'rounded-2xl border border-border/50 bg-card/80 backdrop-blur-xl shadow-sm overflow-hidden';

function BentoCard({
  children,
  className = '',
  index = 0,
}: {
  children: React.ReactNode;
  className?: string;
  index?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.5, ease: 'easeOut' }}
      whileHover={{ y: -4, scale: 1.01 }}
      className={`${cardBase} ${className} transition-shadow duration-300 hover:shadow-xl`}
    >
      {children}
    </motion.div>
  );
}

export default function V4Layout({ data }: Props) {
  const t = useTranslation();
  const { locale, setLocale } = useI18n();
  const { theme, toggleTheme } = useTheme();
  const { profile, experience, skills, education, projects, languages, certifications, meta, ui } = data;

  const formatPeriod = (start: string, end: string | null) => {
    const s = start.includes('-') ? start.slice(0, 7) : start;
    const e = end ? (end.includes('-') ? end.slice(0, 7) : end) : t(ui.present);
    return `${s} → ${e}`;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* ── Toolbar ── */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border/40">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-8">
          <a href="/" className="text-sm font-medium text-muted hover:text-foreground transition-colors">
            ← Home
          </a>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setLocale(locale === 'fr' ? 'en' : 'fr')}
              className="flex items-center gap-1.5 rounded-lg border border-border/60 bg-surface/60 px-3 py-1.5 text-xs font-medium text-foreground backdrop-blur transition-colors hover:bg-surface"
            >
              <Languages size={14} />
              {locale === 'fr' ? 'EN' : 'FR'}
            </button>
            <button
              onClick={toggleTheme}
              className="flex items-center gap-1.5 rounded-lg border border-border/60 bg-surface/60 px-3 py-1.5 text-xs font-medium text-foreground backdrop-blur transition-colors hover:bg-surface"
            >
              {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
            </button>
          </div>
        </div>
      </header>

      {/* ── Bento Grid ── */}
      <div className="mx-auto max-w-7xl px-4 py-8 md:px-8">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

          {/* ── Row 1: Hero (2 cols) + Photo (1 col) ── */}
          <BentoCard className="md:col-span-2 p-8 md:p-10 flex flex-col justify-between" index={0}>
            <div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mb-4 inline-flex items-center gap-2 rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                {t(profile.availability)}
              </motion.div>
              <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
                {profile.name}
              </h1>
              <p className="mt-3 text-lg text-muted md:text-xl">
                {t(profile.title)}
              </p>
              <p className="mt-2 text-sm text-muted/70">
                {t(profile.tagline)}
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-6">
              {[
                { value: profile.stats.years_experience, label: ui.years_experience },
                { value: profile.stats.clients, label: ui.clients },
                { value: profile.stats.projects, label: ui.projects_count },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <span className="block text-3xl font-bold text-accent">{stat.value}+</span>
                  <span className="text-xs text-muted">{t(stat.label)}</span>
                </div>
              ))}
            </div>
          </BentoCard>

          <BentoCard className="relative aspect-square md:aspect-auto" index={1}>
            <img
              src={profile.photo}
              alt={profile.name}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4">
              <div className="flex items-center gap-1.5 text-sm text-white">
                <MapPin size={14} />
                {profile.location}
              </div>
            </div>
          </BentoCard>

          {/* ── Row 2: About (1 col) + Skills (2 cols) ── */}
          <BentoCard className="p-6 md:p-8 flex flex-col" index={2}>
            <h2 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-muted">
              <Globe size={16} className="text-accent" />
              {t(ui.about)}
            </h2>
            <p className="flex-1 text-sm leading-relaxed text-foreground/80">
              {t(profile.summary)}
            </p>
            <div className="mt-6 flex gap-3">
              <a
                href={meta.cv_download_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2 text-xs font-medium text-accent-foreground transition-colors hover:bg-accent-hover"
              >
                <Download size={14} />
                {t(ui.download_cv)}
              </a>
              <a
                href={meta.detailed_experience_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface/50 px-4 py-2 text-xs font-medium text-foreground transition-colors hover:bg-surface"
              >
                <ExternalLink size={14} />
                {t(ui.detailed_experience)}
              </a>
            </div>
          </BentoCard>

          <BentoCard className="md:col-span-2 p-6 md:p-8" index={3}>
            <h2 className="mb-5 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-muted">
              <Code size={16} className="text-accent" />
              {t(ui.skills)}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {skills.map((cat, i) => (
                <div key={i}>
                  <h3 className="mb-2 text-xs font-semibold text-foreground">
                    {t(cat.category)}
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {cat.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-md bg-surface/80 px-2 py-0.5 text-[11px] font-medium text-muted transition-colors hover:text-accent hover:bg-accent/10"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </BentoCard>

          {/* ── Row 3: Experience (2 cols) + Education (1 col) ── */}
          <BentoCard className="md:col-span-2 p-6 md:p-8" index={4}>
            <h2 className="mb-5 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-muted">
              <Briefcase size={16} className="text-accent" />
              {t(ui.experience)}
            </h2>
            <div className="space-y-4">
              {experience.map((exp) => (
                <div
                  key={exp.id}
                  className="group rounded-xl border border-border/30 bg-surface/30 p-4 transition-colors hover:border-accent/30 hover:bg-accent/5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <h3 className="text-sm font-semibold text-foreground">
                        {t(exp.role)}
                      </h3>
                      <p className="text-xs text-accent font-medium">
                        {t(exp.company)}
                      </p>
                    </div>
                    <div className="shrink-0 text-right">
                      <div className="flex items-center gap-1 text-[11px] text-muted">
                        <Calendar size={11} />
                        {formatPeriod(exp.period.start, exp.period.end)}
                      </div>
                      <div className="flex items-center gap-1 text-[11px] text-muted mt-0.5">
                        <MapPin size={11} />
                        {exp.location}
                      </div>
                    </div>
                  </div>
                  <p className="mt-2 text-xs text-muted leading-relaxed">
                    {t(exp.short)}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1">
                    {exp.environment.slice(0, 6).map((tech) => (
                      <span
                        key={tech}
                        className="rounded bg-background/60 px-1.5 py-0.5 text-[10px] font-medium text-muted"
                      >
                        {tech}
                      </span>
                    ))}
                    {exp.environment.length > 6 && (
                      <span className="rounded bg-background/60 px-1.5 py-0.5 text-[10px] font-medium text-muted">
                        +{exp.environment.length - 6}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </BentoCard>

          <BentoCard className="p-6 md:p-8" index={5}>
            <h2 className="mb-5 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-muted">
              <GraduationCap size={16} className="text-accent" />
              {t(ui.education)}
            </h2>
            <div className="space-y-4">
              {education.map((edu) => (
                <div key={edu.id} className="border-l-2 border-accent/40 pl-4">
                  <h3 className="text-sm font-semibold text-foreground">
                    {t(edu.degree)}
                  </h3>
                  <p className="mt-0.5 text-xs font-medium text-accent">
                    {t(edu.school)}
                  </p>
                  <p className="text-xs text-muted">{t(edu.faculty)}</p>
                  <div className="mt-1.5 flex items-center gap-3 text-[11px] text-muted">
                    <span className="flex items-center gap-1">
                      <Calendar size={11} />
                      {edu.period.start} – {edu.period.end}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin size={11} />
                      {edu.location}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {certifications.length > 0 && (
              <>
                <h2 className="mb-4 mt-8 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-muted">
                  <Award size={16} className="text-accent" />
                  {t(ui.certifications)}
                </h2>
                <div className="space-y-3">
                  {certifications.map((cert, i) => (
                    <div key={i} className="border-l-2 border-border/50 pl-4">
                      <h3 className="text-sm font-semibold text-foreground">{cert.title}</h3>
                      <p className="text-xs text-muted">{cert.issuer}</p>
                      {cert.date && (
                        <p className="text-[11px] text-muted/70">{cert.date}</p>
                      )}
                    </div>
                  ))}
                </div>
              </>
            )}
          </BentoCard>

          {/* ── Row 4: Projects (1 col) + Languages (1 col) + Contact (1 col) ── */}
          <BentoCard className="p-6 md:p-8" index={6}>
            <h2 className="mb-5 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-muted">
              <Code size={16} className="text-accent" />
              {t(ui.projects)}
            </h2>
            <div className="space-y-3">
              {projects.dev.map((proj) => (
                <div
                  key={proj.id}
                  className="group flex items-start gap-3 rounded-lg border border-border/20 bg-surface/20 p-3 transition-colors hover:border-accent/30"
                >
                  <div className="h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-surface">
                    <img
                      src={proj.image}
                      alt={t(proj.title)}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <h3 className="truncate text-xs font-semibold text-foreground">
                        {t(proj.title)}
                      </h3>
                      {proj.link && (
                        <a href={proj.link} target="_blank" rel="noopener noreferrer">
                          <ArrowUpRight size={12} className="text-muted hover:text-accent" />
                        </a>
                      )}
                    </div>
                    <p className="mt-0.5 line-clamp-2 text-[11px] text-muted leading-relaxed">
                      {t(proj.description)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {projects.design.length > 0 && (
              <div className="mt-6">
                <h3 className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted">
                  <Palette size={14} className="text-accent" />
                  {t(ui.design)}
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {projects.design.slice(0, 4).map((proj) => (
                    <div key={proj.id} className="overflow-hidden rounded-lg">
                      <img
                        src={proj.image}
                        alt={t(proj.title)}
                        className="aspect-square w-full object-cover transition-transform duration-300 hover:scale-110"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </BentoCard>

          <BentoCard className="p-6 md:p-8" index={7}>
            <h2 className="mb-5 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-muted">
              <Languages size={16} className="text-accent" />
              {t(ui.languages)}
            </h2>
            <div className="space-y-3">
              {languages.map((lang, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 rounded-xl border border-border/20 bg-surface/20 p-3"
                >
                  <span className="text-2xl">{lang.flag}</span>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">
                      {t(lang.language)}
                    </h3>
                    <p className="text-xs text-muted">{t(lang.level)}</p>
                  </div>
                </div>
              ))}
            </div>
          </BentoCard>

          <BentoCard className="p-6 md:p-8" index={8}>
            <h2 className="mb-5 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-muted">
              <Mail size={16} className="text-accent" />
              {t(ui.contact)}
            </h2>
            <div className="space-y-3">
              <a
                href={`mailto:${meta.social.email}`}
                className="flex items-center gap-3 rounded-xl border border-border/20 bg-surface/20 p-3 text-sm text-foreground transition-colors hover:border-accent/30 hover:text-accent"
              >
                <Mail size={16} className="shrink-0 text-muted" />
                <span className="truncate text-xs">{meta.social.email}</span>
              </a>
              <a
                href={`tel:${meta.social.phone}`}
                className="flex items-center gap-3 rounded-xl border border-border/20 bg-surface/20 p-3 text-sm text-foreground transition-colors hover:border-accent/30 hover:text-accent"
              >
                <Phone size={16} className="shrink-0 text-muted" />
                <span className="text-xs">{meta.social.phone}</span>
              </a>
              <a
                href={meta.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-xl border border-border/20 bg-surface/20 p-3 text-sm text-foreground transition-colors hover:border-accent/30 hover:text-accent"
              >
                <Link2 size={16} className="shrink-0 text-muted" />
                <span className="text-xs">LinkedIn</span>
                <ArrowUpRight size={12} className="ml-auto text-muted" />
              </a>
              <a
                href={meta.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-xl border border-border/20 bg-surface/20 p-3 text-sm text-foreground transition-colors hover:border-accent/30 hover:text-accent"
              >
                <Code2 size={16} className="shrink-0 text-muted" />
                <span className="text-xs">GitHub</span>
                <ArrowUpRight size={12} className="ml-auto text-muted" />
              </a>
              <a
                href={meta.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-xl border border-border/20 bg-surface/20 p-3 text-sm text-foreground transition-colors hover:border-accent/30 hover:text-accent"
              >
                <AtSign size={16} className="shrink-0 text-muted" />
                <span className="text-xs">X / Twitter</span>
                <ArrowUpRight size={12} className="ml-auto text-muted" />
              </a>
            </div>
          </BentoCard>

        </div>
      </div>

      {/* ── Footer ── */}
      <footer className="border-t border-border/30 py-6 text-center text-xs text-muted">
        © {new Date().getFullYear()} {profile.name}. {t(ui.all_rights_reserved)}.
      </footer>
    </div>
  );
}
