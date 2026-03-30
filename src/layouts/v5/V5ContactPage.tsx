'use client';

import { motion } from 'framer-motion';
import { useTranslation } from '@/lib/i18n';
import type { SiteData } from '@/lib/types';
import {
  Mail, Phone, Link2, Code2, Download,
  MapPin, ExternalLink, ArrowUpRight, Globe, AtSign,
} from 'lucide-react';

interface Props {
  data: SiteData;
}

export default function V5ContactPage({ data }: Props) {
  const t = useTranslation();
  const { profile, meta, languages, certifications, education, ui } = data;

  const contactLinks = [
    {
      icon: Mail,
      label: 'Email',
      value: meta.social.email,
      href: `mailto:${meta.social.email}`,
    },
    {
      icon: Phone,
      label: t({ fr: 'Téléphone', en: 'Phone' }),
      value: meta.social.phone,
      href: `tel:${meta.social.phone}`,
    },
    {
      icon: Link2,
      label: 'LinkedIn',
      value: 'linkedin.com/in/youcefmegoura',
      href: meta.social.linkedin,
      external: true,
    },
    {
      icon: Code2,
      label: 'GitHub',
      value: 'github.com/YoucefMegoura',
      href: meta.social.github,
      external: true,
    },
    {
      icon: AtSign,
      label: 'X / Twitter',
      value: '@youcefmegoura',
      href: meta.social.twitter,
      external: true,
    },
  ];

  return (
    <div className="min-h-screen px-6 py-12 lg:px-16 lg:py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1
          className="text-3xl font-bold tracking-tight text-foreground md:text-4xl"
          style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
        >
          {t(ui.contact)}
        </h1>
        <p className="mt-2 text-muted">
          {t({ fr: "N'hésitez pas à me contacter", en: 'Feel free to get in touch' })}
        </p>
      </motion.div>

      <div className="mt-12 grid gap-8 lg:grid-cols-2">
        {/* ── Contact Info ── */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h2
            className="mb-6 text-xl font-bold text-foreground"
            style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
          >
            {t({ fr: 'Coordonnées', en: 'Contact Information' })}
          </h2>

          <div className="space-y-3">
            {contactLinks.map((link, i) => {
              const Icon = link.icon;
              return (
                <a
                  key={i}
                  href={link.href}
                  target={link.external ? '_blank' : undefined}
                  rel={link.external ? 'noopener noreferrer' : undefined}
                  className="group flex items-center gap-4 rounded-2xl border border-border/40 bg-card/50 p-4 transition-all hover:border-accent/30 hover:shadow-md"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                    <Icon size={20} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-medium text-muted">{link.label}</p>
                    <p className="truncate text-sm font-medium text-foreground group-hover:text-accent transition-colors">
                      {link.value}
                    </p>
                  </div>
                  {link.external && (
                    <ArrowUpRight size={16} className="shrink-0 text-muted group-hover:text-accent transition-colors" />
                  )}
                </a>
              );
            })}
          </div>

          {/* Location */}
          <div className="mt-6 rounded-2xl border border-border/40 bg-card/50 p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-surface text-accent">
                <MapPin size={20} />
              </div>
              <div>
                <p className="text-xs font-medium text-muted">
                  {t({ fr: 'Localisation', en: 'Location' })}
                </p>
                <p className="text-sm font-medium text-foreground">{profile.location}</p>
              </div>
            </div>
          </div>

          {/* Download CV */}
          <div className="mt-6 flex gap-3">
            <a
              href={meta.cv_download_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-medium text-accent-foreground shadow-sm transition-colors hover:bg-accent-hover"
            >
              <Download size={16} />
              {t(ui.download_cv)}
            </a>
            <a
              href={meta.detailed_experience_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-surface"
            >
              <ExternalLink size={16} />
              {t(ui.detailed_experience)}
            </a>
          </div>
        </motion.section>

        {/* ── Right Column: Languages, Education, Certifications ── */}
        <div className="space-y-8">
          {/* Languages */}
          <motion.section
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <h2
              className="mb-4 text-xl font-bold text-foreground"
              style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
            >
              {t(ui.languages)}
            </h2>
            <div className="space-y-3">
              {languages.map((lang, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 rounded-2xl border border-border/40 bg-card/50 p-4"
                >
                  <span className="text-3xl">{lang.flag}</span>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">
                      {t(lang.language)}
                    </h3>
                    <p className="text-xs text-muted">{t(lang.level)}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Education */}
          <motion.section
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <h2
              className="mb-4 text-xl font-bold text-foreground"
              style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
            >
              {t(ui.education)}
            </h2>
            <div className="space-y-3">
              {education.map((edu) => (
                <div
                  key={edu.id}
                  className="rounded-2xl border border-border/40 bg-card/50 p-4"
                >
                  <h3 className="text-sm font-bold text-foreground">{t(edu.degree)}</h3>
                  <p className="mt-1 text-xs font-medium text-accent">{t(edu.school)}</p>
                  <p className="text-xs text-muted">{t(edu.faculty)}</p>
                  <div className="mt-2 flex items-center gap-3 text-[11px] text-muted">
                    <span>{edu.period.start} – {edu.period.end}</span>
                    <span>· {edu.location}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Certifications */}
          {certifications.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <h2
                className="mb-4 text-xl font-bold text-foreground"
                style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
              >
                {t(ui.certifications)}
              </h2>
              <div className="space-y-3">
                {certifications.map((cert, i) => (
                  <div
                    key={i}
                    className="rounded-2xl border border-border/40 bg-card/50 p-4"
                  >
                    <h3 className="text-sm font-bold text-foreground">{cert.title}</h3>
                    <p className="mt-0.5 text-xs text-accent font-medium">{cert.issuer}</p>
                    <p className="mt-1 text-xs text-muted">{t(cert.description)}</p>
                    {cert.date && (
                      <p className="mt-1 text-[11px] text-muted/70">{cert.date}</p>
                    )}
                  </div>
                ))}
              </div>
            </motion.section>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-20 border-t border-border/30 pt-6 text-center text-xs text-muted">
        © {new Date().getFullYear()} {profile.name}. {t(ui.all_rights_reserved)}.
      </footer>
    </div>
  );
}
