'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView, AnimatePresence } from 'framer-motion';
import { useI18n } from '@/lib/i18n';
import { useTheme } from '@/lib/theme';
import type { SiteData } from '@/lib/types';
import {
  Sun, Moon, Globe, ChevronDown, MapPin, Calendar, Briefcase, GraduationCap,
  Code2, Mail, Phone, ExternalLink, Download,
  Award, Languages as LanguagesIcon, Send, ArrowUp
} from 'lucide-react';

function XIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function LinkedInIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function GitHubIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

interface Props {
  data: SiteData;
}

/* ─── Animated counter ─── */
function AnimatedCounter({ target, label }: { target: number; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2000;
    const step = Math.ceil(target / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <div ref={ref} className="text-center">
      <span className="text-5xl md:text-7xl font-black text-accent">{count}+</span>
      <p className="text-sm md:text-base text-muted mt-2 uppercase tracking-widest">{label}</p>
    </div>
  );
}

/* ─── Section wrapper with fade-in ─── */
function FullSection({
  children,
  id,
  className = '',
  gradient,
}: {
  children: React.ReactNode;
  id: string;
  className?: string;
  gradient?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  return (
    <section
      id={id}
      ref={ref}
      className={`relative min-h-screen flex items-center justify-center overflow-hidden ${className}`}
      style={gradient ? { background: gradient } : undefined}
    >
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="w-full max-w-6xl mx-auto px-6 py-20"
      >
        {children}
      </motion.div>
    </section>
  );
}

/* ─── Section heading ─── */
function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-4xl md:text-6xl font-black mb-12 tracking-tight">
      {children}
      <span className="block h-1 w-20 bg-accent mt-4 rounded-full" />
    </h2>
  );
}

