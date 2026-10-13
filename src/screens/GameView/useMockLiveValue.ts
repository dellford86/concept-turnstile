import { useEffect, useRef, useState } from 'react';

export interface MockLiveValueOptions {
  /** Random delay range (ms) between updates — irregular ticks read as more organic than a fixed interval. */
  minDelayMs: number;
  maxDelayMs: number;
  /** Magnitude range for each step. */
  minStep: number;
  maxStep: number;
  /** When true, each step is randomly + or - (a drifting value); otherwise always +. */
  allowNegativeStep?: boolean;
  /** Floor the value won't drop below. */
  min?: number;
}

/**
 * Simulates a live-updating stat we don't actually have a real data source for yet
 * (e.g. concurrent players, average guess) — ticks on a random interval with a random
 * step, so it reads as organic activity rather than a mechanical counter.
 */
export function useMockLiveValue(initialValue: number, options: MockLiveValueOptions): number {
  const [value, setValue] = useState(initialValue);
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
        setValue((current) => {
          const { minStep, maxStep, allowNegativeStep, min } = optionsRef.current;
          let step = Math.round(minStep + Math.random() * (maxStep - minStep));
          if (allowNegativeStep && Math.random() < 0.5) step = -step;
          const next = current + step;
          return min !== undefined ? Math.max(min, next) : next;
        });
        scheduleNext();
      }, delay);
    }

    scheduleNext();
    return () => clearTimeout(timeoutId);
  }, []);

  return value;
}
