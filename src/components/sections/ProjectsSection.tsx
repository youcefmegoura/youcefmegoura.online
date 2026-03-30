'use client';

import { useState } from 'react';
import { ExternalLink } from 'lucide-react';
import type { Projects, UIStrings, LocalizedString } from '@/lib/types';
import { useTranslation } from '@/lib/i18n';
import { SectionHeading } from '@/components/shared/SectionHeading';

interface ProjectsSectionProps {
  projects: Projects;
  ui: UIStrings;
}

export function ProjectsSection({ projects, ui }: ProjectsSectionProps) {
  const t = useTranslation();
  const [activeTab, setActiveTab] = useState<'dev' | 'design'>('dev');

  const tabs = [
    { key: 'dev' as const, label: t(ui.development) },
    { key: 'design' as const, label: t(ui.design) },
  ];

  return (
    <section id="projects" className="py-20 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <SectionHeading title={t(ui.projects)} />

        {/* Tab switcher */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex bg-surface rounded-lg p-1 border border-border">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-5 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                  activeTab === tab.key
                    ? 'bg-accent text-accent-foreground shadow-sm'
                    : 'text-muted hover:text-foreground'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Dev projects */}
        {activeTab === 'dev' && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.dev.map((project) => (
              <div
                key={project.id}
                className="bg-card rounded-xl border border-border overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col"
              >
                {/* Image placeholder */}
                <div className="aspect-video bg-surface flex items-center justify-center overflow-hidden">
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={t(project.title)}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-muted text-sm">No preview</div>
                  )}
                </div>

                <div className="p-5 flex flex-col flex-1">
                  <h3 className="text-base font-bold text-foreground">
                    {t(project.title)}
                  </h3>
                  <p className="text-sm text-muted mt-2 leading-relaxed flex-1">
                    {t(project.description)}
                  </p>

                  {/* Tech tags */}
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 text-xs font-medium bg-surface text-muted rounded-md border border-border"
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
                      className="inline-flex items-center gap-1 mt-4 text-sm font-medium text-accent hover:text-accent-hover transition-colors"
                    >
                      View project <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Design projects */}
        {activeTab === 'design' && (
          <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
            {projects.design.map((project) => (
              <div
                key={project.id}
                className="group relative aspect-square bg-surface rounded-xl border border-border overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                {project.image ? (
                  <img
                    src={project.image}
                    alt={t(project.title)}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-muted text-sm">
                    No preview
                  </div>
                )}

                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                  <div>
                    <p className="text-white text-sm font-semibold">{t(project.title)}</p>
                    <p className="text-white/70 text-xs mt-0.5">
                      {project.tools.join(' · ')}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
