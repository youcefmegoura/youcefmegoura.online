import { Mail, Phone } from 'lucide-react';
import type { LocalizedString } from '@/lib/types';

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

interface FooterProps {
  social: {
    linkedin: string;
    github: string;
    twitter: string;
    email: string;
    phone: string;
  };
  name: string;
  t: (s: LocalizedString) => string;
  ui: { all_rights_reserved: LocalizedString };
}

const socialIcons = [
  { key: 'linkedin' as const, Icon: LinkedinIcon, href: (s: FooterProps['social']) => s.linkedin },
  { key: 'github' as const, Icon: GithubIcon, href: (s: FooterProps['social']) => s.github },
  { key: 'twitter' as const, Icon: TwitterIcon, href: (s: FooterProps['social']) => s.twitter },
  { key: 'email' as const, Icon: Mail, href: (s: FooterProps['social']) => `mailto:${s.email}` },
  { key: 'phone' as const, Icon: Phone, href: (s: FooterProps['social']) => `tel:${s.phone}` },
];

export function Footer({ social, name, t, ui }: FooterProps) {
  return (
    <footer className="border-t border-border bg-card py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col items-center gap-6">
        {/* Social links */}
        <div className="flex items-center gap-4">
          {socialIcons.map(({ key, Icon, href }) => (
            <a
              key={key}
              href={href(social)}
              target={key === 'email' || key === 'phone' ? undefined : '_blank'}
              rel={key === 'email' || key === 'phone' ? undefined : 'noopener noreferrer'}
              aria-label={key}
              className="p-2.5 rounded-full text-muted hover:text-accent hover:bg-surface transition-colors duration-200"
            >
              <Icon className="w-5 h-5" />
            </a>
          ))}
        </div>

        {/* Copyright */}
        <p className="text-sm text-muted">
          &copy; {new Date().getFullYear()} {name}. {t(ui.all_rights_reserved)}.
        </p>
      </div>
    </footer>
  );
}
