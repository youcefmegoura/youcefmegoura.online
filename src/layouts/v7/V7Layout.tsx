'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { useI18n } from '@/lib/i18n';
import { useTheme } from '@/lib/theme';
import type { SiteData } from '@/lib/types';
import {
  Sun, Moon, MapPin, Calendar, Briefcase, GraduationCap,
  Mail, Phone, ExternalLink, Download,
  Award, Send, ArrowUpRight, ArrowRight, ChevronRight
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

/* ─── Cursor follower ─── */
function CursorFollower() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const springX = useSpring(0, { stiffness: 150, damping: 15 });
  const springY = useSpring(0, { stiffness: 150, damping: 15 });

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      springX.set(e.clientX);
      springY.set(e.clientY);
    };
    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, [springX, springY]);

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 rounded-full border-2 border-accent pointer-events-none z-[9999] mix-blend-difference hidden lg:block"
      style={{ x: springX, y: springY, translateX: '-50%', translateY: '-50%' }}
    />
  );
}

/* ─── Stagger wrapper ─── */
function StaggerChildren({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={{ visible: { transition: { staggerChildren: 0.1 } }, hidden: {} }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
};

const fadeLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
};

const fadeRight = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
};

/* ─── Wave divider SVG ─── */
function WaveDivider({ flip = false, color = 'var(--color-accent)' }: { flip?: boolean; color?: string }) {
  return (
    <div className={`w-full overflow-hidden leading-[0] ${flip ? 'rotate-180' : ''}`}>
      <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-16 md:h-24">
        <path
          d="M0,60 C200,120 400,0 600,60 C800,120 1000,0 1200,60 L1200,120 L0,120 Z"
          fill={color}
        />
      </svg>
    </div>
  );
}

/* ─── Diagonal divider ─── */
function DiagonalDivider({ className = '' }: { className?: string }) {
  return (
    <div className={`w-full overflow-hidden leading-[0] ${className}`}>
      <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-20 md:h-28">
        <polygon points="0,0 1200,120 0,120" fill="currentColor" />
      </svg>
    </div>
  );
}

