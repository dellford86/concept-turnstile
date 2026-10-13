import { useCallback } from 'react';

/** Max rotation (deg) on each axis when the pointer is at the element's edge. */
const MAX_TILT_DEG = 18;

/**
 * Pointer-driven 3D tilt: spread the returned handlers onto an element and it leans
 * toward wherever the pointer is over it, easing back flat on leave. Writes the
 * transform straight to the node (no re-renders per pointermove). No-ops under
 * prefers-reduced-motion.
 */
export function useTilt<T extends HTMLElement>() {
  const onPointerMove = useCallback((event: React.PointerEvent<T>) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const el = event.currentTarget;
    const rect = el.getBoundingClientRect();
    // -0.5..0.5 from the element's center.
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    el.style.transition = 'transform 0.1s ease-out';
    el.style.transform = `perspective(600px) rotateX(${-y * 2 * MAX_TILT_DEG}deg) rotateY(${x * 2 * MAX_TILT_DEG}deg) scale(1.04)`;
  }, []);

  const onPointerLeave = useCallback((event: React.PointerEvent<T>) => {
    const el = event.currentTarget;
    el.style.transition = 'transform 0.4s ease-out';
    el.style.transform = 'perspective(600px) rotateX(0deg) rotateY(0deg) scale(1)';
  }, []);

  return { onPointerMove, onPointerLeave };
}
