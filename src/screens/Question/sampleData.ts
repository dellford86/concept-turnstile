import heroBackground from '../../assets/welcome/hero-background.jpg';
import homeTeamLogo from '../../assets/welcome/home-team-logo.png';
import sponsorLogo from '../../assets/welcome/sponsor-logo.png';
import type { QuestionScreenProps } from './QuestionScreen';

/** Placeholder content matching the Figma reference until real game data is wired up. */
export const sampleQuestionScreenProps: Omit<QuestionScreenProps, 'value' | 'onChangeValue' | 'onSubmit'> = {
  backgroundImage: heroBackground,
  sponsorLogo,
  sponsorName: 'Coca-Cola',
  question: 'How many fans will be at tonight’s game?',
  didYouKnowLogo: homeTeamLogo,
  didYouKnowLogoAlt: 'Tampa Bay Buccaneers',
  didYouKnowBody: 'The average attendance at a Tampa Bay Buccaneers home game this year is 45,678',
  ctaLabel: 'Submit',
};
