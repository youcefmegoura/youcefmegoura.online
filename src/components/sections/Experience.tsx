'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, MapPin, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Experience as ExperienceType, UIStrings, LocalizedString } from '@/lib/types';
import { useTranslation } from '@/lib/i18n';
import { SectionHeading } from '@/components/shared/SectionHeading';

interface ExperienceProps {
  experience: ExperienceType[];
  ui: UIStrings;
}

function ExperienceCard({
  item,
  ui,
  side,
}: {
  item: ExperienceType;
  ui: UIStrings;
  side: 'left' | 'right';
}) {
  const [expanded, setExpanded] = useState(false);
  const t = useTranslation();

  const period = `${item.period.start} – ${item.period.end ?? t(ui.present)}`;

  return (
    <div
      className={`flex items-start gap-4 md:gap-8 ${
        side === 'right' ? 'md:flex-row-reverse' : ''
      }`}
    >
      {/* Card */}
      <div className="flex-1 bg-card rounded-xl p-5 sm:p-6 border border-border shadow-sm hover:shadow-md transition-shadow duration-200">
        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-bold text-foreground">{t(item.role)}</h3>
          <p className="text-accent font-semibold text-sm">{t(item.company)}</p>
          <div className="flex flex-wrap items-center gap-3 text-xs text-muted mt-1">
            <span className="inline-flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {period}
            </span>
            <span className="inline-flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" />
              {item.location}
            </span>
          </div>
        </div>

        <p className="text-foreground text-sm mt-3 leading-relaxed">
          {t(item.short)}
        </p>

        {/* Environment tags */}
        <div className="flex flex-wrap gap-1.5 mt-4">
          {item.environment.map((env) => (
            <span
              key={env}
              className="px-2 py-0.5 text-xs font-medium bg-surface text-muted rounded-md border border-border"
            >
              {env}
            </span>
          ))}
        </div>

        {/* Expand / Collapse */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="inline-flex items-center gap-1 mt-4 text-sm font-medium text-accent hover:text-accent-hover transition-colors"
        >
          {expanded ? (
            <>
              {t(ui.hide_details)} <ChevronUp className="w-4 h-4" />
            </>
          ) : (
            <>
              {t(ui.see_details)} <ChevronDown className="w-4 h-4" />
            </>
          )}
        </button>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className="pt-4 border-t border-border mt-4 text-sm text-foreground leading-relaxed whitespace-pre-line">
                {t(item.detailed)}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Timeline dot */}
      <div className="hidden md:flex flex-col items-center">
        <div className="w-3.5 h-3.5 rounded-full bg-accent border-2 border-background shadow" />
        <div className="w-px flex-1 bg-border" />
      </div>

      {/* Spacer for alternate layout */}
      <div className="hidden md:block flex-1" />
    </div>
  );
}

export function Experience({ experience, ui }: ExperienceProps) {
  const t = useTranslation();

  return (
    <section id="experience" className="py-20 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <SectionHeading title={t(ui.experience)} />

        <div className="relative space-y-8">
          {/* Vertical timeline line (desktop only) */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2" />

          {experience.map((item, index) => (
            <ExperienceCard
              key={item.id}
              item={item}
              ui={ui}
              side={index % 2 === 0 ? 'left' : 'right'}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
