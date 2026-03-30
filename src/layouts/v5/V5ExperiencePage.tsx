'use client';

import { motion } from 'framer-motion';
import { useTranslation } from '@/lib/i18n';
import type { SiteData } from '@/lib/types';
import { Calendar, MapPin, Briefcase, ChevronRight } from 'lucide-react';

interface Props {
  data: SiteData;
}

export default function V5ExperiencePage({ data }: Props) {
  const t = useTranslation();
  const { experience, ui } = data;

  const formatPeriod = (start: string, end: string | null) => {
    const s = start.includes('-') ? start.slice(0, 7) : start;
    const e = end ? (end.includes('-') ? end.slice(0, 7) : end) : t(ui.present);
    return `${s} — ${e}`;
  };

  const typeLabels: Record<string, { fr: string; en: string }> = {
    'full-time': { fr: 'CDI', en: 'Full-time' },
    'part-time': { fr: 'Temps partiel', en: 'Part-time' },
    freelance: { fr: 'Freelance', en: 'Freelance' },
    contract: { fr: 'CDD', en: 'Contract' },
  };

  return (
    <div className="min-h-screen px-6 py-12 lg:px-16 lg:py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1
          className="text-3xl font-bold tracking-tight text-foreground md:text-4xl"
          style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
        >
          {t(ui.experience)}
        </h1>
        <p className="mt-2 text-muted">
          {t({ fr: 'Parcours professionnel complet', en: 'Complete professional journey' })}
        </p>
      </motion.div>

      <div className="relative mt-12">
        {/* Timeline line */}
        <div className="absolute left-[19px] top-2 bottom-2 hidden w-px bg-border/60 md:block" />

        <div className="space-y-8">
          {experience.map((exp, index) => (
            <motion.article
              key={exp.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5, ease: 'easeOut' }}
              className="relative md:pl-12"
            >
              {/* Timeline dot */}
              <div className="absolute left-3 top-3 hidden h-3 w-3 rounded-full border-2 border-accent bg-background md:block" />

              <div className="rounded-2xl border border-border/40 bg-card/50 p-6 md:p-8 transition-colors hover:border-accent/20">
                {/* Header */}
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-foreground">
                      {t(exp.role)}
                    </h2>
                    <p className="mt-1 text-base font-medium text-accent">
                      {t(exp.company)}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-sm text-muted">
                    <span className="inline-flex items-center gap-1.5 rounded-lg bg-surface px-2.5 py-1 text-xs font-medium">
                      <Calendar size={12} />
                      {formatPeriod(exp.period.start, exp.period.end)}
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-lg bg-surface px-2.5 py-1 text-xs font-medium">
                      <MapPin size={12} />
                      {exp.location}
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-lg bg-accent/10 px-2.5 py-1 text-xs font-medium text-accent">
                      <Briefcase size={12} />
                      {t(typeLabels[exp.type] || { fr: exp.type, en: exp.type })}
                    </span>
                  </div>
                </div>

                {/* Summary */}
                <p className="mt-4 text-sm leading-relaxed text-foreground/80">
                  {t(exp.short)}
                </p>

                {/* Detailed description */}
                <div className="mt-4 rounded-xl bg-surface/40 p-4">
                  <div className="whitespace-pre-line text-sm leading-relaxed text-foreground/70">
                    {t(exp.detailed)}
                  </div>
                </div>

                {/* Tech stack */}
                <div className="mt-5">
                  <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted">
                    Tech Stack
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {exp.environment.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md bg-surface px-2.5 py-1 text-xs font-medium text-muted transition-colors hover:text-accent hover:bg-accent/10"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-20 border-t border-border/30 pt-6 text-center text-xs text-muted">
        © {new Date().getFullYear()} {data.profile.name}. {t(ui.all_rights_reserved)}.
      </footer>
    </div>
  );
}
