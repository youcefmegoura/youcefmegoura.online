'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import { useTheme } from '@/lib/theme';
import type { Container, ISourceOptions } from '@tsparticles/engine';

export function ParticleBackground() {
  const { theme } = useTheme();
  const [ready, setReady] = useState(false);
  const containerRef = useRef<Container | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setReady(true));
  }, []);

  // Parallax scroll: shift particles on scroll for a depth effect
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (wrapperRef.current) {
            const y = window.scrollY * 0.3;
            wrapperRef.current.style.transform = `translateY(${y}px)`;
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLoaded = useCallback(async (container?: Container) => {
    containerRef.current = container ?? null;
  }, []);

  const options: ISourceOptions = useMemo(() => {
    const isDark = theme === 'dark';
    const particleColor = isDark ? '#ffffff' : '#3f3f46';
    const linkColor = isDark ? '#a1a1aa' : '#71717a';

    return {
      fullScreen: false,
      fpsLimit: 60,
      particles: {
        number: {
          value: 80,
          density: {
            enable: true,
          },
        },
        color: {
          value: particleColor,
        },
        shape: {
          type: 'circle',
        },
        opacity: {
          value: { min: 0.3, max: 0.5 },
        },
        size: {
          value: { min: 1, max: 3 },
        },
        links: {
          enable: true,
          distance: 150,
          color: linkColor,
          opacity: isDark ? 0.25 : 0.2,
          width: 1,
        },
        move: {
          enable: true,
          speed: 0.8,
          direction: 'none' as const,
          random: true,
          straight: false,
          outModes: {
            default: 'out' as const,
          },
        },
      },
      interactivity: {
        events: {
          onHover: {
            enable: true,
            mode: 'repulse',
          },
        },
        modes: {
          repulse: {
            distance: 120,
            duration: 0.4,
          },
        },
      },
      detectRetina: true,
    };
  }, [theme]);

  if (!ready) return null;

  return (
    <div ref={wrapperRef} className="pointer-events-none fixed inset-0 z-0 will-change-transform">
      <Particles
        id="tsparticles"
        options={options}
        particlesLoaded={handleLoaded}
        className="h-full w-full"
      />
    </div>
  );
}
