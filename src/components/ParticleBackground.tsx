'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import { useTheme } from '@/lib/theme';
import type { Container, ISourceOptions } from '@tsparticles/engine';

export function ParticleBackground() {
  const { theme } = useTheme();
  const [ready, setReady] = useState(false);
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth < 768 : false,
  );
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() =>
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false,
  );
  const containerRef = useRef<Container | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Subscribe to viewport and reduced-motion changes
  useEffect(() => {
    const updateMobile = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', updateMobile);

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onMotionChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    motionQuery.addEventListener('change', onMotionChange);

    return () => {
      window.removeEventListener('resize', updateMobile);
      motionQuery.removeEventListener('change', onMotionChange);
    };
  }, []);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setReady(true));
  }, []);

  // Smooth parallax: lerp loop eases particles toward scroll target
  useEffect(() => {
    if (prefersReducedMotion) return;

    let currentY = 0;
    let animId: number;

    const animate = () => {
      const targetY = window.scrollY * 0.15;
      currentY += (targetY - currentY) * 0.05;

      if (wrapperRef.current) {
        wrapperRef.current.style.transform = `translateY(${currentY}px)`;
      }

      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, [prefersReducedMotion]);

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
          value: isMobile ? 35 : 80,
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
          distance: isMobile ? 100 : 150,
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
            enable: !isMobile,
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
  }, [theme, isMobile]);

  if (prefersReducedMotion) return null;
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
