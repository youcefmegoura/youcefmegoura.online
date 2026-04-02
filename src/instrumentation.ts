import * as Sentry from "@sentry/nextjs";

export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    Sentry.init({
      dsn: "https://06981274071df08b0fe6f660214d2648@o4511149778075648.ingest.de.sentry.io/4511152583802960",

      // Only active during build since this is a static export
      tracesSampleRate: 1,
    });
  }

  if (process.env.NEXT_RUNTIME === "edge") {
    Sentry.init({
      dsn: "https://06981274071df08b0fe6f660214d2648@o4511149778075648.ingest.de.sentry.io/4511152583802960",

      tracesSampleRate: 1,
    });
  }
}

export const onRequestError = Sentry.captureRequestError;
