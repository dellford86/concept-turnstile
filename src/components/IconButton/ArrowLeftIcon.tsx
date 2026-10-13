import React from 'react';

export interface ArrowLeftIconProps {
  /** Renders as a square at this size. Omit to keep Profile's original 22x19 box. */
  size?: number;
}

/** Back/navigate-back glyph — used in ProfileScreen's banner and AchievementScreen. */
export function ArrowLeftIcon({ size }: ArrowLeftIconProps = {}) {
  return (
    <svg width={size ?? 22} height={size ?? 19} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M11.2031 3C11.018 3 10.8329 3.07198 10.6992 3.20565L2.20566 11.6992C1.92802 11.9769 1.92802 12.4293 2.20566 12.7069L10.6992 21.2005C10.8329 21.3342 11.0077 21.4062 11.2031 21.4062C11.3882 21.4062 11.5733 21.3342 11.7069 21.2005C11.9846 20.9229 11.9846 20.4704 11.7069 20.1928L4.51928 13.0051L21.2802 13.0051C21.671 13.0051 22 12.6864 22 12.2853C22 11.8843 21.6812 11.5656 21.2802 11.5656L4.35476 11.5656L11.7172 4.20308C11.9949 3.92545 11.9949 3.47301 11.7172 3.19537C11.5835 3.0617 11.3985 2.98972 11.2134 2.98972L11.2031 3Z"
        fill="var(--foreground-light-pr)"
      />
    </svg>
  );
}
