import heroBackground from '../../assets/welcome/hero-background.jpg';
import homeTeamLogo from '../../assets/welcome/home-team-logo.png';
import visitingTeamLogo from '../../assets/welcome/visiting-team-logo.png';
import sponsorLogo from '../../assets/welcome/sponsor-logo.png';
import type { WelcomeScreenProps } from './WelcomeScreen';

/** Placeholder content matching the Figma reference until real game data is wired up. */
export const sampleWelcomeScreenProps: WelcomeScreenProps = {
  backgroundImage: heroBackground,
  week: 'WEEK 15',
  homeTeam: { name: 'Tampa Bay Buccaneers', logo: homeTeamLogo },
  visitingTeam: { name: 'New Orleans Saints', logo: visitingTeamLogo },
  sponsorLogo,
  dateTimeLabel: 'December 20, 2026  •  1:00 PM ET',
  venue: 'Raymond James Stadium',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In commodo tempus sapien, vel posuere purus accumsan vel. Integer vel mauris magna. Ut sed sem at magna euismod dapibus. ',
  ctaLabel: 'Play now!',
};
