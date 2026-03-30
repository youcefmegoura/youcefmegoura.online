import { Mail, Phone, Download } from 'lucide-react';
import type { Meta, UIStrings, LocalizedString } from '@/lib/types';
import { SectionHeading } from '@/components/shared/SectionHeading';

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function TwitterIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  );
}

interface ContactProps {
  meta: Meta;
  ui: UIStrings;
  t: (s: LocalizedString) => string;
}

const socialConfig = [
  { key: 'linkedin' as const, Icon: LinkedinIcon, label: 'LinkedIn', getHref: (s: Meta['social']) => s.linkedin },
  { key: 'github' as const, Icon: GithubIcon, label: 'GitHub', getHref: (s: Meta['social']) => s.github },
  { key: 'twitter' as const, Icon: TwitterIcon, label: 'Twitter', getHref: (s: Meta['social']) => s.twitter },
  { key: 'email' as const, Icon: Mail, label: 'Email', getHref: (s: Meta['social']) => `mailto:${s.email}` },
  { key: 'phone' as const, Icon: Phone, label: 'Phone', getHref: (s: Meta['social']) => `tel:${s.phone}` },
];

export function Contact({ meta, ui, t }: ContactProps) {
  return (
    <section id="contact" className="py-20 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto text-center">
        <SectionHeading title={t(ui.contact)} />

        {/* Social links */}
        <div className="flex flex-wrap justify-center gap-4 mt-8">
          {socialConfig.map(({ key, Icon, label, getHref }) => {
            const isExternal = key !== 'email' && key !== 'phone';
            return (
              <a
                key={key}
                href={getHref(meta.social)}
                target={isExternal ? '_blank' : undefined}
                rel={isExternal ? 'noopener noreferrer' : undefined}
                className="flex flex-col items-center gap-2 p-4 rounded-xl bg-card border border-border hover:border-accent hover:shadow-md transition-all duration-200 w-24"
              >
                <Icon className="w-6 h-6 text-accent" />
                <span className="text-xs font-medium text-muted">{label}</span>
              </a>
            );
          })}
        </div>

        {/* Download CV CTA */}
        <div className="mt-12">
          <a
            href={meta.cv_download_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-accent text-accent-foreground font-semibold rounded-lg hover:bg-accent-hover transition-colors duration-200 shadow-md"
          >
            <Download className="w-5 h-5" />
            {t(ui.download_cv)}
          </a>
        </div>
      </div>
    </section>
  );
}
