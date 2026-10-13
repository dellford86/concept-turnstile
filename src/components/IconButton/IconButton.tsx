import React from 'react';

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
}

/**
 * A 40x40 circular tap target wrapping a single icon — compact actions like editing the
 * attendance guess on Game View. Icon color is the icon's own responsibility (pass a
 * token-driven fill on it), same division as Button's optional `icon` slot.
 */
export function IconButton({ icon, style, ...rest }: IconButtonProps) {
  return (
    <button
      type="button"
      data-name="icon-button"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 40,
        height: 40,
        padding: 'var(--spacing-med)',
        borderRadius: 'var(--radius-pill)',
        border: 'none',
        background: 'transparent',
        cursor: 'pointer',
        boxSizing: 'border-box',
        ...style,
      }}
      {...rest}
    >
      {icon}
    </button>
  );
}
