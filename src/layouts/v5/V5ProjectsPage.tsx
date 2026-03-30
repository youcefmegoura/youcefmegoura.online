'use client';

import { motion } from 'framer-motion';
import { useTranslation } from '@/lib/i18n';
import type { SiteData } from '@/lib/types';
import { Code, Palette, ExternalLink, ArrowUpRight } from 'lucide-react';

interface Props {
  data: SiteData;
}

export default function V5ProjectsPage({ data }: Props) {
  const t = useTranslation();
  const { projects, ui } = data;

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
          {t(ui.projects)}
        </h1>
        <p className="mt-2 text-muted">
          {t({ fr: 'Projets de développement et de design graphique', en: 'Development and graphic design projects' })}
        </p>
      </motion.div>

      {/* ── Development Projects ── */}
      <section className="mt-12">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="mb-6 flex items-center gap-2 text-xl font-bold text-foreground"
          style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
        >
          <Code size={20} className="text-accent" />
          {t(ui.development)}
        </motion.h2>

        <div className="grid gap-6 sm:grid-cols-2">
          {projects.dev.map((project, index) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index + 0.3, duration: 0.5, ease: 'easeOut' }}
              className="group overflow-hidden rounded-2xl border border-border/40 bg-card/50 transition-all hover:border-accent/30 hover:shadow-lg"
            >
              {/* Project image */}
              <div className="relative aspect-video overflow-hidden bg-surface">
                <img
                  src={project.image}
                  alt={t(project.title)}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute right-3 top-3 rounded-full bg-white/90 p-2 opacity-0 shadow-sm transition-all group-hover:opacity-100 hover:bg-white"
                  >
                    <ArrowUpRight size={16} className="text-foreground" />
                  </a>
                )}
              </div>

              {/* Project info */}
              <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-base font-bold text-foreground group-hover:text-accent transition-colors">
                    {t(project.title)}
                  </h3>
                  <span className="shrink-0 rounded-md bg-accent/10 px-2 py-0.5 text-[11px] font-medium text-accent">
                    {project.type === 'professional'
                      ? t({ fr: 'Pro', en: 'Pro' })
                      : t({ fr: 'Perso', en: 'Personal' })}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {t(project.description)}
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md bg-surface px-2 py-0.5 text-[11px] font-medium text-muted"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-accent hover:underline"
                  >
                    <ExternalLink size={12} />
                    {t({ fr: 'Voir le projet', en: 'View project' })}
                  </a>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* ── Design Projects ── */}
      {projects.design.length > 0 && (
        <section className="mt-16">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.4 }}
            className="mb-6 flex items-center gap-2 text-xl font-bold text-foreground"
            style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
          >
            <Palette size={20} className="text-accent" />
            {t(ui.design)}
          </motion.h2>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {projects.design.map((project, index) => (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index + 0.5, duration: 0.5, ease: 'easeOut' }}
                className="group overflow-hidden rounded-2xl border border-border/40 bg-card/50 transition-all hover:border-accent/30 hover:shadow-lg"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-surface">
                  <img
                    src={project.image}
                    alt={t(project.title)}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-bold text-foreground group-hover:text-accent transition-colors">
                    {t(project.title)}
                  </h3>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {project.tools.map((tool) => (
                      <span
                        key={tool}
                        className="rounded-md bg-surface px-2 py-0.5 text-[11px] font-medium text-muted"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="mt-20 border-t border-border/30 pt-6 text-center text-xs text-muted">
        © {new Date().getFullYear()} {data.profile.name}. {t(ui.all_rights_reserved)}.
      </footer>
    </div>
  );
}
