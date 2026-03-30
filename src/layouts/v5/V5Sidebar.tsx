'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation, useI18n } from '@/lib/i18n';
import { useTheme } from '@/lib/theme';
import type { SiteData } from '@/lib/types';
import {
  Home, Briefcase, FolderOpen, Mail, Sun, Moon, Languages,
  Link2, Code2, MapPin, Menu, X, AtSign,
} from 'lucide-react';
import { useState } from 'react';

interface Props {
  data: SiteData;
}

const navItems = [
  { href: '/5', icon: Home, labelKey: 'about' },
  { href: '/5/experience', icon: Briefcase, labelKey: 'experience' },
  { href: '/5/projects', icon: FolderOpen, labelKey: 'projects' },
  { href: '/5/contact', icon: Mail, labelKey: 'contact' },
];

export default function V5Sidebar({ data }: Props) {
  const pathname = usePathname();
  const t = useTranslation();
  const { locale, setLocale } = useI18n();
  const { theme, toggleTheme } = useTheme();
  const { profile, meta, ui } = data;
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === '/5') return pathname === '/5';
    return pathname.startsWith(href);
  };

  const sidebarContent = (
    <div className="flex h-full flex-col">
      {/* Profile */}
      <div className="px-6 pb-6 pt-8">
        <Link href="/5" onClick={() => setMobileOpen(false)}>
          <div className="mx-auto h-24 w-24 overflow-hidden rounded-full border-2 border-accent/30 shadow-lg">
            <img
              src={profile.photo}
              alt={profile.name}
              className="h-full w-full object-cover"
            />
          </div>
        </Link>
        <h1 className="mt-4 text-center text-lg font-bold tracking-tight text-foreground">
          {profile.name}
        </h1>
        <p className="mt-1 text-center text-xs text-accent font-medium">
          {t(profile.title)}
        </p>
        <div className="mt-2 flex items-center justify-center gap-1 text-xs text-muted">
          <MapPin size={12} />
          {profile.location}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const active = isActive(item.href);
            const Icon = item.icon;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200 ${
                    active
                      ? 'bg-accent text-accent-foreground shadow-sm'
                      : 'text-muted hover:bg-surface hover:text-foreground'
                  }`}
                >
                  <Icon size={18} />
                  {ui[item.labelKey] ? t(ui[item.labelKey]) : item.labelKey}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Controls */}
      <div className="border-t border-border/40 px-4 py-4">
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => setLocale(locale === 'fr' ? 'en' : 'fr')}
            className="flex items-center gap-1.5 rounded-lg border border-border/60 bg-surface/60 px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-surface"
          >
            <Languages size={14} />
            {locale === 'fr' ? 'EN' : 'FR'}
          </button>
          <button
            onClick={toggleTheme}
            className="flex items-center gap-1.5 rounded-lg border border-border/60 bg-surface/60 px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-surface"
          >
            {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
          </button>
        </div>
      </div>

      {/* Social Icons */}
      <div className="border-t border-border/40 px-6 py-4">
        <div className="flex items-center justify-center gap-4">
          <a
            href={meta.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted transition-colors hover:text-accent"
          >
            <Link2 size={18} />
          </a>
          <a
            href={meta.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted transition-colors hover:text-accent"
          >
            <Code2 size={18} />
          </a>
          <a
            href={meta.social.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted transition-colors hover:text-accent"
          >
            <AtSign size={18} />
          </a>
          <a
            href={`mailto:${meta.social.email}`}
            className="text-muted transition-colors hover:text-accent"
          >
            <Mail size={18} />
          </a>
        </div>
      </div>

      {/* Back to Home */}
      <div className="px-4 pb-6">
        <a
          href="/"
          className="block text-center text-[11px] text-muted/60 hover:text-muted transition-colors"
        >
          ← Home
        </a>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-72 border-r border-border/40 bg-card/90 backdrop-blur-xl lg:block">
        {sidebarContent}
      </aside>

      {/* Mobile Header */}
      <div className="fixed inset-x-0 top-0 z-50 flex items-center justify-between border-b border-border/40 bg-card/90 px-4 py-3 backdrop-blur-xl lg:hidden">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 overflow-hidden rounded-full border border-accent/30">
            <img src={profile.photo} alt={profile.name} className="h-full w-full object-cover" />
          </div>
          <span className="text-sm font-semibold text-foreground">{profile.name}</span>
        </div>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="rounded-lg p-2 text-foreground transition-colors hover:bg-surface"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile padding for fixed header */}
      <div className="h-14 lg:hidden" />

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 250 }}
              className="fixed inset-y-0 left-0 z-50 w-72 border-r border-border/40 bg-card lg:hidden"
            >
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
