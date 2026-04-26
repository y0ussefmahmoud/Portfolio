/**
 * Sentry Configuration
 * 
 * Error tracking and monitoring setup using Sentry.
 * Initialize Sentry with your DSN from Sentry dashboard.
 * 
 * Note: Replace 'YOUR_SENTRY_DSN' with your actual Sentry DSN
 * from https://sentry.io/settings/projects/
 */

import * as Sentry from '@sentry/react';

// Initialize Sentry
Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN || 'YOUR_SENTRY_DSN',
  // Environment
  environment: import.meta.env.MODE,
  // Release
  release: 'portfolio-v3.0.0',
  // Sample rate for errors (100% in production)
  sampleRate: 1.0,
  // Filter out errors from development
  beforeSend(event, hint) {
    if (import.meta.env.MODE === 'development') {
      console.log('Sentry Event:', event);
      return null; // Don't send events in development
    }
    return event;
  },
});

export default Sentry;
