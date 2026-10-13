import heroBackground from '../../assets/welcome/hero-background.jpg';
import sponsorLogo from '../../assets/welcome/sponsor-logo.png';
import headerTeamLogo from '../../assets/game-view/header-team-logo.png';
import feedBucsGear from '../../assets/game-view/feed-bucs-gear.png';
import feedFanCrowd from '../../assets/game-view/feed-fan-crowd.png';
import type { GameViewScreenProps } from './GameViewScreen';

// Sampled from the Figma reference's own distribution curve (node 2306:1200) — same
// data TrendChart.stories.tsx demonstrates with, kept visually consistent here.
const CHART_DATA = [
  0, 0.281, 0.281, 0.281, 0.163, 0.385, 0.281, 0.489, 0.385, 0.281, 0.385, 0.281, 0.163, 0.281, 0.489, 0.652, 0.652,
  0.83, 0.83, 0.993, 0.993, 0.83, 0.83, 0.652, 0.652, 0.385, 0.281, 0.163, 0,
];

/** Placeholder content matching the Figma reference until real game data is wired up. */
export const sampleGameViewScreenProps: Omit<GameViewScreenProps, 'attendanceGuess' | 'transitionState'> = {
  backgroundImage: heroBackground,
  teamLogo: headerTeamLogo,
  teamLogoAlt: 'Tampa Bay Buccaneers',
  gameLabel: 'TB vs NO',
  statusLabel: 'In Progress',
  date: 'Dec 20',
  time: '1:00 PM ET',
  chartData: CHART_DATA,
  low: 32718,
  high: 67890,
  // Mocked "game start" — chosen so the poll-closes countdown reads ~00:05:09 on load,
  // matching the Figma mockup's sample value. A real integration would pass the game's
  // actual scheduled start time instead.
  gameStartTimeMs: Date.now() + 5 * 60 * 1000 + 9 * 1000,
  initialFansPlaying: 12321,
  initialAvgGuess: 51201,
  sponsorLogo,
  sponsorName: 'Coca-Cola',
  featuredMessages: [
    { image: feedBucsGear, imageAlt: 'Buccaneers gear', message: 'Place your bids on your favorite gear at Bucs Auction!' },
    { image: feedFanCrowd, imageAlt: 'Fans in the crowd', message: 'Welcome to Tampa Bay!' },
  ],
};

/** Matches the Figma reference (node 2408:998). App only passes it until Profile is visited. */
export const sampleAchievementNotice: NonNullable<GameViewScreenProps['achievementNotice']> = {
  title: 'Good job!',
  message: 'Two achievements unlocked!',
};
