'use client';

import { useCallback } from 'react';
import { ArrowUp } from 'lucide-react';
import type { UIStrings, LocalizedString } from '@/lib/types';

interface V3FooterProps {
  name: string;
  ui: UIStrings;
  t: (s: LocalizedString) => string;
}

export function Footer({ name, ui, t }: V3FooterProps) {
  const handleScrollTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <footer className="border-t border-zinc-200/50 dark:border-zinc-800/50 py-8" role="contentinfo">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-5 sm:flex-row">
        <p className="font-mono text-xs text-zinc-400 dark:text-zinc-600">
          <span className="text-green-500">$</span> echo &quot;©{' '}
          {new Date().getFullYear()} {name}. {t(ui.all_rights_reserved)}
          .&quot;
        </p>
        <button
          onClick={handleScrollTop}
          className="inline-flex items-center gap-1.5 font-mono text-xs text-zinc-400 dark:text-zinc-600 transition-colors hover:text-cyan-400"
          aria-label="Scroll to top"
        >
          <ArrowUp className="h-3 w-3" />
          cd ~/top
        </button>
      </div>
    </footer>
  );
}
