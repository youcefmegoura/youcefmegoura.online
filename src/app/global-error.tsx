'use client';

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
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='light'){document.documentElement.setAttribute('data-theme','light')}else{document.documentElement.setAttribute('data-theme','dark')}}catch(e){document.documentElement.setAttribute('data-theme','dark')}})()`,
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
          fontFamily:
            "'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace",
          backgroundColor: '#0a0a0a',
          color: '#ededed',
        }}
      >
        <div style={{ maxWidth: 480, padding: '1.5rem', textAlign: 'center' }}>
          {/* Terminal block */}
          <div
            style={{
              textAlign: 'left',
              backgroundColor: '#18181b',
              border: '1px solid #27272a',
              borderRadius: 12,
              padding: '1.25rem',
              marginBottom: '2rem',
            }}
          >
            <div
              style={{
                display: 'flex',
                gap: 6,
                marginBottom: '0.75rem',
              }}
            >
              <span
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  backgroundColor: 'rgba(239,68,68,0.8)',
                  display: 'inline-block',
                }}
              />
              <span
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  backgroundColor: 'rgba(234,179,8,0.8)',
                  display: 'inline-block',
                }}
              />
              <span
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  backgroundColor: 'rgba(34,197,94,0.8)',
                  display: 'inline-block',
                }}
              />
            </div>
            <p style={{ fontSize: 14, color: '#71717a', margin: 0 }}>
              <span style={{ color: '#22c55e' }}>$</span>{' '}
              <span style={{ color: '#d4d4d8' }}>npm run build</span>
            </p>
            <p
              style={{
                fontSize: 14,
                color: '#f87171',
                margin: '0.5rem 0 0',
              }}
            >
              <span style={{ color: '#71717a' }}>{'>'}</span> Fatal: Something
              went wrong
            </p>
          </div>

          <h1
            style={{
              fontSize: '1.5rem',
              fontWeight: 700,
              margin: '0 0 0.75rem',
              color: '#e4e4e7',
            }}
          >
            Something Went Wrong
          </h1>

          {error.message && (
            <p
              style={{
                fontSize: 12,
                color: '#f87171',
                backgroundColor: 'rgba(239,68,68,0.05)',
                border: '1px solid rgba(239,68,68,0.2)',
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

          <p
            style={{
              fontSize: 14,
              color: '#a1a1aa',
              margin: '0 0 2rem',
              lineHeight: 1.6,
            }}
          >
            An unexpected error occurred. Please try again.
          </p>

          <div
            style={{
              display: 'flex',
              gap: 12,
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            <button
              onClick={reset}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '0.625rem 1.25rem',
                fontSize: 14,
                fontFamily: 'inherit',
                color: '#22d3ee',
                backgroundColor: 'rgba(6,182,212,0.1)',
                border: '1px solid rgba(6,182,212,0.2)',
                borderRadius: 8,
                cursor: 'pointer',
                transition: 'background-color 0.2s',
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor =
                  'rgba(6,182,212,0.2)')
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor =
                  'rgba(6,182,212,0.1)')
              }
            >
              ↻ Try Again
            </button>
            <a
              href="/"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '0.625rem 1.25rem',
                fontSize: 14,
                fontFamily: 'inherit',
                color: '#a1a1aa',
                backgroundColor: 'transparent',
                border: '1px solid #3f3f46',
                borderRadius: 8,
                textDecoration: 'none',
                transition: 'border-color 0.2s',
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.borderColor = '#52525b')
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.borderColor = '#3f3f46')
              }
            >
              ← Back to Home
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}
