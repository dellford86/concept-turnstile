import { useEffect, useState } from 'react';

/**
 * Animates from 0 up to `target` once on mount, easing out so it slows down as it
 * approaches the real value — reads as the number "settling in" rather than a linear
 * odometer tick. Captures `target` at mount time only; later changes don't replay it.
 */
export function useCountUp(target: number, durationMs = 1800): number {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let frameId: number;
    const start = performance.now();

    function tick(now: number) {
      const progress = Math.min(1, (now - start) / durationMs);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) {
        frameId = requestAnimationFrame(tick);
      }
    }

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return value;
}
