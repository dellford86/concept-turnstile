import React from 'react';

export type SponsorShadow = 'card' | 'modal';

export interface SponsorProps {
  /** Sponsor logo. Data-supplied — varies per sponsor/game, never hardcoded. */
  logo: string;
  /** Sponsor name, for alt text. Falls back to a generic label if not provided. */
  name?: string;
  /**
   * 'card' (default) for a free-standing badge in normal flow (e.g. the form screens'
   * sponsor pill). 'modal' for a badge absolutely positioned overlapping another
   * surface's edge (e.g. straddling the game-details card border on Welcome) — matches
   * the two shadow treatments seen in the Figma file for this element.
   */
  shadow?: SponsorShadow;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * The sponsor badge pill — bg-surface, bordered, fully rounded, centered logo. Appears
 * repeatedly across the game experience (Welcome, forms, Game View); this component
 * owns its own look only. Positioning (static vs. absolute-overlap, offset) is the
 * caller's responsibility, same as Button doesn't know its own page position.
 */
export function Sponsor({ logo, name = 'Sponsor', shadow = 'card', className, style }: SponsorProps) {
  return (
    <div
      data-name="sponsor"
      className={className}
      style={{
        width: 160,
        height: 48,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--background-surface)',
        border: '1px solid var(--outline-light)',
        borderRadius: 'var(--radius-pill)',
        boxShadow: shadow === 'modal' ? 'var(--shadow-modal)' : 'var(--shadow-card-high)',
        overflow: 'hidden',
        ...style,
      }}
    >
      <img src={logo} alt={name} style={{ width: 73, height: 24, objectFit: 'cover' }} />
    </div>
  );
}
