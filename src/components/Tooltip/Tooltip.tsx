import React from 'react';

export interface TooltipProps {
  title: string;
  message: string;
  /**
   * Distance (px) from the tooltip's right edge to the center of its up-pointing arrow —
   * set it to line the arrow up with whatever it's pointing at. Default 21 matches the
   * Figma reference, where the arrow points at a 40px header IconButton whose right edge
   * sits flush with the tooltip's.
   */
  arrowRightOffset?: number;
  className?: string;
  style?: React.CSSProperties;
}

const ARROW_WIDTH = 16;
const ARROW_HEIGHT = 9;

/**
 * Small callout on the team's interactive color with an up-pointing arrow — e.g. Game
 * View's "achievements unlocked" notice under the profile button. Presentational only:
 * the caller owns positioning and show/hide timing. Announced politely to screen readers.
 */
export function Tooltip({ title, message, arrowRightOffset = 21, className, style }: TooltipProps) {
  return (
    <div
      role="status"
      data-name="tooltip"
      className={className}
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        gap: 'var(--spacing-none)',
        padding: 'var(--spacing-med) var(--spacing-lrg)',
        background: 'var(--background-interactive)',
        borderRadius: 'var(--radius-sm)',
        // drop-shadow (not box-shadow) so the arrow casts the same shadow as the body.
        filter: 'drop-shadow(var(--shadow-tooltip))',
        ...style,
      }}
    >
      <p
        style={{
          margin: 0,
          fontFamily: 'var(--font-family-figtree)',
          fontWeight: 'var(--font-weight-semibold)',
          fontSize: 'var(--text-heading-s-font-size)',
          // Figma's heading/s is 14/20, but --text-heading-s-line-height is 18 (and
          // body-m aliases it, so it can't just be bumped). 20 = heading-m's line height.
          lineHeight: 'var(--text-heading-m-line-height)',
          color: 'var(--a11y-on-interactive)',
          width: '100%',
        }}
      >
        {title}
      </p>
      <p
        style={{
          margin: 0,
          fontFamily: 'var(--font-family-figtree)',
          fontWeight: 'var(--font-weight-regular)',
          fontSize: 'var(--text-body-m-font-size)',
          lineHeight: 'var(--text-body-m-line-height)',
          color: 'var(--foreground-light-secondary)',
          textAlign: 'center',
          whiteSpace: 'nowrap',
          width: '100%',
        }}
      >
        {message}
      </p>
      <svg
        aria-hidden="true"
        width={ARROW_WIDTH}
        height={ARROW_HEIGHT}
        viewBox="0 0 16 9"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ position: 'absolute', top: -ARROW_HEIGHT, right: arrowRightOffset - ARROW_WIDTH / 2, display: 'block' }}
      >
        <path d="M8 0L16 9H0L8 0Z" fill="var(--background-interactive)" />
      </svg>
    </div>
  );
}
