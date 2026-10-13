/**
 * Shared screen-to-screen transition contract. A screen's root component accepts
 * `transitionState` and applies the resulting class to its own content div only —
 * never to its Background — so the background photo/tint stays visually continuous
 * while content fades out/in on top of it. See App.tsx for the orchestration and
 * styles/motion.css for the .content-fade-in/-out keyframes.
 */
export type ScreenTransitionState = 'entering' | 'exiting';

export function contentTransitionClassName(state?: ScreenTransitionState): string | undefined {
  if (state === 'exiting') return 'content-fade-out';
  if (state === 'entering') return 'content-fade-in';
  return undefined;
}
