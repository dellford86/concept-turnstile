import React from 'react';
import star from '../../assets/illustrations/star.svg';
import seal from '../../assets/illustrations/seal.svg';
import jewel from '../../assets/illustrations/jewel.svg';
import crown from '../../assets/illustrations/crown.svg';
import shield from '../../assets/illustrations/shield.svg';
import trophy from '../../assets/illustrations/trophy.svg';

export type IllustrationType = 'star' | 'seal' | 'jewel' | 'crown' | 'shield' | 'trophy';

export interface IllustrationProps {
  type: IllustrationType;
  /** Natural size is 104x104 (the Figma source's own canvas); scales as a square. */
  size?: number;
  alt?: string;
}

const SOURCES: Record<IllustrationType, string> = { star, seal, jewel, crown, shield, trophy };

const DEFAULT_ALT: Record<IllustrationType, string> = {
  star: 'Star illustration',
  seal: 'Seal illustration',
  jewel: 'Jewel illustration',
  crown: 'Crown illustration',
  shield: 'Shield illustration',
  trophy: 'Trophy illustration',
};

/**
 * Detailed, multi-color badge-style graphics (baked-in shading and brand color, not a
 * single CSS-var-driven fill like the Icon set) — used for things like earned
 * achievements on Profile. Static image assets, same treatment as team/sponsor logos.
 */
export function Illustration({ type, size = 104, alt }: IllustrationProps) {
  return <img src={SOURCES[type]} alt={alt ?? DEFAULT_ALT[type]} width={size} height={size} style={{ display: 'block' }} />;
}
