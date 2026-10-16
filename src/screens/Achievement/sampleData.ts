import homeTeamLogo from '../../assets/welcome/home-team-logo.png';
import sponsorLogo from '../../assets/welcome/sponsor-logo.png';
import type { AchievementScreenProps } from './AchievementScreen';

export type AchievementDetails = Omit<AchievementScreenProps, 'onBack' | 'transitionState'>;

const team = { teamLogo: homeTeamLogo, teamLogoAlt: 'Tampa Bay Buccaneers logo' };

/**
 * Placeholder detail content per earned achievement, keyed by the Profile achievement id
 * (see Profile/sampleData.ts). First Game Fan matches the Figma reference; Fan Royalty's
 * copy is placeholder until Figma/product specs it.
 */
export const sampleAchievementDetails: Record<string, AchievementDetails> = {
  'achievement-0': {
    ...team,
    illustration: 'crown',
    title: 'Fan Royalty',
    sponsor: { logo: sponsorLogo, name: 'Coca-Cola' },
    rarity: 'Rare Achievement',
    description: 'You attended every home game of the season!',
    lastEarned: '12/20/2026 (Today)',
    fansEarnedCount: 1204,
  },
  'achievement-1': {
    ...team,
    illustration: 'star',
    title: 'First Game Fan',
    rarity: 'Common Achievement',
    description: 'You attended your first game of the season!',
    lastEarned: '12/20/2026 (Today)',
    fansEarnedCount: 13456,
  },
};

/** Fallback when an achievement has no detail entry yet. */
export const sampleAchievementScreenProps: AchievementDetails = sampleAchievementDetails['achievement-1'];
