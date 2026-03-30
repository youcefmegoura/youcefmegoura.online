import { MapPin } from 'lucide-react';
import type { Profile, UIStrings } from '@/lib/types';
import type { LocalizedString } from '@/lib/types';
import { SectionHeading } from '@/components/shared/SectionHeading';

interface AboutProps {
  profile: Profile;
  ui: UIStrings;
  t: (s: LocalizedString) => string;
}

export function About({ profile, ui, t }: AboutProps) {
  const stats = [
    { value: `${profile.stats.years_experience}+`, label: t(ui.years_experience) },
    { value: `${profile.stats.clients}+`, label: t(ui.clients) },
    { value: `${profile.stats.projects}+`, label: t(ui.projects_count) },
  ];

  return (
    <section id="about" className="py-20 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <SectionHeading title={t(ui.about)} />

        {/* Summary */}
        <p className="text-foreground text-base sm:text-lg leading-relaxed text-center max-w-3xl mx-auto">
          {t(profile.summary)}
        </p>

        {/* Badges */}
        <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
          <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-surface text-foreground text-sm font-medium rounded-full border border-border">
            <MapPin className="w-4 h-4 text-accent" />
            {profile.location}
          </span>
          <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-accent/10 text-accent text-sm font-semibold rounded-full border border-accent/20">
            {t(profile.availability)}
          </span>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 mt-12 max-w-lg mx-auto">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl sm:text-4xl font-bold text-accent">{stat.value}</p>
              <p className="text-sm text-muted mt-1 capitalize">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
