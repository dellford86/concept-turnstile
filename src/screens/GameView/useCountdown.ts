import { useEffect, useState } from 'react';

function pad(n: number): string {
  return String(n).padStart(2, '0');
}

export interface CountdownResult {
  /** HH:MM:SS, clamped at 00:00:00 once targetTimeMs has passed. */
  display: string;
  /** True once targetTimeMs has passed — lets callers react to the poll actually closing. */
  isComplete: boolean;
}

/** Counts down to targetTimeMs, ticking every second. */
export function useCountdown(targetTimeMs: number): CountdownResult {
  const [remainingMs, setRemainingMs] = useState(() => Math.max(0, targetTimeMs - Date.now()));

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingMs(Math.max(0, targetTimeMs - Date.now()));
    }, 1000);
    return () => clearInterval(interval);
  }, [targetTimeMs]);

  const totalSeconds = Math.floor(remainingMs / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return {
    display: `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`,
    isComplete: remainingMs <= 0,
  };
}
