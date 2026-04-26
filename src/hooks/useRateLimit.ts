/**
 * useRateLimit Hook
 * 
 * Custom hook for rate limiting form submissions.
 * Prevents spam by limiting the number of submissions within a time window.
 * 
 * @param maxAttempts - Maximum number of attempts allowed
 * @param windowMs - Time window in milliseconds
 * @returns Object with canSubmit, remainingAttempts, and reset function
 */

import { useState, useCallback, useRef } from 'react';

interface UseRateLimitReturn {
  canSubmit: boolean;
  remainingAttempts: number;
  reset: () => void;
  recordAttempt: () => void;
}

export const useRateLimit = (
  maxAttempts: number = 3,
  windowMs: number = 60000 // 1 minute default
): UseRateLimitReturn => {
  const [attempts, setAttempts] = useState<number[]>([]);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cleanupOldAttempts = useCallback(() => {
    const now = Date.now();
    setAttempts(prev => prev.filter(timestamp => now - timestamp < windowMs));
  }, [windowMs]);

  const canSubmit = attempts.length < maxAttempts;
  const remainingAttempts = Math.max(0, maxAttempts - attempts.length);

  const recordAttempt = useCallback(() => {
    cleanupOldAttempts();
    setAttempts(prev => [...prev, Date.now()]);

    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set timeout to clean up this attempt after windowMs
    timeoutRef.current = setTimeout(() => {
      cleanupOldAttempts();
    }, windowMs);
  }, [cleanupOldAttempts, windowMs]);

  const reset = useCallback(() => {
    setAttempts([]);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  return {
    canSubmit,
    remainingAttempts,
    reset,
    recordAttempt,
  };
};
