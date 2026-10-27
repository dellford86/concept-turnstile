import React from 'react';

export interface SwitchProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> {
  checked: boolean;
  onChange: (checked: boolean) => void;
  /** Visible label. Its typography is the caller's — pass a styled node to match the surrounding UI. */
  label: React.ReactNode;
  /** Which side of the track the label sits on (Figma: label-pos). */
  labelPosition?: 'left' | 'right';
}

/**
 * On/off switch (AP Design System "switch", node 12:357): a 32x16 pill track with a 12px
 * thumb inset 2px, 16px from its label. The whole row is the tap target. Track is
 * --background-interactive when on, --background-switch-off when off.
 */
export function Switch({ checked, onChange, label, labelPosition = 'right', style, ...rest }: SwitchProps) {
  const track = (
    <span
      aria-hidden="true"
      data-name="switch"
      style={{
        position: 'relative',
        width: 32,
        height: 16,
        flexShrink: 0,
        borderRadius: 'var(--radius-pill)',
        background: checked ? 'var(--background-interactive)' : 'var(--background-switch-off)',
        transition: 'background-color 0.2s ease-out',
      }}
    >
      <span
        style={{
          position: 'absolute',
          top: 2,
          left: 2,
          width: 12,
          height: 12,
          borderRadius: 'var(--radius-pill)',
          background: 'var(--foreground-light-pr)',
          transform: checked ? 'translateX(16px)' : 'none',
          transition: 'transform 0.2s ease-out',
        }}
      />
    </span>
  );

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--spacing-lrg)',
        padding: 0,
        border: 'none',
        background: 'transparent',
        cursor: 'pointer',
        textAlign: 'left',
        ...style,
      }}
      {...rest}
    >
      {labelPosition === 'left' && label}
      {track}
      {labelPosition === 'right' && label}
    </button>
  );
}
