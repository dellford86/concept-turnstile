import heroBackground from '../../assets/welcome/hero-background.jpg';
import type { ProfileScreenProps } from './ProfileScreen';

/** Placeholder content matching the Figma reference until real profile data is wired up. */
export const sampleProfileScreenProps: Omit<ProfileScreenProps, 'onBack' | 'transitionState'> = {
  bannerImage: heroBackground,
  username: 'u43435455550',
  // 2 of the 14 slots are "earned" (crown, star) — both just unlocked, so flagged isNew
  // (App clears the flag once each is opened); the rest stay locked "?" placeholders.
  achievements: Array.from({ length: 14 }, (_, i) => {
    if (i === 0) return { id: `achievement-${i}`, illustration: 'crown', label: 'Fan Royalty', isNew: true };
    if (i === 1) return { id: `achievement-${i}`, illustration: 'star', label: 'First Game Fan', isNew: true };
    return { id: `achievement-${i}` };
  }),
  gamesAttended: [
    { date: '10/20/2026', opponent: 'ATL', guess: '52,340', outcome: '-8,120' },
    { date: '10/27/2026', opponent: 'MIA', guess: '61,005', outcome: '+3,450' },
    { date: '11/04/2026', opponent: 'WAS', guess: '44,870', outcome: '-12,630' },
    { date: '11/25/2026', opponent: 'DET', guess: '58,200', outcome: '+1,980' },
    { date: '12/20/2026', opponent: 'NO', guess: '45,678', outcome: '--' },
  ],
};