/* ─── Animated counter ─── */
function Counter({ target, label }: { target: number; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let v = 0;
    const step = Math.ceil(target / 60);
    const timer = setInterval(() => {
      v += step;
      if (v >= target) {
        setCount(target);
        clearInterval(timer);
      } else setCount(v);
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <motion.div ref={ref} variants={fadeUp} className="text-center">
      <span className="text-6xl md:text-8xl font-black text-accent leading-none">{count}+</span>
      <p className="text-xs uppercase tracking-[0.3em] text-muted mt-2">{label}</p>
    </motion.div>
  );
}

/* ─── Main V7Layout ─── */
export default function V7Layout({ data }: Props) {
  const { t, locale, setLocale } = useI18n();
  const { theme, toggleTheme } = useTheme();
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const heroParallax = useTransform(scrollYProgress, [0, 0.3], [0, -150]);
  const experienceScrollRef = useRef<HTMLDivElement>(null);

  const { profile, experience, skills, education, projects, languages, certifications, meta, ui } = data;

  const navItems = [
    { id: 'about', label: t(ui.about) },
    { id: 'skills', label: t(ui.skills) },
    { id: 'experience', label: t(ui.experience) },
    { id: 'projects', label: t(ui.projects) },
    { id: 'contact', label: t(ui.contact) },
  ];

  return (
    <div className="bg-background text-foreground overflow-x-hidden">
      <CursorFollower />

      {/* ─── Fixed top bar ─── */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/70 border-b border-border/50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#hero" className="text-2xl font-black tracking-tight">
            Y<span className="text-accent">.</span>M
          </a>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="hover:text-accent transition-colors relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all" />
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-surface transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              onClick={() => setLocale(locale === 'fr' ? 'en' : 'fr')}
              className="px-3 py-1.5 rounded-full text-xs font-bold border border-border hover:border-accent hover:text-accent transition-colors"
            >
              {locale === 'fr' ? 'EN' : 'FR'}
            </button>
          </div>
        </div>
      </header>

      {/* ════════════════════════ HERO ════════════════════════ */}
      <section id="hero" ref={heroRef} className="relative min-h-screen flex items-center pt-16 overflow-hidden">
        {/* Parallax background decorations */}
        <motion.div style={{ y: heroParallax }} className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 right-10 w-72 h-72 bg-accent/5 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-accent/3 rounded-full blur-3xl" />
          <motion.span
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            className="absolute top-1/4 right-1/4 text-[20rem] font-black text-accent/[0.03] select-none leading-none"
          >
            ✦
          </motion.span>
        </motion.div>

        <div className="max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-[1fr_auto] gap-12 items-center relative z-10">
          {/* Left: text — asymmetric, oversized */}
          <div>
            <motion.p
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-sm uppercase tracking-[0.4em] text-accent font-semibold mb-4"
            >
              {t(profile.title)}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.9] mb-6"
            >
              {profile.name.split(' ').map((word, i) => (
                <span key={i} className="block">
                  {i === 1 ? <span className="text-accent">{word}</span> : word}
                </span>
              ))}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="text-muted text-base md:text-lg max-w-md mb-8 leading-relaxed"
            >
              {t(profile.tagline)}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.5 }}
              className="flex flex-wrap gap-4"
            >
              <a
                href={meta.cv_download_url}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 px-8 py-4 bg-accent text-accent-foreground font-bold rounded-full hover:shadow-xl hover:shadow-accent/20 transition-all hover:-translate-y-0.5"
              >
                <Download size={18} />
                {t(ui.download_cv)}
                <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>
              <a
                href="#contact"
                className="group inline-flex items-center gap-3 px-8 py-4 border-2 border-foreground font-bold rounded-full hover:bg-foreground hover:text-background transition-all"
              >
                {t(ui.contact)}
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="flex items-center gap-2 mt-8 text-sm text-muted"
            >
              <MapPin size={14} className="text-accent" /> {profile.location}
              <span className="mx-2 text-border">|</span>
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
              {t(profile.availability)}
            </motion.div>
          </div>

          {/* Right: creative profile photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7, rotate: 10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.5, type: 'spring', stiffness: 80 }}
            className="relative hidden lg:block"
          >
            <div className="relative w-80 h-80">
              {/* Artistic rotating border */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 rounded-[2rem] border-2 border-dashed border-accent/30"
                style={{ transform: 'rotate(12deg)' }}
              />
              {/* Photo with clip-path */}
              <div
                className="relative w-full h-full overflow-hidden rounded-[2rem] shadow-2xl shadow-accent/10"
                style={{ clipPath: 'polygon(10% 0%, 100% 0%, 100% 90%, 90% 100%, 0% 100%, 0% 10%)' }}
              >
                <img
                  src={profile.photo}
                  alt={profile.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-accent/20 to-transparent" />
              </div>
              {/* Floating accent decoration */}
              <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-accent rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-accent-foreground font-black text-xl">{profile.stats.years_experience}+</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── Wave divider ─── */}
      <WaveDivider color="var(--color-surface)" />

      {/* ════════════════════════ ABOUT + STATS ════════════════════════ */}
      <section id="about" className="bg-surface py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <StaggerChildren className="grid lg:grid-cols-[2fr_1fr] gap-16 items-center">
            <motion.div variants={fadeLeft}>
              <p className="text-sm uppercase tracking-[0.4em] text-accent font-semibold mb-4">{t(ui.about)}</p>
              <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-8 leading-tight">
                {t({ fr: "Construire le ", en: "Building the " })}
                <span className="text-accent">{t({ fr: "futur", en: "future" })}</span>
                {t({ fr: " du backend", en: " of backend" })}
              </h2>
              <p className="text-muted text-lg leading-relaxed">{t(profile.summary)}</p>
            </motion.div>

            <motion.div variants={fadeRight} className="space-y-8">
              <Counter target={profile.stats.years_experience} label={t(ui.years_experience)} />
              <Counter target={profile.stats.clients} label={t(ui.clients)} />
              <Counter target={profile.stats.projects} label={t(ui.projects_count)} />
            </motion.div>
          </StaggerChildren>
        </div>
      </section>

      {/* ─── Diagonal divider ─── */}
      <div className="text-background">
        <DiagonalDivider className="text-surface" />
      </div>

      {/* ════════════════════════ SKILLS — Word cloud / scatter ════════════════════════ */}
      <section id="skills" className="py-24 md:py-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <StaggerChildren>
            <motion.div variants={fadeUp} className="mb-16">
              <p className="text-sm uppercase tracking-[0.4em] text-accent font-semibold mb-4">{t(ui.skills)}</p>
              <h2 className="text-4xl md:text-6xl font-black tracking-tight">
                {t({ fr: "Ce que je ", en: "What I " })}
                <span className="text-accent">{t({ fr: "maîtrise", en: "master" })}</span>
              </h2>
            </motion.div>

            {/* Skill categories as offset cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {skills.map((cat, catIdx) => {
                const offsets = ['md:translate-y-0', 'md:translate-y-8', 'md:-translate-y-4', 'md:translate-y-12', 'md:translate-y-2', 'md:-translate-y-6', 'md:translate-y-6'];
                return (
                  <motion.div
                    key={catIdx}
                    variants={scaleIn}
                    className={`${offsets[catIdx % offsets.length]} transition-transform`}
                  >
                    <div className="bg-card rounded-3xl p-8 border border-border hover:border-accent transition-all duration-300 group hover:shadow-2xl hover:shadow-accent/5 hover:-translate-y-2">
                      <h3 className="text-lg font-black mb-6 group-hover:text-accent transition-colors uppercase tracking-wider">
                        {t(cat.category)}
                      </h3>
                      {/* Scattered skill words */}
                      <div className="flex flex-wrap gap-x-3 gap-y-2">
                        {cat.skills.map((skill, si) => {
                          const sizes = ['text-sm', 'text-base', 'text-lg', 'text-xs', 'text-base'];
                          const weights = ['font-normal', 'font-bold', 'font-medium', 'font-black', 'font-semibold'];
                          return (
                            <motion.span
                              key={skill}
                              whileHover={{ scale: 1.15, color: 'var(--color-accent)' }}
                              className={`${sizes[si % sizes.length]} ${weights[si % weights.length]} text-muted cursor-default transition-colors inline-block`}
                            >
                              {skill}
                            </motion.span>
                          );
                        })}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </StaggerChildren>
        </div>
      </section>

      {/* ─── Wave divider ─── */}
      <WaveDivider color="var(--color-card)" />

      {/* ════════════════════════ EXPERIENCE — Horizontal scroll strip ════════════════════════ */}
      <section id="experience" className="bg-card py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 mb-12">
          <StaggerChildren>
            <motion.div variants={fadeUp}>
              <p className="text-sm uppercase tracking-[0.4em] text-accent font-semibold mb-4">{t(ui.experience)}</p>
              <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-4">
                {t({ fr: "Mon ", en: "My " })}
                <span className="text-accent">{t({ fr: "parcours", en: "journey" })}</span>
              </h2>
              <p className="text-muted flex items-center gap-2">
                <ArrowRight size={16} className="text-accent" />
                {t({ fr: "Scrollez horizontalement", en: "Scroll horizontally" })}
              </p>
            </motion.div>
          </StaggerChildren>
        </div>

        {/* Horizontal scrollable strip */}
        <div
          ref={experienceScrollRef}
          className="overflow-x-auto pb-6 scrollbar-thin scrollbar-thumb-accent/30 scrollbar-track-transparent"
        >
          <div className="flex gap-8 px-6 min-w-max">
            {experience.map((exp, i) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: 80 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                className="w-[380px] md:w-[440px] flex-shrink-0 group"
              >
                <div className="bg-background rounded-3xl border border-border p-8 h-full hover:border-accent transition-all duration-300 hover:shadow-2xl hover:shadow-accent/5 relative overflow-hidden">
                  {/* Large background number */}
                  <span className="absolute -top-6 -right-4 text-[8rem] font-black text-accent/[0.04] leading-none select-none">
                    0{i + 1}
                  </span>

                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center group-hover:bg-accent transition-colors">
                        <Briefcase className="text-accent group-hover:text-accent-foreground transition-colors" size={22} />
                      </div>
                      <div>
                        <span className="text-xs uppercase tracking-widest text-accent font-bold">{exp.type}</span>
                        <p className="text-muted text-sm flex items-center gap-1">
                          <Calendar size={12} />
                          {exp.period.start} — {exp.period.end ?? t(ui.present)}
                        </p>
                      </div>
                    </div>

                    <h3 className="text-2xl font-black mb-1 group-hover:text-accent transition-colors">{t(exp.role)}</h3>
                    <p className="text-accent font-semibold mb-1">{t(exp.company)}</p>
                    <p className="text-muted text-sm flex items-center gap-1 mb-4">
                      <MapPin size={12} /> {exp.location}
                    </p>

                    <p className="text-muted text-sm leading-relaxed mb-6">{t(exp.short)}</p>

                    <div className="flex flex-wrap gap-1.5">
                      {exp.environment.slice(0, 8).map((tech) => (
                        <span
                          key={tech}
                          className="text-[10px] px-2.5 py-1 rounded-full border border-border text-muted bg-surface font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                      {exp.environment.length > 8 && (
                        <span className="text-[10px] px-2.5 py-1 rounded-full border border-accent text-accent font-medium">
                          +{exp.environment.length - 8}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Wave divider flipped ─── */}
      <WaveDivider flip color="var(--color-card)" />

      {/* ════════════════════════ EDUCATION ════════════════════════ */}
      <section id="education-section" className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <StaggerChildren>
            <motion.div variants={fadeUp} className="mb-16">
              <p className="text-sm uppercase tracking-[0.4em] text-accent font-semibold mb-4">{t(ui.education)}</p>
              <h2 className="text-4xl md:text-6xl font-black tracking-tight">
                {t({ fr: "Ma ", en: "My " })}
                <span className="text-accent">{t({ fr: "formation", en: "education" })}</span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {education.map((edu, i) => (
                <motion.div
                  key={edu.id}
                  variants={i % 2 === 0 ? fadeLeft : fadeRight}
                  className="group"
                >
                  <div className="relative bg-card rounded-3xl border border-border p-8 hover:border-accent transition-all duration-300 hover:shadow-2xl hover:shadow-accent/5 overflow-hidden">
                    {edu.primary && (
                      <div className="absolute top-0 right-0 bg-accent text-accent-foreground text-[10px] font-bold px-3 py-1 rounded-bl-2xl uppercase tracking-wider">
                        Primary
                      </div>
                    )}
                    <div className="flex items-start gap-5">
                      <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent transition-colors">
                        <GraduationCap className="text-accent group-hover:text-accent-foreground transition-colors" size={26} />
                      </div>
                      <div>
                        <h3 className="text-xl md:text-2xl font-black mb-2 group-hover:text-accent transition-colors">
                          {t(edu.degree)}
                        </h3>
                        <p className="text-accent font-semibold">{t(edu.school)}</p>
                        <p className="text-muted text-sm mb-3">{t(edu.faculty)}</p>
                        <div className="flex items-center gap-4 text-muted text-sm">
                          <span className="flex items-center gap-1"><Calendar size={13} /> {edu.period.start} — {edu.period.end}</span>
                          <span className="flex items-center gap-1"><MapPin size={13} /> {edu.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </StaggerChildren>
        </div>
      </section>

      {/* ─── Diagonal divider ─── */}
      <div className="text-surface">
        <DiagonalDivider className="text-background" />
      </div>

      {/* ════════════════════════ PROJECTS ════════════════════════ */}
      <section id="projects" className="bg-surface py-24 md:py-32 relative">
        <div className="max-w-7xl mx-auto px-6">
          <StaggerChildren>
            <motion.div variants={fadeUp} className="mb-16">
              <p className="text-sm uppercase tracking-[0.4em] text-accent font-semibold mb-4">{t(ui.projects)}</p>
              <h2 className="text-4xl md:text-6xl font-black tracking-tight">
                {t({ fr: "Projets ", en: "Featured " })}
                <span className="text-accent">{t({ fr: "phares", en: "projects" })}</span>
              </h2>
            </motion.div>

            {/* Dev projects — large cards with overlay */}
            <motion.div variants={fadeUp}>
              <h3 className="text-xl font-black uppercase tracking-wider mb-8 flex items-center gap-3">
                <span className="w-8 h-0.5 bg-accent" /> {t(ui.development)}
              </h3>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8 mb-16">
              {projects.dev.map((proj, i) => (
                <motion.div
                  key={proj.id}
                  variants={i % 2 === 0 ? fadeLeft : fadeRight}
                  className="group relative"
                >
                  <div className="relative bg-card rounded-3xl border border-border overflow-hidden hover:border-accent transition-all duration-500 hover:shadow-2xl hover:shadow-accent/10">
                    {/* Large image area */}
                    <div className="relative h-48 md:h-56 overflow-hidden bg-gradient-to-br from-accent/10 to-accent/5">
                      <img
                        src={proj.image}
                        alt={t(proj.title)}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      {/* Overlay on hover */}
                      <div className="absolute inset-0 bg-accent/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        {proj.link ? (
                          <a
                            href={proj.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-accent-foreground font-bold flex items-center gap-2 text-lg hover:underline"
                          >
                            <ExternalLink size={20} /> {t({ fr: "Voir le projet", en: "View project" })}
                          </a>
                        ) : (
                          <span className="text-accent-foreground font-bold text-lg">{proj.type}</span>
                        )}
                      </div>
                    </div>

                    <div className="p-8">
                      <h4 className="text-2xl font-black mb-2 group-hover:text-accent transition-colors">{t(proj.title)}</h4>
                      <p className="text-muted text-sm leading-relaxed mb-4">{t(proj.description)}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {proj.tech.map((tech) => (
                          <span key={tech} className="text-[10px] px-2.5 py-1 rounded-full border border-border text-muted font-medium">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Design projects */}
            <motion.div variants={fadeUp}>
              <h3 className="text-xl font-black uppercase tracking-wider mb-8 flex items-center gap-3">
                <span className="w-8 h-0.5 bg-accent" /> {t(ui.design)}
              </h3>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {projects.design.map((proj, i) => (
                <motion.div
                  key={proj.id}
                  variants={scaleIn}
                  className="group"
                >
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-border hover:border-accent transition-all duration-300 bg-card">
                    <img
                      src={proj.image}
                      alt={t(proj.title)}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-2"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                      <p className="text-white font-black text-base">{t(proj.title)}</p>
                      <p className="text-white/60 text-xs mt-1">{proj.tools.join(' · ')}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </StaggerChildren>
        </div>
      </section>

      {/* ─── Wave divider ─── */}
      <WaveDivider flip color="var(--color-surface)" />

      {/* ════════════════════════ LANGUAGES ════════════════════════ */}
      <section id="languages-section" className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <StaggerChildren>
            <motion.div variants={fadeUp} className="mb-16">
              <p className="text-sm uppercase tracking-[0.4em] text-accent font-semibold mb-4">{t(ui.languages)}</p>
              <h2 className="text-4xl md:text-6xl font-black tracking-tight">
                {t({ fr: "Langues ", en: "Languages " })}
                <span className="text-accent">{t({ fr: "parlées", en: "spoken" })}</span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {languages.map((lang, i) => (
                <motion.div key={i} variants={fadeUp} className="group">
                  <div className="relative bg-card rounded-3xl border border-border p-10 text-center hover:border-accent transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-accent/5 overflow-hidden">
                    <span className="absolute top-4 right-4 text-6xl opacity-10 group-hover:opacity-30 transition-opacity">{lang.flag}</span>
                    <motion.span
                      whileHover={{ scale: 1.3, rotate: 10 }}
                      className="text-6xl mb-6 inline-block cursor-default"
                    >
                      {lang.flag}
                    </motion.span>
                    <h3 className="text-2xl font-black mb-2 group-hover:text-accent transition-colors">{t(lang.language)}</h3>
                    <p className="text-muted text-sm">{t(lang.level)}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </StaggerChildren>
        </div>
      </section>

      {/* ════════════════════════ CERTIFICATIONS ════════════════════════ */}
      <section id="certifications-section" className="bg-card py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <StaggerChildren>
            <motion.div variants={fadeUp} className="mb-16">
              <p className="text-sm uppercase tracking-[0.4em] text-accent font-semibold mb-4">{t(ui.certifications)}</p>
              <h2 className="text-4xl md:text-6xl font-black tracking-tight">
                {t({ fr: "Certifications ", en: "Certifications " })}
                <span className="text-accent">&amp; {t({ fr: "formations", en: "training" })}</span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {certifications.map((cert, i) => (
                <motion.div key={i} variants={fadeUp} className="group">
                  <div className="bg-background rounded-2xl border border-border p-6 hover:border-accent transition-all duration-300 hover:-translate-y-1 hover:shadow-lg h-full">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent transition-colors">
                        <Award className="text-accent group-hover:text-accent-foreground transition-colors" size={18} />
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-black text-sm truncate group-hover:text-accent transition-colors">{cert.title}</h4>
                        <p className="text-accent text-xs font-semibold">{cert.issuer}</p>
                      </div>
                    </div>
                    <p className="text-muted text-sm leading-relaxed">{t(cert.description)}</p>
                    {cert.date && (
                      <p className="text-muted/60 text-xs mt-3 flex items-center gap-1">
                        <Calendar size={11} /> {cert.date}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </StaggerChildren>
        </div>
      </section>

      {/* ─── Angled divider ─── */}
      <div className="text-accent">
        <DiagonalDivider className="text-card" />
      </div>

      {/* ════════════════════════ CONTACT ════════════════════════ */}
      <section id="contact" className="bg-accent text-accent-foreground py-24 md:py-32 relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 right-10 w-64 h-64 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute bottom-10 left-10 w-80 h-80 rounded-full bg-black/5 blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <StaggerChildren className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div variants={fadeLeft}>
              <p className="text-sm uppercase tracking-[0.4em] font-semibold mb-4 opacity-70">{t(ui.contact)}</p>
              <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-8 leading-tight">
                {t({ fr: "Prêt à ", en: "Ready to " })}
                {t({ fr: "collaborer ?", en: "collaborate?" })}
              </h2>
              <p className="text-lg opacity-80 leading-relaxed mb-8">
                {t({ fr: "N'hésitez pas à me contacter pour discuter de votre prochain projet.", en: "Don't hesitate to reach out to discuss your next project." })}
              </p>

              <div className="space-y-4">
                <a
                  href={`mailto:${meta.social.email}`}
                  className="flex items-center gap-4 text-lg hover:opacity-70 transition-opacity group"
                >
                  <span className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                    <Mail size={20} />
                  </span>
                  {meta.social.email}
                </a>
                <a
                  href={`tel:${meta.social.phone}`}
                  className="flex items-center gap-4 text-lg hover:opacity-70 transition-opacity group"
                >
                  <span className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                    <Phone size={20} />
                  </span>
                  {meta.social.phone}
                </a>
              </div>
            </motion.div>

            <motion.div variants={fadeRight} className="flex flex-col items-center gap-6">
              <div className="flex gap-4">
                {[
                  { href: meta.social.linkedin, icon: LinkedInIcon, label: 'LinkedIn' },
                  { href: meta.social.github, icon: GitHubIcon, label: 'GitHub' },
                  { href: meta.social.twitter, icon: XIcon, label: 'X' },
                ].map(({ href, icon: Icon, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all hover:-translate-y-1"
                    aria-label={label}
                  >
                    <Icon size={24} />
                  </a>
                ))}
              </div>

              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                className="mt-8"
              >
                <Send size={48} className="opacity-30" />
              </motion.div>
            </motion.div>
          </StaggerChildren>
        </div>
      </section>

      {/* ════════════════════════ FOOTER ════════════════════════ */}
      <footer className="py-12 bg-background border-t border-border">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted text-sm">
            © {new Date().getFullYear()} {profile.name}. {t(ui.all_rights_reserved)}.
          </p>
          <a
            href="#hero"
            className="text-accent font-bold text-sm flex items-center gap-1 hover:underline group"
          >
            {t({ fr: "Retour en haut", en: "Back to top" })}
            <ChevronRight size={14} className="rotate-[-90deg] group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>
      </footer>
    </div>
  );
}
