import { useEffect, useState } from 'react';

/**
 * Keeps an overlay mounted through its exit animation: returns true while `open`, and
 * for `exitMs` after `open` goes false, then false so the caller can unmount. Callers
 * pick their enter/exit animation class from `open` itself.
 */
export function usePresence(open: boolean, exitMs: number): boolean {
  const [isRendered, setIsRendered] = useState(open);
  if (open && !isRendered) setIsRendered(true);

  useEffect(() => {
    if (open || !isRendered) return;
    const timer = window.setTimeout(() => setIsRendered(false), exitMs);
    return () => window.clearTimeout(timer);
  }, [open, isRendered, exitMs]);

  return isRendered;
}
