'use client';

import type { CSSProperties } from 'react';

/* ─── design tokens (inline — no Tailwind available in global error) ─── */
const tokens = {
  bg: '#0a0a0a',
  fg: '#ededed',
  muted: '#a1a1aa',
  card: '#18181b',
  border: '#27272a',
  cyan: '#22d3ee',
  cyanBg: 'rgba(6,182,212,0.1)',
  cyanBorder: 'rgba(6,182,212,0.2)',
  cyanHover: 'rgba(6,182,212,0.2)',
  red: '#f87171',
  redBg: 'rgba(239,68,68,0.05)',
  redBorder: 'rgba(239,68,68,0.2)',
  green: '#22c55e',
  font: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace",
} as const;

const dot = (color: string): CSSProperties => ({
  width: 12,
  height: 12,
  borderRadius: '50%',
  backgroundColor: color,
  display: 'inline-block',
});

const btnBase: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 8,
  padding: '0.625rem 1.25rem',
  fontSize: 14,
  fontFamily: 'inherit',
  borderRadius: 8,
  cursor: 'pointer',
  transition: 'background-color 0.2s, border-color 0.2s',
};

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Error — Youcef Megoura</title>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='light')document.documentElement.setAttribute('data-theme','light');else document.documentElement.setAttribute('data-theme','dark')}catch(e){document.documentElement.setAttribute('data-theme','dark')}})()`,
          }}
        />
      </head>
      <body
        style={{
          margin: 0,
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: tokens.font,
          backgroundColor: tokens.bg,
          color: tokens.fg,
        }}
      >
        <div style={{ maxWidth: 480, padding: '1.5rem', textAlign: 'center' }}>
          {/* Terminal block */}
          <div
            style={{
              textAlign: 'left',
              backgroundColor: tokens.card,
              border: `1px solid ${tokens.border}`,
              borderRadius: 12,
              padding: '1.25rem',
              marginBottom: '2rem',
            }}
          >
            <div style={{ display: 'flex', gap: 6, marginBottom: '0.75rem' }}>
              <span style={dot('rgba(239,68,68,0.8)')} />
              <span style={dot('rgba(234,179,8,0.8)')} />
              <span style={dot('rgba(34,197,94,0.8)')} />
            </div>
            <p style={{ fontSize: 14, color: tokens.muted, margin: 0 }}>
              <span style={{ color: tokens.green }}>$</span>{' '}
              <span style={{ color: '#d4d4d8' }}>npm run build</span>
            </p>
            <p style={{ fontSize: 14, color: tokens.red, margin: '0.5rem 0 0' }}>
              <span style={{ color: tokens.muted }}>{'>'}</span> Fatal: Something went wrong
            </p>
          </div>

          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, margin: '0 0 0.75rem', color: '#e4e4e7' }}>
            Something Went Wrong
          </h1>

          {error.message && (
            <p
              style={{
                fontSize: 12,
                color: tokens.red,
                backgroundColor: tokens.redBg,
                border: `1px solid ${tokens.redBorder}`,
                borderRadius: 8,
                padding: '0.75rem 1rem',
                margin: '0 0 1rem',
                wordBreak: 'break-all',
                textAlign: 'left',
              }}
            >
              {error.message}
            </p>
          )}

          <p style={{ fontSize: 14, color: tokens.muted, margin: '0 0 2rem', lineHeight: 1.6 }}>
            An unexpected error occurred. Please try again.
          </p>

          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={reset}
              style={{
                ...btnBase,
                color: tokens.cyan,
                backgroundColor: tokens.cyanBg,
                border: `1px solid ${tokens.cyanBorder}`,
              }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = tokens.cyanHover)}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = tokens.cyanBg)}
            >
              ↻ Try Again
            </button>
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- Root error boundary cannot use Next.js router */}
            <a
              href="/"
              style={{
                ...btnBase,
                color: tokens.muted,
                backgroundColor: 'transparent',
                border: `1px solid ${tokens.border}`,
                textDecoration: 'none',
              }}
              onMouseOver={(e) => (e.currentTarget.style.borderColor = '#52525b')}
              onMouseOut={(e) => (e.currentTarget.style.borderColor = tokens.border)}
            >
              ← Back to Home
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}
