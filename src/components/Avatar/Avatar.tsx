import React from 'react';
import { UserIcon } from '../IconButton/UserIcon';

/**
 * 80x80 circular profile avatar — team-colored background (matches the active
 * [data-team]'s --background-interactive) with a centered person glyph. Currently
 * always the generic UserIcon; swap to a real profile photo later by extending this
 * with an optional `image` prop, same pattern as Sponsor's `logo`.
 */
export function Avatar() {
  return (
    <div
      data-name="avatar"
      style={{
        width: 80,
        height: 80,
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--background-interactive)',
        borderRadius: 'var(--radius-pill)',
      }}
    >
      <UserIcon size={48} color="var(--a11y-on-interactive)" />
    </div>
  );
}
