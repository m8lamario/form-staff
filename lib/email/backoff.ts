export const MAX_EMAIL_ATTEMPTS = 5;

const BACKOFF_MS = [60_000, 5 * 60_000, 15 * 60_000, 60 * 60_000, 6 * 60 * 60_000];

export function nextBackoffMs(attemptsAfterFailure: number): number {
  const index = Math.min(Math.max(attemptsAfterFailure, 1), BACKOFF_MS.length) - 1;
  return BACKOFF_MS[index];
}
