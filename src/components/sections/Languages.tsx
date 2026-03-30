import type { Language as LanguageType, UIStrings, LocalizedString } from '@/lib/types';
import { SectionHeading } from '@/components/shared/SectionHeading';

interface LanguagesProps {
  languages: LanguageType[];
  ui: UIStrings;
  t: (s: LocalizedString) => string;
}

export function Languages({ languages, ui, t }: LanguagesProps) {
  return (
    <section id="languages" className="py-20 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <SectionHeading title={t(ui.languages)} />

        <div className="flex flex-wrap justify-center gap-4">
          {languages.map((lang) => (
            <div
              key={t(lang.language)}
              className="inline-flex items-center gap-3 px-5 py-3 bg-card rounded-xl border border-border shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <span className="text-2xl" role="img" aria-label={t(lang.language)}>
                {lang.flag}
              </span>
              <div>
                <p className="text-sm font-semibold text-foreground">{t(lang.language)}</p>
                <p className="text-xs text-muted">{t(lang.level)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
