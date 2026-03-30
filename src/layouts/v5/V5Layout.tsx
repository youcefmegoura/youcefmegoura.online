'use client';

import { motion } from 'framer-motion';
import { useTranslation } from '@/lib/i18n';
import type { SiteData } from '@/lib/types';
import {
  Download, ExternalLink, MapPin, Code, ChevronRight,
} from 'lucide-react';
import Link from 'next/link';

interface Props {
  data: SiteData;
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: 'easeOut' as const },
  }),
};

export default function V5Layout({ data }: Props) {
  const t = useTranslation();
  const { profile, skills, meta, ui } = data;

  return (
    <div className="min-h-screen px-6 py-12 lg:px-20 lg:py-20 xl:px-28">
      {/* ── Hero Section ── */}
      <motion.section
        initial="hidden"
        animate="visible"
        className="mb-20"
      >
        <motion.div custom={0} variants={fadeUp}>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
            {t(profile.availability)}
          </div>
        </motion.div>

        <motion.h1
          custom={1}
          variants={fadeUp}
          className="text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl"
          style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
        >
          {t(profile.title)}
        </motion.h1>

        <motion.p
          custom={2}
          variants={fadeUp}
          className="mt-4 max-w-2xl text-lg leading-relaxed text-muted"
        >
          {t(profile.tagline)}
        </motion.p>

        <motion.div custom={3} variants={fadeUp} className="mt-8 flex flex-wrap gap-6">
          {[
            { value: profile.stats.years_experience, label: ui.years_experience },
            { value: profile.stats.clients, label: ui.clients },
            { value: profile.stats.projects, label: ui.projects_count },
          ].map((stat, i) => (
            <div key={i}>
              <span className="text-3xl font-bold text-accent">{stat.value}+</span>
              <span className="ml-1.5 text-sm text-muted">{t(stat.label)}</span>
            </div>
          ))}
        </motion.div>

        <motion.div custom={4} variants={fadeUp} className="mt-8 flex gap-3">
          <a
            href={meta.cv_download_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground shadow-sm transition-colors hover:bg-accent-hover"
          >
            <Download size={16} />
            {t(ui.download_cv)}
          </a>
          <a
            href={meta.detailed_experience_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-surface"
          >
            <ExternalLink size={16} />
            {t(ui.detailed_experience)}
          </a>
        </motion.div>
      </motion.section>

      {/* ── About Section ── */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="mb-20"
      >
        <h2
          className="mb-6 text-2xl font-bold tracking-tight text-foreground"
          style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
        >
          {t(ui.about)}
        </h2>
        <div className="max-w-3xl rounded-2xl border border-border/40 bg-card/50 p-6 md:p-8">
          <p className="leading-relaxed text-foreground/80">
            {t(profile.summary)}
          </p>
          <div className="mt-4 flex items-center gap-1.5 text-sm text-muted">
            <MapPin size={14} className="text-accent" />
            {profile.location}
          </div>
        </div>
      </motion.section>

      {/* ── Skills Section ── */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="mb-20"
      >
        <div className="mb-6 flex items-center justify-between">
          <h2
            className="text-2xl font-bold tracking-tight text-foreground"
            style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
          >
            {t(ui.skills)}
          </h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((cat, i) => (
            <div
              key={i}
              className="rounded-2xl border border-border/40 bg-card/50 p-5"
            >
              <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
                <Code size={14} className="text-accent" />
                {t(cat.category)}
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-md bg-surface px-2.5 py-1 text-xs font-medium text-muted"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* ── Quick Links ── */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { href: '/5/experience', label: ui.experience, desc: { fr: 'Parcours professionnel détaillé', en: 'Detailed career journey' } },
            { href: '/5/projects', label: ui.projects, desc: { fr: 'Projets de développement et design', en: 'Development and design projects' } },
            { href: '/5/contact', label: ui.contact, desc: { fr: 'Informations de contact', en: 'Contact information' } },
          ].map((link, i) => (
            <Link
              key={i}
              href={link.href}
              className="group flex items-center justify-between rounded-2xl border border-border/40 bg-card/50 p-5 transition-all hover:border-accent/40 hover:shadow-lg"
            >
              <div>
                <h3 className="text-sm font-semibold text-foreground group-hover:text-accent transition-colors">
                  {t(link.label)}
                </h3>
                <p className="mt-1 text-xs text-muted">{t(link.desc)}</p>
              </div>
              <ChevronRight size={18} className="text-muted group-hover:text-accent transition-colors" />
            </Link>
          ))}
        </div>
      </motion.section>

      {/* ── Footer ── */}
      <footer className="mt-20 border-t border-border/30 pt-6 text-center text-xs text-muted">
        © {new Date().getFullYear()} {profile.name}. {t(ui.all_rights_reserved)}.
      </footer>
    </div>
  );
}
