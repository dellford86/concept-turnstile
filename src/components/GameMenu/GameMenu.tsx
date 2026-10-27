import React, { useEffect } from 'react';
import { IconButton } from '../IconButton/IconButton';
import { Switch } from '../Switch/Switch';
import { usePresence } from '../../hooks/usePresence';
import closeOutlineIcon from '../../assets/menu/close-outline.svg';
import '../../styles/motion.css';

export interface GameMenuItem {
  label: string;
  /** 24x24 icon asset (Figma exports these white-filled, for the dark panel). */
  icon: string;
  onClick?: () => void;
  /** Dims the row and makes it untappable (e.g. a destination that isn't built yet). */
  disabled?: boolean;
  /**
   * Shows a dot badge on the icon's top-right (e.g. newly earned achievements on
   * "My Profile"). The string is appended to the row's accessible name.
   */
  badge?: string;
}

export interface GameMenuProps {
  open: boolean;
  onClose: () => void;
  items: GameMenuItem[];
  /** An on/off row pinned to the bottom of the panel (e.g. the post-game demo scenario). */
  toggle?: { label: string; checked: boolean; onChange: (checked: boolean) => void };
}

// Keep in sync with .menu-overlay-exit/.menu-panel-exit's durations in styles/motion.css.
const MENU_EXIT_MS = 250;

const itemStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 'var(--spacing-xl)',
  width: '100%',
  height: 48,
  flexShrink: 0,
  padding: 'var(--spacing-med) var(--spacing-lrg) var(--spacing-med) var(--spacing-xl)',
  border: 'none',
  background: 'transparent',
  boxSizing: 'border-box',
  textAlign: 'left',
};

// Figma specs these labels at Proxima Nova Semibold 16/24 — Figtree here, per the
// font-family note in sideline-fan-ds.tokens.css.
const labelStyle: React.CSSProperties = {
  flex: 1,
  minWidth: 0,
  fontFamily: 'var(--font-family-figtree)',
  fontWeight: 'var(--font-weight-semibold)',
  fontSize: 'var(--text-button-l-font-size)',
  lineHeight: 'var(--text-button-l-line-height)',
  color: 'var(--foreground-light-pr)',
};

/**
 * Left slide-out game menu (Figma "game-menu"), opened from GameHeader's team-logo
 * control. Covers its nearest positioned ancestor: a blurred scrim with the close
 * button, and the 280px panel of menu rows on top. Tapping the scrim, the close button,
 * or pressing Escape calls onClose; the panel slides and the scrim fades back out before
 * unmounting.
 */
export function GameMenu({ open, onClose, items, toggle }: GameMenuProps) {
  const isRendered = usePresence(open, MENU_EXIT_MS);

  useEffect(() => {
    if (!open) return;
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  if (!isRendered) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Game menu"
      data-name="game-menu"
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 10,
        overflow: 'hidden',
        // Ignore taps while closing, so a double-tap can't hit the screen behind.
        pointerEvents: open ? 'auto' : 'none',
      }}
    >
      {/* Scrim + close button fade; the panel is a sibling (not a child) so the
          scrim's opacity animation never fades the panel — it only slides. */}
      <div
        data-name="overlay"
        className={open ? 'menu-overlay-enter' : 'menu-overlay-exit'}
        onClick={onClose}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'var(--background-scrim)',
          backdropFilter: 'blur(var(--blur-overlay))',
          WebkitBackdropFilter: 'blur(var(--blur-overlay))',
          cursor: 'pointer',
        }}
      >
        <IconButton
          autoFocus
          icon={<img src={closeOutlineIcon} alt="" width={24} height={24} style={{ display: 'block' }} />}
          aria-label="Close menu"
          onClick={onClose}
          style={{ position: 'absolute', left: 296, top: 20 }}
        />
      </div>
      <nav
        data-name="container"
        className={open ? 'menu-panel-enter' : 'menu-panel-exit'}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: 280,
          height: '100%',
          padding: 'var(--spacing-lrg) 0',
          boxSizing: 'border-box',
          background: 'var(--background-surface)',
          filter: 'drop-shadow(var(--shadow-panel))',
        }}
      >
        {items.map((item) => {
          const content = (
            <>
              <span style={{ position: 'relative', flexShrink: 0 }}>
                <img src={item.icon} alt="" width={24} height={24} style={{ display: 'block' }} />
                {item.badge && (
                  // Same dot as GameHeader's profile badge (8px accent + 2px light ring =
                  // 12px), scaled to sit on this 24px icon's outline the way that one
                  // sits on the 40px button's edge.
                  <span
                    aria-hidden="true"
                    data-name="badge"
                    style={{
                      position: 'absolute',
                      left: 13,
                      top: -2,
                      width: 12,
                      height: 12,
                      boxSizing: 'border-box',
                      borderRadius: 'var(--radius-pill)',
                      background: 'var(--background-accent)',
                      border: '2px solid var(--foreground-light-pr)',
                      pointerEvents: 'none',
                    }}
                  />
                )}
              </span>
              <span style={labelStyle}>{item.label}</span>
            </>
          );
          return (
            <button
              key={item.label}
              type="button"
              data-name="game-menu / list-item"
              aria-label={item.badge ? `${item.label}, ${item.badge}` : undefined}
              disabled={item.disabled}
              onClick={item.onClick}
              style={{
                ...itemStyle,
                cursor: item.disabled ? 'default' : 'pointer',
                // AP Design System's disabled treatment (e.g. its switch's disabled
                // variants): the whole control at 40% opacity.
                opacity: item.disabled ? 0.4 : undefined,
              }}
            >
              {content}
            </button>
          );
        })}
        {toggle && (
          <Switch
            data-name="game-menu / toggle"
            checked={toggle.checked}
            onChange={toggle.onChange}
            labelPosition="left"
            label={<span style={labelStyle}>{toggle.label}</span>}
            style={{ ...itemStyle, gap: 'var(--spacing-lrg)', marginTop: 'auto' }}
          />
        )}
      </nav>
    </div>
  );
}
