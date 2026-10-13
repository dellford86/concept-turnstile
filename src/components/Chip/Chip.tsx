import React from 'react';

export interface ChipProps {
  /** Rendered uppercase, e.g. "In Progress" or "New". */
  label: string;
  style?: React.CSSProperties;
}

/**
 * Small accent-colored status tag (heading/xs, uppercase) — GameHeader's "IN PROGRESS"
 * chip and the Achievements tab's "NEW" tag. The caller owns positioning via `style`.
 */
export function Chip({ label, style }: ChipProps) {
  return (
    <div
      data-name="chip"
      style={{
        background: 'var(--background-accent)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2px 4px',
        borderRadius: 4,
        flexShrink: 0,
        ...style,
      }}
    >
      <p
        style={{
          margin: 0,
          fontFamily: 'var(--font-family-figtree)',
          fontWeight: 'var(--font-weight-semibold)',
          fontSize: 'var(--text-heading-xs-font-size)',
          lineHeight: 'var(--text-heading-xs-line-height)',
          color: 'var(--a11y-on-accent)',
          textTransform: 'uppercase',
          whiteSpace: 'nowrap',
        }}
      >
        {label}
      </p>
    </div>
  );
}
