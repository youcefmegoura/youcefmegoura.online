'use client';

import { createContext, useContext, useSyncExternalStore, useCallback, type ReactNode } from 'react';
import type { Locale, LocalizedString } from './types';

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (localizedString: LocalizedString) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

let localeListeners: (() => void)[] = [];

function subscribeLocale(listener: () => void) {
  localeListeners = [...localeListeners, listener];
  return () => {
    localeListeners = localeListeners.filter((l) => l !== listener);
  };
}

function getLocaleSnapshot(): Locale {
  const stored = localStorage.getItem('locale');
  return stored === 'fr' || stored === 'en' ? stored : 'fr';
}

function getLocaleServerSnapshot(): Locale {
  return 'fr';
}

function emitLocaleChange() {
  localeListeners.forEach((l) => l());
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const locale = useSyncExternalStore(subscribeLocale, getLocaleSnapshot, getLocaleServerSnapshot);

  const setLocale = useCallback((newLocale: Locale) => {
    localStorage.setItem('locale', newLocale);
    document.documentElement.lang = newLocale;
    emitLocaleChange();
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
