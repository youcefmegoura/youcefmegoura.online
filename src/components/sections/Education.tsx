import { MapPin, Calendar, GraduationCap } from 'lucide-react';
import type { Education as EducationType, UIStrings, LocalizedString } from '@/lib/types';
import { SectionHeading } from '@/components/shared/SectionHeading';

interface EducationProps {
  education: EducationType[];
  ui: UIStrings;
  t: (s: LocalizedString) => string;
}

export function Education({ education, ui, t }: EducationProps) {
  return (
    <section id="education" className="py-20 px-4 sm:px-6 bg-surface">
      <div className="max-w-4xl mx-auto">
        <SectionHeading title={t(ui.education)} />

        <div className="grid gap-6">
          {education.map((item) => (
            <div
              key={item.id}
              className={`bg-card rounded-xl border shadow-sm transition-shadow hover:shadow-md ${
                item.primary
                  ? 'border-accent/40 ring-1 ring-accent/20 p-6 sm:p-8'
                  : 'border-border p-5 sm:p-6'
              }`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`p-2.5 rounded-lg shrink-0 ${
                    item.primary
                      ? 'bg-accent/10 text-accent'
                      : 'bg-surface text-muted'
                  }`}
                >
                  <GraduationCap className={item.primary ? 'w-6 h-6' : 'w-5 h-5'} />
                </div>

                <div className="flex-1 min-w-0">
                  <h3
                    className={`font-bold text-foreground ${
                      item.primary ? 'text-lg sm:text-xl' : 'text-base'
                    }`}
                  >
                    {t(item.degree)}
                  </h3>
                  <p className="text-accent font-semibold text-sm mt-0.5">
                    {t(item.school)}
                  </p>
                  <p className="text-muted text-sm">{t(item.faculty)}</p>

                  <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-muted">
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {item.period.start} – {item.period.end}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      {item.location}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
