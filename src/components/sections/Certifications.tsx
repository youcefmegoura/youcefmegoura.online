'use client';

import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Certification as CertType, UIStrings, LocalizedString } from '@/lib/types';
import { useTranslation } from '@/lib/i18n';
import { SectionHeading } from '@/components/shared/SectionHeading';

interface CertificationsProps {
  certifications: CertType[];
  ui: UIStrings;
}

export function Certifications({ certifications, ui }: CertificationsProps) {
  const t = useTranslation();
  const [current, setCurrent] = useState(0);
  const total = certifications.length;

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % total);
  }, [total]);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Auto-rotation
  useEffect(() => {
    if (total <= 1) return;
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, [next, total]);

  if (total === 0) return null;

  const cert = certifications[current];

  return (
    <section id="certifications" className="py-20 px-4 sm:px-6 bg-surface">
      <div className="max-w-3xl mx-auto">
        <SectionHeading title={t(ui.certifications)} />

        <div className="relative">
          {/* Card */}
          <div className="bg-card rounded-xl border border-border p-8 sm:p-10 text-center shadow-sm min-h-[200px] flex flex-col items-center justify-center">
            <h3 className="text-xl font-bold text-foreground">{cert.title}</h3>
            <p className="text-accent font-semibold text-sm mt-2">{cert.issuer}</p>
            {cert.date && (
              <p className="text-xs text-muted mt-1">{cert.date}</p>
            )}
            <p className="text-foreground text-sm mt-4 leading-relaxed max-w-md">
              {t(cert.description)}
            </p>

            {/* Dots indicator */}
            {total > 1 && (
              <div className="flex items-center gap-2 mt-6">
                {certifications.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    aria-label={`Go to certification ${i + 1}`}
                    className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                      i === current ? 'bg-accent' : 'bg-border'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Navigation arrows */}
          {total > 1 && (
            <>
              <button
                onClick={prev}
                aria-label="Previous certification"
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 sm:-translate-x-6 p-2 rounded-full bg-card border border-border text-muted hover:text-foreground hover:bg-surface transition-colors shadow-sm"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={next}
                aria-label="Next certification"
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 sm:translate-x-6 p-2 rounded-full bg-card border border-border text-muted hover:text-foreground hover:bg-surface transition-colors shadow-sm"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
