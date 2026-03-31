'use client';

import React from 'react';
import { Award } from 'lucide-react';
import { Reveal, TerminalHeader } from './shared';
import type { Certification, LocalizedString } from '@/lib/types';

interface V3CertificationsProps {
  certifications: Certification[];
  t: (s: LocalizedString) => string;
}

function V3CertificationsInner({ certifications, t }: V3CertificationsProps) {
  return (
    <section
      id="certifications"
      className="border-t border-zinc-800/50 py-24"
      aria-label="Certifications"
    >
      <div className="mx-auto max-w-5xl px-5">
        <TerminalHeader command="gpg --list-certs" />
        <div className="grid gap-6 sm:grid-cols-2">
          {certifications.map((cert, i) => (
            <Reveal key={cert.title} delay={i * 0.08}>
              <div className="rounded-xl border border-zinc-800/60 bg-zinc-900/30 p-6 transition-all hover:border-green-500/20">
                <div className="flex items-start gap-3">
                  <Award className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                  <div>
                    <h3 className="text-sm font-semibold text-zinc-200">
                      {cert.title}
                    </h3>
                    <p className="mt-0.5 text-xs text-cyan-400">
                      {cert.issuer}
                    </p>
                    <p className="mt-2 text-xs text-zinc-500">
                      {t(cert.description)}
                    </p>
                    {cert.date && (
                      <p className="mt-2 font-mono text-[10px] text-zinc-600">
                        issued: {cert.date}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export const V3Certifications = React.memo(V3CertificationsInner);
