'use client';

import { useI18n } from '@/lib/i18n';

export function LangToggle() {
  const { locale, setLocale } = useI18n();

  const targetLocale = locale === 'fr' ? 'en' : 'fr';

  return (
    <button
      onClick={() => setLocale(targetLocale)}
      aria-label={`Switch to ${targetLocale === 'fr' ? 'French' : 'English'}`}
      className="px-3 py-1.5 text-sm font-semibold rounded-full border border-border text-foreground hover:bg-surface transition-colors duration-200 uppercase tracking-wide"
    >
      {targetLocale.toUpperCase()}
    </button>
  );
}
