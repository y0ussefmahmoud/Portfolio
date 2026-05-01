/**
 * Sentry Configuration
 * 
 * Error tracking and monitoring setup using Sentry.
 * Initialize Sentry with your DSN from Sentry dashboard.
 * 
 * Note: Replace 'YOUR_SENTRY_DSN' with your actual Sentry DSN
 * from https://sentry.io/settings/projects/
 * If no valid DSN is provided, Sentry will not be initialized.
 */

import * as Sentry from '@sentry/react';

const sentryDsn = import.meta.env.VITE_SENTRY_DSN;

// Only initialize Sentry if a valid DSN is provided
if (sentryDsn && sentryDsn !== 'YOUR_SENTRY_DSN' && sentryDsn.startsWith('https://')) {
  Sentry.init({
    dsn: sentryDsn,
    // Environment
    environment: import.meta.env.MODE,
    // Release
    release: 'portfolio-v3.0.0',
    // Sample rate for errors (100% in production)
    sampleRate: 1.0,
    // Performance monitoring - only in production
    tracesSampleRate: import.meta.env.MODE === 'production' ? 1.0 : 0,
    // Filter out errors from development
    beforeSend(event, hint) {
      if (import.meta.env.MODE === 'development') {
        console.log('Sentry Event:', event);
        return null; // Don't send events in development
      }
      return event;
    },
  });
  console.log('Sentry initialized successfully');
} else {
  // Sentry skipped: No valid DSN provided
}

export default Sentry;
