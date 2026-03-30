import type { SkillCategory, UIStrings, LocalizedString } from '@/lib/types';
import { SectionHeading } from '@/components/shared/SectionHeading';

interface SkillsProps {
  skills: SkillCategory[];
  ui: UIStrings;
  t: (s: LocalizedString) => string;
  variant?: 'chips' | 'progress-bars';
}

export function Skills({ skills, ui, t, variant = 'chips' }: SkillsProps) {
  return (
    <section id="skills" className="py-20 px-4 sm:px-6 bg-surface">
      <div className="max-w-5xl mx-auto">
        <SectionHeading title={t(ui.skills)} />

        <div className="grid gap-8 sm:grid-cols-2">
          {skills.map((category) => (
            <div
              key={t(category.category)}
              className="bg-card rounded-xl p-6 border border-border shadow-sm"
            >
              <h3 className="text-lg font-semibold text-foreground mb-4">
                {t(category.category)}
              </h3>

              {variant === 'chips' ? (
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 text-sm font-medium bg-surface text-foreground rounded-full border border-border hover:border-accent hover:text-accent transition-colors duration-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              ) : (
                <div className="space-y-3">
                  {category.skills.map((skill) => (
                    <div key={skill}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-foreground">{skill}</span>
                      </div>
                      <div className="w-full h-2 bg-surface rounded-full overflow-hidden">
                        <div
                          className="h-full bg-accent rounded-full transition-all duration-700"
                          style={{ width: '85%' }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
