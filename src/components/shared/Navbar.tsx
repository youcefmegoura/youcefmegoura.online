'use client';

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { LangToggle } from './LangToggle';

interface NavItem {
  label: string;
  href: string;
}

interface NavbarProps {
  navItems: NavItem[];
  variant?: 'default' | 'dark' | 'transparent';
}

const variantStyles = {
  default: 'bg-background/80 border-b border-border',
  dark: 'bg-card/90 border-b border-border',
  transparent: 'bg-transparent',
};

export function Navbar({ navItems, variant = 'default' }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md transition-all duration-300 ${
        variantStyles[variant]
      } ${scrolled ? 'shadow-sm' : ''}`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Desktop nav links */}
          <ul className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="px-3 py-2 text-sm font-medium text-muted hover:text-foreground transition-colors duration-200 rounded-md hover:bg-surface"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Right side controls */}
          <div className="flex items-center gap-2">
            <LangToggle />
            <ThemeToggle />

            {/* Mobile hamburger */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              className="md:hidden p-2 rounded-md text-foreground hover:bg-surface transition-colors"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-md">
          <ul className="px-4 py-3 space-y-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2.5 text-sm font-medium text-muted hover:text-foreground hover:bg-surface rounded-md transition-colors duration-200"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
