'use client';

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { Locale, LocalizedString } from './types';

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (localizedString: LocalizedString) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children, defaultLocale = 'fr' }: { children: ReactNode; defaultLocale?: Locale }) {
  const [locale, setLocaleState] = useState<Locale>(() => {
    if (typeof window === 'undefined') return defaultLocale;
    const stored = localStorage.getItem('locale');
    return stored === 'fr' || stored === 'en' ? stored : defaultLocale;
  });

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem('locale', newLocale);
    document.documentElement.lang = newLocale;
  }, []);

  const t = useCallback((localizedString: LocalizedString) => {
    return localizedString[locale] || localizedString.fr;
  }, [locale]);

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}
export function useTranslation() {
  return useI18n().t;
}
