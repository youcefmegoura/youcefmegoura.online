'use client';

import { useState, useEffect, useCallback } from 'react';
import { Download, ExternalLink } from 'lucide-react';
import type { Profile, Meta, UIStrings } from '@/lib/types';
import { useTranslation } from '@/lib/i18n';

interface HeroProps {
  profile: Profile;
  meta: Meta;
  ui: UIStrings;
}

function useTypedAnimation(strings: string[], typingSpeed = 80, deletingSpeed = 40, pauseTime = 2000) {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const animate = useCallback(() => {
    const currentString = strings[currentIndex] || '';

    if (!isDeleting) {
      if (displayText.length < currentString.length) {
        return setTimeout(() => {
          setDisplayText(currentString.slice(0, displayText.length + 1));
        }, typingSpeed);
      } else {
        return setTimeout(() => setIsDeleting(true), pauseTime);
      }
    } else {
      if (displayText.length > 0) {
        return setTimeout(() => {
          setDisplayText(currentString.slice(0, displayText.length - 1));
        }, deletingSpeed);
      } else {
        setIsDeleting(false);
        setCurrentIndex((prev) => (prev + 1) % strings.length);
        return undefined;
      }
    }
  }, [displayText, currentIndex, isDeleting, strings, typingSpeed, deletingSpeed, pauseTime]);

  useEffect(() => {
    if (strings.length === 0) return;
    const timeout = animate();
    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [animate, strings.length]);

  return displayText;
}

export function Hero({ profile, meta, ui }: HeroProps) {
  const t = useTranslation();

  const titleVariants = [
    t(profile.title),
    t(profile.tagline),
  ];
  const typedText = useTypedAnimation(titleVariants);

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 pt-16">
      <div className="max-w-3xl mx-auto text-center flex flex-col items-center gap-6">
        {/* Profile photo */}
        <div className="relative">
          <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-full overflow-hidden border-4 border-accent shadow-lg">
            <img
              src={profile.photo}
              alt={profile.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Name */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground tracking-tight">
          {profile.name}
        </h1>

        {/* Typed title */}
        <div className="h-8 sm:h-10 flex items-center justify-center">
          <span className="text-lg sm:text-xl text-accent font-medium">
            {typedText}
            <span className="animate-pulse">|</span>
          </span>
        </div>

        {/* Tagline */}
        <p className="text-muted text-base sm:text-lg max-w-xl leading-relaxed">
          {t(profile.summary)}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 mt-4">
          <a
            href={meta.cv_download_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground font-semibold rounded-lg hover:bg-accent-hover transition-colors duration-200 shadow-md"
          >
            <Download className="w-4 h-4" />
            {t(ui.download_cv)}
          </a>
          <a
            href={meta.detailed_experience_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 border border-border text-foreground font-semibold rounded-lg hover:bg-surface transition-colors duration-200"
          >
            <ExternalLink className="w-4 h-4" />
            {t(ui.detailed_experience)}
          </a>
        </div>
      </div>
    </section>
  );
}
