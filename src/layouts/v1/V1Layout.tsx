'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import type { SiteData } from '@/lib/types';
import { useI18n } from '@/lib/i18n';
import {
  Briefcase,
  GraduationCap,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Mail,
  Phone,
  Download,
  X,
} from 'lucide-react';

/* Brand SVG icons (not in lucide-react) */
function LinkedinIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function GithubIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

function TwitterIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
    </svg>
  );
}

import './v1.css';

/* =========================================================
   Sub-components
   ========================================================= */

/* ---------- Particle Background ---------- */
function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let particles: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      r: number;
      o: number;
    }[] = [];

    function resize() {
      if (!canvas) return;
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }

    function initParticles() {
      if (!canvas) return;
      particles = [];
      const count = Math.floor((canvas.width * canvas.height) / 8000);
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.8,
          vy: (Math.random() - 0.5) * 0.8,
          r: Math.random() * 2.5 + 1,
          o: Math.random() * 0.5 + 0.3,
        });
      }
    }

    function draw() {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255,255,255,${0.15 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw particles
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${p.o})`;
        ctx.fill();
      }
    }

    function update() {
      if (!canvas) return;
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
      }
    }

    function animate() {
      update();
      draw();
      animationId = requestAnimationFrame(animate);
    }

    resize();
    initParticles();
    animate();

    const handleResize = () => {
      resize();
      initParticles();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="v1-particles-canvas" />;
}

/* ---------- Typed Text ---------- */
function TypedText({ strings }: { strings: string[] }) {
  const [text, setText] = useState('');
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    if (strings.length === 0) return;
    let strIdx = 0;
    let charIdx = 0;
    let deleting = false;
    let timeout: ReturnType<typeof setTimeout>;

    function tick() {
      const current = strings[strIdx];
      if (!deleting) {
        charIdx++;
        setText(current.slice(0, charIdx));
        if (charIdx === current.length) {
          timeout = setTimeout(() => {
            deleting = true;
            tick();
          }, 2000);
          return;
        }
        timeout = setTimeout(tick, 60);
      } else {
        charIdx--;
        setText(current.slice(0, charIdx));
        if (charIdx === 0) {
          deleting = false;
          strIdx = (strIdx + 1) % strings.length;
          timeout = setTimeout(tick, 400);
          return;
        }
        timeout = setTimeout(tick, 30);
      }
    }

    tick();
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [strings.join('|')]);

  // Blinking cursor
  useEffect(() => {
    const id = setInterval(() => setShowCursor((c) => !c), 530);
    return () => clearInterval(id);
  }, []);

  return (
    <span>
      {text}
      <span style={{ opacity: showCursor ? 1 : 0 }}>|</span>
    </span>
  );
}

/* =========================================================
   Main V1Layout
   ========================================================= */

export default function V1Layout({ data }: { data: SiteData }) {
  const { t, locale, setLocale } = useI18n();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('about');
  const [carouselIdx, setCarouselIdx] = useState(0);
  const [skillsVisible, setSkillsVisible] = useState(false);
  const skillsRef = useRef<HTMLElement>(null);

  const { profile, experience, skills, education, projects, certifications, meta, ui } = data;

  // Scroll spy
  useEffect(() => {
    const sections = document.querySelectorAll('.v1 section[id]');
    const onScroll = () => {
      const scrollY = window.scrollY + 80;
      sections.forEach((s) => {
        const el = s as HTMLElement;
        if (el.offsetTop <= scrollY && el.offsetTop + el.offsetHeight > scrollY) {
          setActiveSection(el.id);
        }
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Skills animation on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSkillsVisible(true);
        }
      },
      { threshold: 0.2 }
    );
    if (skillsRef.current) observer.observe(skillsRef.current);
    return () => observer.disconnect();
  }, []);

  // Carousel auto-advance
  useEffect(() => {
    const id = setInterval(() => {
      setCarouselIdx((prev) => (prev + 1) % certifications.length);
    }, 5000);
    return () => clearInterval(id);
  }, [certifications.length]);

  const scrollTo = useCallback(
    (id: string) => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
      setMenuOpen(false);
    },
    []
  );

  // Nav items
  const navItems = [
    { id: 'about', label: t(ui.about) },
    { id: 'skills', label: t(ui.skills) },
    { id: 'experience', label: t(ui.experience) },
    { id: 'education', label: t(ui.education) },
    { id: 'portfolio', label: t(ui.projects) },
    { id: 'certifications', label: t(ui.certifications) },
    { id: 'contact', label: t(ui.contact) },
  ];

  // Typed strings
  const typedStrings =
    locale === 'fr'
      ? [
          'Ingénieur Backend & DevOps',
          'Java • Spring Boot • Kotlin',
          'Docker • Kubernetes • CI/CD',
        ]
      : [
          'Backend & DevOps Engineer',
          'Java • Spring Boot • Kotlin',
          'Docker • Kubernetes • CI/CD',
        ];

  // Skill percentages – distribute evenly across categories
  const skillPercentages: Record<string, number> = {};
  skills.forEach((cat) => {
    cat.skills.forEach((s, i) => {
      const base = 95 - i * 10;
      skillPercentages[s] = Math.max(base, 30);
    });
  });

  // Split skills into two columns
  const mid = Math.ceil(skills.length / 2);
  const skillsLeft = skills.slice(0, mid);
  const skillsRight = skills.slice(mid);

  // All portfolio items (dev + design)
  const allProjects = [
    ...projects.dev.map((p) => ({
      image: p.image,
      title: t(p.title),
      link: p.link,
    })),
    ...projects.design.map((p) => ({
      image: p.image,
      title: t(p.title),
      link: null as string | null,
    })),
  ];

  // Format period
  const formatPeriod = (start: string, end: string | null) => {
    const s = start.length > 4 ? start.slice(0, 7) : start;
    if (!end) return `${s} - ${t(ui.present)}`;
    const e = end.length > 4 ? end.slice(0, 7) : end;
    return `${s} - ${e}`;
  };

  return (
    <div className="v1">
      {/* ===== NAVBAR ===== */}
      <nav className="v1-navbar">
        <div className="v1-container">
          <button
            className="v1-navbar-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation"
          >
            {menuOpen ? (
              <X size={22} color="#fff" />
            ) : (
              <>
                <span />
                <span />
                <span />
              </>
            )}
          </button>
          <ul className={`v1-navbar-links${menuOpen ? ' open' : ''}`}>
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={activeSection === item.id ? 'active' : ''}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo(item.id);
                  }}
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setLocale(locale === 'fr' ? 'en' : 'fr');
                }}
                style={{ opacity: 0.8 }}
              >
                {locale === 'fr' ? '🇬🇧 EN' : '🇫🇷 FR'}
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {/* ===== ABOUT / HERO ===== */}
      <section id="about" className="v1-about">
        <ParticleBackground />
        <div className="v1-profile-picture">
          <img
            src={profile.photo}
            alt={profile.name}
            className="v1-img-circle"
          />
        </div>
        <div className="heading" style={{ textAlign: 'center' }}>
          <h1>
            {locale === 'fr'
              ? `Hello, c'est ${profile.name}`
              : `Hello, I'm ${profile.name}`}
          </h1>
          <h3>
            <TypedText strings={typedStrings} />
          </h3>
          <p>{t(profile.summary)}</p>
          <a
            href={meta.cv_download_url}
            target="_blank"
            rel="noopener noreferrer"
            className="button1"
          >
            <Download size={14} style={{ marginRight: 8, verticalAlign: 'middle' }} />
            {t(ui.download_cv)}
          </a>
        </div>
      </section>

      {/* ===== SKILLS ===== */}
      <section id="skills" className="v1-skills" ref={skillsRef}>
        <div className="heading">
          <div className="red-divider" />
          <h2>{t(ui.skills)}</h2>
        </div>
        <div className="v1-container">
          <div className="v1-skills-grid">
            <div>
              {skillsLeft.map((cat) => (
                <div key={t(cat.category)}>
                  <h4>{t(cat.category)}</h4>
                  {cat.skills.map((skill) => {
                    const pct = skillPercentages[skill] || 50;
                    return (
                      <div key={skill} className="v1-progress">
                        <div
                          className={`v1-progress-bar${skillsVisible ? ' animate' : ''}`}
                          style={{
                            width: skillsVisible ? `${pct}%` : '0%',
                          }}
                        >
                          <h5>
                            {skill} {pct}%
                          </h5>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
            <div>
              {skillsRight.map((cat) => (
                <div key={t(cat.category)}>
                  <h4>{t(cat.category)}</h4>
                  {cat.skills.map((skill) => {
                    const pct = skillPercentages[skill] || 50;
                    return (
                      <div key={skill} className="v1-progress">
                        <div
                          className={`v1-progress-bar${skillsVisible ? ' animate' : ''}`}
                          style={{
                            width: skillsVisible ? `${pct}%` : '0%',
                          }}
                        >
                          <h5>
                            {skill} {pct}%
                          </h5>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== EXPERIENCE ===== */}
      <section id="experience" className="v1-experience">
        <div className="v1-container">
          <div className="white-divider" />
          <div className="heading">
            <h2>{t(ui.experience)}</h2>
          </div>
          <ul className="v1-timeline">
            {experience.map((exp, idx) => {
              const isInverted = idx % 2 !== 0;
              return (
                <li key={exp.id} className="v1-timeline-item">
                  <div className="v1-timeline-badge">
                    <Briefcase size={20} />
                  </div>
                  <div
                    className={
                      isInverted
                        ? 'v1-timeline-panel-container-inverted'
                        : 'v1-timeline-panel-container'
                    }
                  >
                    <div className="v1-timeline-panel">
                      <div className="v1-timeline-heading">
                        <h3>{t(exp.company)}</h3>
                        <h4>{t(exp.role)}</h4>
                        <p className="text-muted">
                          🕒 {formatPeriod(exp.period.start, exp.period.end)}
                        </p>
                      </div>
                      <div className="v1-timeline-body">
                        <p>{t(exp.short)}</p>
                        <p style={{ color: '#888', fontSize: 12, marginTop: 4 }}>
                          {exp.location}
                        </p>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* ===== EDUCATION ===== */}
      <section id="education" className="v1-education">
        <div className="v1-container">
          <div className="red-divider" />
          <div className="heading">
            <h2>{t(ui.education)}</h2>
          </div>
          <div className="v1-education-grid">
            {education.map((edu) => (
              <div key={edu.id} className="v1-education-block">
                <h5>
                  {edu.period.start} - {edu.period.end}
                </h5>
                <div className="edu-icon">
                  <GraduationCap size={40} />
                </div>
                <h3>{t(edu.faculty)}</h3>
                <h4>{t(edu.degree)}</h4>
                <div className="red-divider" style={{ marginBottom: 20 }} />
                <p>{t(edu.school)}</p>
                <p>{edu.location}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PORTFOLIO ===== */}
      <section id="portfolio" className="v1-portfolio">
        <div className="v1-container">
          <div className="white-divider" />
          <div className="heading">
            <h2>Portfolio</h2>
          </div>
          <div className="v1-portfolio-grid">
            {allProjects.map((item, i) => (
              <a
                key={i}
                className="v1-thumbnail"
                href={item.link || undefined}
                target={item.link ? '_blank' : undefined}
                rel={item.link ? 'noopener noreferrer' : undefined}
              >
                <img src={item.image} alt={item.title} />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CERTIFICATIONS ===== */}
      <section id="certifications" className="v1-certifications">
        <div className="v1-container">
          <div className="red-divider" />
          <div className="heading">
            <h2>{t(ui.certifications)}</h2>
          </div>
          <div className="v1-carousel">
            <button
              className="v1-carousel-control left"
              onClick={() =>
                setCarouselIdx(
                  (carouselIdx - 1 + certifications.length) % certifications.length
                )
              }
              aria-label="Previous"
            >
              <ChevronLeft size={30} />
            </button>
            <div className="v1-carousel-item">
              <h3>{certifications[carouselIdx].title}</h3>
              <h4>
                {certifications[carouselIdx].issuer}
                {certifications[carouselIdx].date
                  ? ` | ${certifications[carouselIdx].date}`
                  : ''}{' '}
                — {t(certifications[carouselIdx].description)}
              </h4>
            </div>
            <button
              className="v1-carousel-control right"
              onClick={() =>
                setCarouselIdx((carouselIdx + 1) % certifications.length)
              }
              aria-label="Next"
            >
              <ChevronRight size={30} />
            </button>
            <ul className="v1-carousel-indicators">
              {certifications.map((_, i) => (
                <li
                  key={i}
                  className={i === carouselIdx ? 'active' : ''}
                  onClick={() => setCarouselIdx(i)}
                />
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ===== CONTACT ===== */}
      <section id="contact" className="v1-contact">
        <div className="v1-container">
          <div className="white-divider" />
          <div className="heading">
            <h2>{t(ui.contact)}</h2>
          </div>
          <div className="v1-social-links">
            <a
              href={meta.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="v1-social-link"
            >
              <LinkedinIcon size={32} />
              <span>LinkedIn</span>
            </a>
            <a
              href={meta.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="v1-social-link"
            >
              <GithubIcon size={32} />
              <span>GitHub</span>
            </a>
            <a
              href={meta.social.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="v1-social-link"
            >
              <TwitterIcon size={32} />
              <span>Twitter</span>
            </a>
            <a
              href={`mailto:${meta.social.email}`}
              className="v1-social-link"
            >
              <Mail size={32} />
              <span>{meta.social.email}</span>
            </a>
            <a
              href={`tel:${meta.social.phone}`}
              className="v1-social-link"
            >
              <Phone size={32} />
              <span>{meta.social.phone}</span>
            </a>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="v1-footer">
        <div className="v1-container">
          <div className="v1-footer-socials">
            <a href={`tel:${meta.social.phone}`} className="social-phone">
              <Phone size={28} />
            </a>
            <a
              href={meta.social.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="social-twitter"
            >
              <TwitterIcon size={28} />
            </a>
            <a
              href={meta.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="social-github"
            >
              <GithubIcon size={28} />
            </a>
            <a
              href={meta.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="social-linkedin"
            >
              <LinkedinIcon size={28} />
            </a>
            <a href={`mailto:${meta.social.email}`} className="social-email">
              <Mail size={28} />
            </a>
          </div>
          <div className="scrollup">
            <a
              href="#about"
              onClick={(e) => {
                e.preventDefault();
                scrollTo('about');
              }}
            >
              <ChevronUp size={25} />
            </a>
          </div>
          <h5>
            © {new Date().getFullYear()} {meta.site_url.replace('https://', '')} |{' '}
            {t(ui.all_rights_reserved)}
          </h5>
        </div>
      </footer>
    </div>
  );
}
