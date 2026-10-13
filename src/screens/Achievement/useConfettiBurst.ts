import { useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';

/**
 * canvas-confetti fades every piece linearly over its lifetime (`ticks`, ~60/s). A huge
 * lifetime keeps pieces visually solid (~4% faded at most) for the ~5s they take to fall
 * off the bottom of the screen; the canvas is then cleared at CLEAR_AFTER_MS so the
 * animation loop doesn't keep running on off-screen pieces.
 */
const LIFETIME_TICKS = 10000;
const CLEAR_AFTER_MS = 10000;

/** Team-themed tokens the confetti pieces are drawn in (resolved at fire time). */
const COLOR_TOKENS = ['--background-accent', '--background-interactive', '--foreground-light-pr'];

/**
 * One-shot confetti burst on a canvas scoped to the screen (not the whole page), fired
 * `delayMs` after mount from the center of the `origin` element. No-op when `enabled` is
 * false; canvas-confetti itself skips it under prefers-reduced-motion.
 */
export function useConfettiBurst({ enabled, delayMs }: { enabled: boolean; delayMs: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const originRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!enabled || !canvas) return;
    const fire = confetti.create(canvas, { resize: true, disableForReducedMotion: true });

    const timer = window.setTimeout(() => {
      const origin = originRef.current;
      if (!origin) return;
      const styles = getComputedStyle(canvas);
      const colors = COLOR_TOKENS.map((token) => styles.getPropertyValue(token).trim()).filter(Boolean);
      const c = canvas.getBoundingClientRect();
      const o = origin.getBoundingClientRect();
      const point = { x: (o.left + o.width / 2 - c.left) / c.width, y: (o.top + o.height / 2 - c.top) / c.height };
      const shared = { origin: point, colors, ticks: LIFETIME_TICKS, gravity: 1.2, scalar: 0.9, disableForReducedMotion: true };

      // A wide center pop plus two angled side sprays, like it bursts out of the badge.
      void fire({ ...shared, particleCount: 70, spread: 100, startVelocity: 38 });
      void fire({ ...shared, particleCount: 35, angle: 60, spread: 55, startVelocity: 45 });
      void fire({ ...shared, particleCount: 35, angle: 120, spread: 55, startVelocity: 45 });
    }, delayMs);
    const clearTimer = window.setTimeout(() => fire.reset(), delayMs + CLEAR_AFTER_MS);

    return () => {
      window.clearTimeout(timer);
      window.clearTimeout(clearTimer);
      fire.reset();
    };
  }, [enabled, delayMs]);

  return { canvasRef, originRef };
}
