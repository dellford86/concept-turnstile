import { useEffect, useRef, useState } from 'react';

export interface MockTrendDataOptions {
  minDelayMs: number;
  maxDelayMs: number;
  /** Max drift per nudged point, in the same normalized units as the data values. */
  maxStep: number;
}

/**
 * Simulates the guess-distribution curve reshaping as more fans submit guesses —
 * each tick nudges a small cluster of neighboring points (not the whole curve), so it
 * reads as one new guess smoothing part of the distribution rather than a jump cut.
 */
export function useMockTrendData(initialData: number[], options: MockTrendDataOptions): number[] {
  const [data, setData] = useState(initialData);
  const optionsRef = useRef(options);

  useEffect(() => {
    optionsRef.current = options;
  });

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    function scheduleNext() {
      const { minDelayMs, maxDelayMs } = optionsRef.current;
      const delay = minDelayMs + Math.random() * (maxDelayMs - minDelayMs);
      timeoutId = setTimeout(() => {
        setData((current) => {
          const { maxStep } = optionsRef.current;
          const center = Math.floor(Math.random() * current.length);
          const spread = 2;
          return current.map((value, i) => {
            const distance = Math.abs(i - center);
            if (distance > spread) return value;
            const falloff = 1 - distance / (spread + 1);
            const delta = (Math.random() * 2 - 1) * maxStep * falloff;
            return Math.min(1, Math.max(0, value + delta));
          });
        });
        scheduleNext();
      }, delay);
    }

    scheduleNext();
    return () => clearTimeout(timeoutId);
  }, []);

  return data;
}
