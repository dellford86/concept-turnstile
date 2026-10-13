import React from 'react';
import './Button.css';

export type ButtonVariant = 'primary' | 'outline';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  /** Optional 24x24 leading icon. Omitted entirely when not provided — no empty slot rendered. */
  icon?: React.ReactNode;
}

const labelStyle: React.CSSProperties = {
  fontFamily: 'var(--font-family-figtree)',
  fontWeight: 'var(--font-weight-semibold)',
  fontSize: 'var(--text-button-l-font-size)',
  lineHeight: 'var(--text-button-l-line-height)',
  letterSpacing: '1px',
  textTransform: 'uppercase',
  whiteSpace: 'nowrap',
};

export function Button({ variant = 'primary', icon, children, style, className, ...rest }: ButtonProps) {
  const base: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 'var(--spacing-med)',
    minWidth: 200,
    paddingInline: 'var(--spacing-xl)',
    borderRadius: 'var(--radius-pill)',
    border: 'none',
    cursor: 'pointer',
  };

  const variantStyle: React.CSSProperties =
    variant === 'primary'
      ? {
          // Background lives in Button.css for this variant, not here — see the
          // comment there for why (:hover/:active need to win over an inline style).
          paddingBlock: 'var(--spacing-lrg)',
          color: 'var(--a11y-on-interactive)',
        }
      : {
          height: 48,
          background: 'transparent',
          border: '1px solid var(--outline-light)',
          color: 'var(--foreground-light-pr)',
        };

  return (
    <button
      type="button"
      data-name={`${variant}-button`}
      className={[variant === 'primary' ? 'primary-button' : undefined, className].filter(Boolean).join(' ') || undefined}
      style={{ ...base, ...variantStyle, ...style }}
      {...rest}
    >
      {icon}
      <span style={labelStyle}>{children}</span>
    </button>
  );
}
