'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Globe, Terminal, Menu, X } from 'lucide-react';

interface V3NavbarProps {
  locale: string;
  onToggleLocale: () => void;
  theme: string;
  onToggleTheme: () => void;
}

const NAV_ITEMS = [
  { id: 'about', label: '// about' },
  { id: 'skills', label: '// skills' },
  { id: 'experience', label: '// exp' },
  { id: 'projects', label: '// projects' },
  { id: 'contact', label: '// contact' },
];

export function V3Navbar({
  locale,
  onToggleLocale,
  theme,
  onToggleTheme,
}: V3NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleToggleMenu = useCallback(() => {
    setMenuOpen((prev) => !prev);
  }, []);

  const handleNavClick = useCallback(() => {
    setMenuOpen(false);
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed inset-x-0 top-0 z-50 border-b border-zinc-800/80 bg-zinc-950/90 backdrop-blur-xl"
      aria-label="Main navigation"
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-3">
        <a href="#hero" className="group flex items-center gap-2">
          <Terminal className="h-4 w-4 text-cyan-400" />
          <span className="text-sm font-medium text-zinc-400 transition-colors group-hover:text-cyan-400">
            ~/youcefmegoura
          </span>
        </a>

        {/* Desktop nav */}
        <div className="hidden items-center gap-5 md:flex">
          {NAV_ITEMS.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              className="text-xs text-zinc-500 transition-colors hover:text-cyan-400"
            >
              {n.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={onToggleLocale}
            className="rounded-md p-2 text-zinc-500 transition-colors hover:bg-zinc-800 hover:text-zinc-300"
            aria-label={`Switch to ${locale === 'fr' ? 'English' : 'French'}`}
          >
            <Globe className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={onToggleTheme}
            className="rounded-md p-2 text-zinc-500 transition-colors hover:bg-zinc-800 hover:text-zinc-300"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? (
              <Sun className="h-3.5 w-3.5" />
            ) : (
              <Moon className="h-3.5 w-3.5" />
            )}
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={handleToggleMenu}
            className="rounded-md p-2 text-zinc-500 transition-colors hover:bg-zinc-800 hover:text-zinc-300 md:hidden"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? (
              <X className="h-4 w-4" />
            ) : (
              <Menu className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-zinc-800/50 md:hidden"
          >
            <div className="flex flex-col gap-1 px-5 py-4">
              {NAV_ITEMS.map((n) => (
                <a
                  key={n.id}
                  href={`#${n.id}`}
                  onClick={handleNavClick}
                  className="rounded-md px-3 py-2 font-mono text-sm text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-cyan-400"
                >
                  {n.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
