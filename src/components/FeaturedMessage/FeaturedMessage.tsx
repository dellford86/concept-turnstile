import React from 'react';

export interface FeaturedMessageProps {
  image: string;
  imageAlt?: string;
  message: string;
  onClick?: () => void;
}

/**
 * A single promo/feed card — full-bleed photo with the message title overlaid at the
 * bottom, on a gradient scrim for legibility. The game-view screen lists these
 * horizontally (see GameViewScreen); this component only owns one card's look, same
 * division of responsibility as Sponsor/Button not knowing their own page position.
 */
export function FeaturedMessage({ image, imageAlt = '', message, onClick }: FeaturedMessageProps) {
  return (
    <div
      data-name="feed-feature-msg"
      onClick={onClick}
      style={{
        width: 313,
        height: 201,
        flexShrink: 0,
        position: 'relative',
        background: 'var(--background-surface)',
        border: '1px solid var(--outline-light)',
        borderRadius: 'var(--radius-lrg)',
        boxShadow: 'var(--shadow-card-high)',
        overflow: 'hidden',
        cursor: onClick ? 'pointer' : undefined,
      }}
    >
      <img src={image} alt={imageAlt} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
      <div
        data-name="title-overlay"
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 100,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: 'var(--spacing-lrg)',
          boxSizing: 'border-box',
          background: 'linear-gradient(to top, var(--background-overlay-strong), transparent)',
        }}
      >
        <p
          style={{
            margin: 0,
            fontFamily: 'var(--font-family-figtree)',
            fontWeight: 'var(--font-weight-semibold)',
            fontSize: 'var(--text-heading-m-font-size)',
            lineHeight: 'var(--text-heading-m-line-height)',
            color: 'var(--foreground-light-pr)',
          }}
        >
          {message}
        </p>
      </div>
    </div>
  );
}
