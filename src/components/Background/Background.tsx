import React from 'react';
import '../../styles/motion.css';

export interface BackgroundProps {
  /** Hero/background photo. Data-supplied — varies per game/team, never hardcoded. */
  image: string;
  children?: React.ReactNode;
  className?: string;
  /** Figma layer name for this usage (e.g. "page-wrapper") — tags the root as data-name. */
  name?: string;
  /**
   * Plays the team-tint overlay's curtain-lift entrance (fully opaque -> resting 0.88)
   * on mount. Opt-in — only "arrival" screens (Welcome, Splash) should set this; a
   * screen where Background is already on-canvas shouldn't replay it.
   */
  animateIn?: boolean;
}

/**
 * Full-bleed background photo tinted toward the active team's brand color, matching
 * the "bg-img" treatment used across the game experience (Splash, Welcome, Form,
 * Game View). Three stacked overlays desaturate the photo, tint it with the team's
 * color, then darken it slightly for text legibility. Reads --background-hero-tint,
 * which always resolves to the active [data-team]'s brand-bg regardless of the
 * current light/dark theme.
 *
 * Sets data-theme="dark" on its own root: this surface is always visually dark by
 * design, so content placed inside it can safely use dark-theme-resolved tokens
 * (e.g. --foreground-light-pr) without the consumer having to remember to force dark
 * mode themselves. Content still needs a [data-team] ancestor for team-colored tokens
 * (--background-interactive, --background-accent, etc.) to resolve to the right team.
 */
export function Background({ image, children, className, name, animateIn }: BackgroundProps) {
  return (
    <div
      className={className}
      data-name={name}
      data-theme="dark"
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
      }}
    >
      <img
        src={image}
        alt=""
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          pointerEvents: 'none',
        }}
      />
      <div
        data-name="overlay : b&w"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'var(--background-overlay-desaturate)',
          mixBlendMode: 'hue',
        }}
      />
      <div
        data-name="overlay : team background"
        className={animateIn ? 'curtain-lift' : undefined}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'var(--background-hero-tint)',
          ...(animateIn ? {} : { opacity: 0.88 }),
        }}
      />
      <div
        data-name="overlay : dark-overlay"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'var(--background-overlay-desaturate)',
          opacity: 0.16,
        }}
      />
      {children && (
        <div style={{ position: 'relative', height: '100%' }}>{children}</div>
      )}
    </div>
  );
}
