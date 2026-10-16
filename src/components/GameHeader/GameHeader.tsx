import React from 'react';
import { IconButton } from '../IconButton/IconButton';
import { UserIcon } from '../IconButton/UserIcon';
import { Chip } from '../Chip/Chip';

export interface GameHeaderProps {
  teamLogo: string;
  teamLogoAlt?: string;
  /** e.g. "TB vs NO" */
  gameLabel: string;
  /** e.g. "IN PROGRESS". Omit to render no status chip at all (e.g. before the poll closes). */
  statusLabel?: string;
  /** e.g. "Dec 20" */
  date: string;
  /** e.g. "1:00 PM ET" */
  time: string;
  onMenuClick?: () => void;
  onViewProfile?: () => void;
  /** Shows a dot badge on the profile button's top-right corner — e.g. newly earned achievements. */
  profileBadge?: boolean;
}

/**
 * The in-game top bar: team logo + menu control, matchup label, status chip, date/time.
 * Sits on top of Background — not inside it — so it works over any photo treatment.
 */
export function GameHeader({
  teamLogo,
  teamLogoAlt = 'Team logo',
  gameLabel,
  statusLabel,
  date,
  time,
  onMenuClick,
  onViewProfile,
  profileBadge = false,
}: GameHeaderProps) {
  return (
    <div data-name="rundown-header" style={{ height: 72, flexShrink: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100%' }}>
      <div style={{ display: 'flex', gap: 16, alignItems: 'center', padding: '0 16px', width: '100%', boxSizing: 'border-box' }}>
        <button
          type="button"
          data-name="menu-cta"
          onClick={onMenuClick}
          disabled={!onMenuClick}
          style={{
            position: 'relative',
            width: 55,
            height: 24,
            flexShrink: 0,
            border: 'none',
            padding: 0,
            background: 'transparent',
            cursor: onMenuClick ? 'pointer' : 'default',
          }}
        >
          <div style={{ position: 'absolute', inset: 0, background: 'var(--background-surface-light)', borderRadius: 14 }} />
          <div
            style={{
              position: 'absolute',
              left: 40,
              top: 5,
              width: 6,
              height: 12,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg width="12" height="6" viewBox="0 0 12 6" fill="none" style={{ transform: 'rotate(90deg)' }}>
              <path d="M6 0L0 6H12L6 0Z" fill="var(--foreground-light-pr)" />
            </svg>
          </div>
          <div style={{ position: 'absolute', left: -8, top: -10, width: 44, height: 44, borderRadius: 'var(--radius-pill)', overflow: 'hidden' }}>
            <img src={teamLogo} alt={teamLogoAlt} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          </div>
        </button>

        <div data-name="game name + date + time" style={{ display: 'flex', flexDirection: 'column', gap: 2, flex: 1, minWidth: 0 }}>
          <p
            style={{
              margin: 0,
              width: '100%',
              fontFamily: 'var(--font-family-figtree)',
              fontWeight: 'var(--font-weight-semibold)',
              fontSize: 'var(--text-heading-m-font-size)',
              lineHeight: 'var(--text-heading-m-line-height)',
              color: 'var(--foreground-light-pr)',
            }}
          >
            {gameLabel}
          </p>
          <div data-name="date-and-time" style={{ display: 'flex', gap: 4, alignItems: 'center', width: '100%' }}>
            {statusLabel && <Chip label={statusLabel} />}
            <p
              style={{
                margin: 0,
                fontFamily: 'var(--font-family-figtree)',
                fontWeight: 'var(--font-weight-regular)',
                fontSize: 'var(--text-body-m-font-size)',
                lineHeight: 'var(--text-body-m-line-height)',
                color: 'var(--foreground-light-pr)',
                whiteSpace: 'nowrap',
              }}
            >
              {date}
            </p>
            <p
              style={{
                margin: 0,
                flex: 1,
                minWidth: 0,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                fontFamily: 'var(--font-family-figtree)',
                fontWeight: 'var(--font-weight-regular)',
                fontSize: 'var(--text-body-m-font-size)',
                lineHeight: 'var(--text-body-m-line-height)',
                color: 'var(--foreground-light-pr)',
                whiteSpace: 'nowrap',
              }}
            >
              {time}
            </p>
          </div>
        </div>

        <div data-name="actions" style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
          <div style={{ position: 'relative' }}>
            <IconButton
              icon={<UserIcon size={24} />}
              aria-label={profileBadge ? 'View profile, new achievements' : 'View profile'}
              onClick={onViewProfile}
              disabled={!onViewProfile}
              style={{ background: 'var(--background-surface-light)' }}
            />
            {profileBadge && (
              // Figma: 8px accent dot at (29, 1) on the 40px button with a 2px light ring
              // straddling its edge, so the visible circle is 12px at (27, -1).
              <span
                aria-hidden="true"
                data-name="badge"
                style={{
                  position: 'absolute',
                  left: 27,
                  top: -1,
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
          </div>
        </div>
      </div>
    </div>
  );
}
