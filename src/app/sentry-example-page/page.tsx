"use client";

import * as Sentry from "@sentry/nextjs";

export default function SentryExamplePage() {
  return (
    <div style={{ padding: "2rem", fontFamily: "monospace" }}>
      <h1>Sentry Test Page</h1>
      <p>Click a button to test Sentry error reporting.</p>
      <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
        <button
          onClick={() => {
            throw new Error("Sentry Frontend Test Error");
          }}
          style={{
            padding: "0.75rem 1.5rem",
            cursor: "pointer",
            backgroundColor: "#dc2626",
            color: "white",
            border: "none",
            borderRadius: 6,
            fontSize: 14,
          }}
        >
          Throw Error
        </button>
        <button
          onClick={() => {
            Sentry.captureException(new Error("Sentry Manual Capture Test"));
          }}
          style={{
            padding: "0.75rem 1.5rem",
            cursor: "pointer",
            backgroundColor: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: 6,
            fontSize: 14,
          }}
        >
          captureException
        </button>
      </div>
    </div>
  );
}