/* ─── Main V6Layout ─── */
export default function V6Layout({ data }: Props) {
  const { t, locale, setLocale } = useI18n();
  const { theme, toggleTheme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ container: containerRef });
  const scaleX = useSpring(scrollYProgress, { stiffness: 60, damping: 20 });
  const [activeSection, setActiveSection] = useState(0);

  const { profile, experience, skills, education, projects, languages, certifications, meta, ui } = data;

  const sections = [
    { id: 'hero', label: profile.name.split(' ')[0] },
    { id: 'about', label: t(ui.about) },
    { id: 'skills', label: t(ui.skills) },
    ...experience.map((exp, i) => ({ id: `exp-${i}`, label: t(exp.company) })),
    { id: 'education', label: t(ui.education) },
    { id: 'projects', label: t(ui.projects) },
    { id: 'languages', label: t(ui.languages) },
    { id: 'certifications', label: t(ui.certifications) },
    { id: 'contact', label: t(ui.contact) },
  ];

  /* Track active section via IntersectionObserver */
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = sections.findIndex((s) => s.id === entry.target.id);
            if (idx !== -1) setActiveSection(idx);
          }
        });
      },
      { root: container, threshold: 0.4 }
    );

    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections]);

  const scrollTo = useCallback(
    (id: string) => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    },
    []
  );

  /* ─── Parallax background blobs ─── */
  const blobY1 = useTransform(scrollYProgress, [0, 1], [0, -400]);
  const blobY2 = useTransform(scrollYProgress, [0, 1], [0, -250]);

  return (
    <div ref={containerRef} className="h-screen overflow-y-auto scroll-smooth bg-background text-foreground">
      {/* ─ Progress bar ─ */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-accent origin-left z-[60]"
        style={{ scaleX }}
      />

      {/* ─ Floating nav dots ─ */}
      <nav className="fixed right-4 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-3">
        {sections.map((s, i) => (
          <button
            key={s.id}
            onClick={() => scrollTo(s.id)}
            className="group relative flex items-center"
            aria-label={s.label}
          >
            <span
              className={`block rounded-full transition-all duration-300 ${
                activeSection === i
                  ? 'w-4 h-4 bg-accent shadow-lg shadow-accent/30'
                  : 'w-2.5 h-2.5 bg-muted/40 hover:bg-muted'
              }`}
            />
            <span className="absolute right-7 bg-card text-foreground text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-border shadow">
              {s.label}
            </span>
          </button>
        ))}
      </nav>

      {/* ─ Top bar controls ─ */}
      <div className="fixed top-4 left-4 z-50 flex items-center gap-2">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full bg-card/80 backdrop-blur border border-border hover:bg-accent hover:text-accent-foreground transition-colors"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        <button
          onClick={() => setLocale(locale === 'fr' ? 'en' : 'fr')}
          className="p-2 rounded-full bg-card/80 backdrop-blur border border-border hover:bg-accent hover:text-accent-foreground transition-colors text-xs font-bold"
        >
          {locale === 'fr' ? 'EN' : 'FR'}
        </button>
      </div>

      {/* ─ Parallax decorative blobs ─ */}
      <motion.div
        className="fixed top-20 -left-40 w-96 h-96 rounded-full bg-accent/5 blur-3xl pointer-events-none"
        style={{ y: blobY1 }}
      />
      <motion.div
        className="fixed bottom-20 -right-40 w-80 h-80 rounded-full bg-accent/5 blur-3xl pointer-events-none"
        style={{ y: blobY2 }}
      />

      {/* ════════════════════════ HERO ════════════════════════ */}
      <FullSection id="hero">
        <div className="text-center flex flex-col items-center justify-center min-h-[80vh]">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 100, damping: 15, delay: 0.2 }}
            className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-accent mb-8 shadow-2xl shadow-accent/20"
          >
            <img src={profile.photo} alt={profile.name} className="w-full h-full object-cover" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="text-5xl md:text-8xl font-black tracking-tight mb-4"
          >
            {profile.name}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="text-xl md:text-2xl text-accent font-semibold mb-4"
          >
            {t(profile.title)}
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="text-muted flex items-center gap-2 mb-8"
          >
            <MapPin size={16} /> {profile.location}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.5 }}
            className="flex gap-4"
          >
            <a
              href={meta.cv_download_url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-accent text-accent-foreground rounded-full font-semibold hover:bg-accent-hover transition-colors flex items-center gap-2"
            >
              <Download size={18} /> {t(ui.download_cv)}
            </a>
            <button
              onClick={() => scrollTo('contact')}
              className="px-6 py-3 border-2 border-accent text-accent rounded-full font-semibold hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              {t(ui.contact)}
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.5 }}
            className="absolute bottom-10"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
            >
              <ChevronDown size={32} className="text-muted" />
            </motion.div>
          </motion.div>
        </div>
      </FullSection>

      {/* ════════════════════════ ABOUT ════════════════════════ */}
      <FullSection id="about">
        <SectionHeading>{t(ui.about)}</SectionHeading>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-lg md:text-xl leading-relaxed text-muted mb-8">{t(profile.summary)}</p>
            <div className="flex items-center gap-2 text-accent font-medium">
              <span className="inline-block w-3 h-3 rounded-full bg-green-500 animate-pulse" />
              {t(profile.availability)}
            </div>
          </div>
          <div className="grid grid-cols-3 gap-6">
            <AnimatedCounter target={profile.stats.years_experience} label={t(ui.years_experience)} />
            <AnimatedCounter target={profile.stats.clients} label={t(ui.clients)} />
            <AnimatedCounter target={profile.stats.projects} label={t(ui.projects_count)} />
          </div>
        </div>
      </FullSection>

      {/* ════════════════════════ SKILLS ════════════════════════ */}
      <FullSection id="skills">
        <SectionHeading>{t(ui.skills)}</SectionHeading>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((cat, catIdx) => (
            <motion.div
              key={catIdx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: catIdx * 0.1 }}
              className="bg-card/50 backdrop-blur rounded-2xl p-6 border border-border hover:border-accent/50 transition-colors group"
            >
              <h3 className="text-lg font-bold mb-4 group-hover:text-accent transition-colors">
                {t(cat.category)}
              </h3>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs px-3 py-1.5 rounded-full bg-surface border border-border text-muted hover:bg-accent hover:text-accent-foreground hover:border-accent transition-all cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </FullSection>

      {/* ════════════════════════ EXPERIENCE (one section per entry) ════════════════════════ */}
      {experience.map((exp, i) => (
        <FullSection key={exp.id} id={`exp-${i}`}>
          {i === 0 && <SectionHeading>{t(ui.experience)}</SectionHeading>}
          <div className="grid md:grid-cols-[1fr_2fr] gap-10 items-start">
            <div>
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mb-4"
              >
                <Briefcase className="text-accent" size={28} />
              </motion.div>
              <h3 className="text-2xl md:text-3xl font-black mb-2">{t(exp.role)}</h3>
              <p className="text-accent font-semibold text-lg">{t(exp.company)}</p>
              <div className="flex items-center gap-2 text-muted text-sm mt-2">
                <Calendar size={14} />
                {exp.period.start} — {exp.period.end ?? t(ui.present)}
              </div>
              <div className="flex items-center gap-2 text-muted text-sm mt-1">
                <MapPin size={14} />
                {exp.location}
              </div>
            </div>
            <div>
              <p className="text-muted leading-relaxed mb-6">{t(exp.detailed)}</p>
              <div className="flex flex-wrap gap-2">
                {exp.environment.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs px-3 py-1.5 rounded-full border border-border text-muted bg-surface"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </FullSection>
      ))}

      {/* ════════════════════════ EDUCATION ════════════════════════ */}
      <FullSection id="education">
        <SectionHeading>{t(ui.education)}</SectionHeading>
        <div className="space-y-10">
          {education.map((edu, i) => (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, x: i % 2 === 0 ? -60 : 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex items-start gap-6"
            >
              <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center">
                <GraduationCap className="text-accent" size={24} />
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-bold">{t(edu.degree)}</h3>
                <p className="text-accent font-medium">{t(edu.school)}</p>
                <p className="text-muted text-sm">{t(edu.faculty)}</p>
                <div className="flex items-center gap-4 text-muted text-sm mt-2">
                  <span className="flex items-center gap-1">
                    <Calendar size={14} /> {edu.period.start} — {edu.period.end}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin size={14} /> {edu.location}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </FullSection>

      {/* ════════════════════════ PROJECTS ════════════════════════ */}
      <FullSection id="projects">
        <SectionHeading>{t(ui.projects)}</SectionHeading>

        <h3 className="text-xl font-bold mb-6 text-accent">{t(ui.development)}</h3>
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {projects.dev.map((proj, i) => (
            <motion.div
              key={proj.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card/50 backdrop-blur rounded-2xl border border-border p-6 hover:border-accent/50 hover:shadow-lg hover:shadow-accent/5 transition-all group"
            >
              <h4 className="text-lg font-bold mb-2 group-hover:text-accent transition-colors">
                {t(proj.title)}
              </h4>
              <p className="text-muted text-sm mb-4 leading-relaxed">{t(proj.description)}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {proj.tech.map((tech) => (
                  <span key={tech} className="text-xs px-2 py-1 rounded bg-surface border border-border text-muted">
                    {tech}
                  </span>
                ))}
              </div>
              {proj.link && (
                <a
                  href={proj.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent text-sm font-medium flex items-center gap-1 hover:underline"
                >
                  <ExternalLink size={14} /> GitHub
                </a>
              )}
            </motion.div>
          ))}
        </div>

        <h3 className="text-xl font-bold mb-6 text-accent">{t(ui.design)}</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {projects.design.map((proj, i) => (
            <motion.div
              key={proj.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="relative rounded-xl overflow-hidden aspect-[4/3] group bg-card border border-border"
            >
              <img
                src={proj.image}
                alt={t(proj.title)}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                <div>
                  <p className="text-white font-bold text-sm">{t(proj.title)}</p>
                  <p className="text-white/70 text-xs">{proj.tools.join(' · ')}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </FullSection>

      {/* ════════════════════════ LANGUAGES ════════════════════════ */}
      <FullSection id="languages">
        <SectionHeading>{t(ui.languages)}</SectionHeading>
        <div className="grid md:grid-cols-3 gap-8">
          {languages.map((lang, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, rotateY: 90 }}
              whileInView={{ opacity: 1, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              className="bg-card/50 backdrop-blur rounded-2xl border border-border p-8 text-center hover:border-accent/50 transition-colors"
            >
              <span className="text-5xl mb-4 block">{lang.flag}</span>
              <h3 className="text-xl font-bold mb-1">{t(lang.language)}</h3>
              <p className="text-muted text-sm">{t(lang.level)}</p>
            </motion.div>
          ))}
        </div>
      </FullSection>

      {/* ════════════════════════ CERTIFICATIONS ════════════════════════ */}
      <FullSection id="certifications">
        <SectionHeading>{t(ui.certifications)}</SectionHeading>
        <div className="grid md:grid-cols-2 gap-6">
          {certifications.map((cert, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex items-start gap-4 bg-card/50 backdrop-blur rounded-xl border border-border p-5 hover:border-accent/50 transition-colors"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                <Award className="text-accent" size={20} />
              </div>
              <div>
                <h4 className="font-bold">{cert.title}</h4>
                <p className="text-accent text-sm font-medium">{cert.issuer}</p>
                <p className="text-muted text-sm mt-1">{t(cert.description)}</p>
                {cert.date && <p className="text-muted text-xs mt-1">{cert.date}</p>}
              </div>
            </motion.div>
          ))}
        </div>
      </FullSection>

      {/* ════════════════════════ CONTACT ════════════════════════ */}
      <FullSection id="contact">
        <SectionHeading>{t(ui.contact)}</SectionHeading>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <a
              href={`mailto:${meta.social.email}`}
              className="flex items-center gap-4 text-lg hover:text-accent transition-colors group"
            >
              <span className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                <Mail size={20} />
              </span>
              {meta.social.email}
            </a>
            <a
              href={`tel:${meta.social.phone}`}
              className="flex items-center gap-4 text-lg hover:text-accent transition-colors group"
            >
              <span className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                <Phone size={20} />
              </span>
              {meta.social.phone}
            </a>
            <a
              href={meta.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 text-lg hover:text-accent transition-colors group"
            >
              <span className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                <LinkedInIcon size={20} />
              </span>
              LinkedIn
            </a>
            <a
              href={meta.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 text-lg hover:text-accent transition-colors group"
            >
              <span className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                <GitHubIcon size={20} />
              </span>
              GitHub
            </a>
            <a
              href={meta.social.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 text-lg hover:text-accent transition-colors group"
            >
              <span className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                <XIcon size={20} />
              </span>
              X
            </a>
          </div>
          <div className="flex flex-col items-center justify-center text-center">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 100, damping: 10 }}
              className="w-24 h-24 rounded-full bg-accent flex items-center justify-center mb-6 shadow-2xl shadow-accent/30"
            >
              <Send size={36} className="text-accent-foreground" />
            </motion.div>
            <p className="text-2xl font-bold mb-2">{t({ fr: "Travaillons ensemble", en: "Let's work together" })}</p>
            <p className="text-muted">{t({ fr: "N'hésitez pas à me contacter", en: "Don't hesitate to reach out" })}</p>
          </div>
        </div>
      </FullSection>

      {/* ════════════════════════ FOOTER ════════════════════════ */}
      <footer className="py-8 text-center text-muted text-sm border-t border-border">
        <p>
          © {new Date().getFullYear()} {profile.name}. {t(ui.all_rights_reserved)}.
        </p>
        <button
          onClick={() => scrollTo('hero')}
          className="mt-4 inline-flex items-center gap-1 text-accent hover:underline text-xs"
        >
          <ArrowUp size={14} /> Top
        </button>
      </footer>
    </div>
  );
}
