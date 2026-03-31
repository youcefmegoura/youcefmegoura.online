'use client';

import { Reveal, TerminalHeader } from './shared';
import type { Meta, LocalizedString } from '@/lib/types';

interface V3ContactProps {
  meta: Meta;
  locale: string;
  t: (s: LocalizedString) => string;
}

export function V3Contact({ meta, locale }: V3ContactProps) {
  return (
    <section
      id="contact"
      className="border-t border-zinc-800/50 py-24"
      aria-label="Contact"
    >
      <div className="mx-auto max-w-5xl px-5">
        <TerminalHeader command="echo $CONTACT_INFO" />
        <Reveal>
          <div className="mx-auto max-w-2xl">
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 md:p-8">
              {/* terminal window chrome */}
              <div className="mb-6 flex items-center gap-2 border-b border-zinc-800 pb-4">
                <span className="h-3 w-3 rounded-full bg-red-500/80" aria-hidden="true" />
                <span className="h-3 w-3 rounded-full bg-yellow-500/80" aria-hidden="true" />
                <span className="h-3 w-3 rounded-full bg-green-500/80" aria-hidden="true" />
                <span className="ml-3 font-mono text-xs text-zinc-600">
                  contact.sh
                </span>
              </div>

              <div className="space-y-3 font-mono text-sm">
                <p>
                  <span className="text-zinc-600">{'>'}</span>{' '}
                  <span className="text-cyan-400">email</span>{' '}
                  <span className="text-zinc-600">=</span>{' '}
                  <a
                    href={`mailto:${meta.social.email}`}
                    className="text-green-400 hover:underline"
                  >
                    &quot;{meta.social.email}&quot;
                  </a>
                </p>
                <p>
                  <span className="text-zinc-600">{'>'}</span>{' '}
                  <span className="text-cyan-400">phone</span>{' '}
                  <span className="text-zinc-600">=</span>{' '}
                  <a
                    href={`tel:${meta.social.phone}`}
                    className="text-green-400 hover:underline"
                  >
                    &quot;{meta.social.phone}&quot;
                  </a>
                </p>
                <p>
                  <span className="text-zinc-600">{'>'}</span>{' '}
                  <span className="text-cyan-400">linkedin</span>{' '}
                  <span className="text-zinc-600">=</span>{' '}
                  <a
                    href={meta.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-400 hover:underline"
                  >
                    &quot;{meta.social.linkedin.replace('https://www.', '')}&quot;
                  </a>
                </p>
                <p>
                  <span className="text-zinc-600">{'>'}</span>{' '}
                  <span className="text-cyan-400">github</span>{' '}
                  <span className="text-zinc-600">=</span>{' '}
                  <a
                    href={meta.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-400 hover:underline"
                  >
                    &quot;{meta.social.github.replace('https://', '')}&quot;
                  </a>
                </p>
              </div>

              <div className="mt-6 border-t border-zinc-800 pt-4">
                <p className="text-xs text-zinc-500">
                  <span className="text-green-500">$</span>{' '}
                  {locale === 'fr'
                    ? "N'hésitez pas à me contacter 🚀"
                    : "Don't hesitate to reach out 🚀"}
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
