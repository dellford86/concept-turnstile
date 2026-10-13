import React from 'react';
import { Background } from '../../components/Background/Background';
import { Button } from '../../components/Button/Button';
import { Sponsor } from '../../components/Sponsor/Sponsor';
import { contentTransitionClassName, type ScreenTransitionState } from '../screenTransition';
import '../../styles/motion.css';

const ENTRANCE_DELAY_HEADER = '0ms';
const ENTRANCE_DELAY_GAME_DETAILS = '120ms';
const ENTRANCE_DELAY_BODY_COPY = '240ms';
const ENTRANCE_DELAY_MATCHUP_TEAMS = '500ms';
const ENTRANCE_DELAY_MATCHUP_VS = '900ms';

export interface TeamInfo {
  name: string;
  logo: string;
}

export interface WelcomeScreenProps {
  backgroundImage: string;
  week: string;
  homeTeam: TeamInfo;
  visitingTeam: TeamInfo;
  sponsorLogo: string;
  dateTimeLabel: string;
  venue: string;
  description: string;
  ctaLabel: string;
  onPlay?: () => void;
  transitionState?: ScreenTransitionState;
}

const headingStyle: React.CSSProperties = {
  fontFamily: 'var(--font-family-figtree)',
  fontWeight: 'var(--font-weight-black)',
  fontSize: 'var(--text-heading-xxl-font-size)',
  lineHeight: 'var(--text-heading-xxl-line-height)',
  color: 'var(--foreground-light-pr)',
  textAlign: 'center',
  width: '100%',
  margin: 0,
};

const descriptionStyle: React.CSSProperties = {
  fontFamily: 'var(--font-family-figtree)',
  fontWeight: 'var(--font-weight-regular)',
  fontSize: 'var(--text-body-m-font-size)',
  lineHeight: 'var(--text-body-m-line-height)',
  color: 'var(--foreground-light-secondary)',
  textAlign: 'center',
  width: '100%',
  margin: 0,
};

const teamNameStyle: React.CSSProperties = {
  fontFamily: 'var(--font-family-figtree)',
  fontWeight: 'var(--font-weight-semibold)',
  fontSize: 'var(--text-heading-m-font-size)',
  lineHeight: 'var(--text-heading-m-line-height)',
  color: 'var(--foreground-light-pr)',
  textAlign: 'center',
  width: '100%',
  margin: 0,
};

function TeamColumn({ team, name, direction }: { team: TeamInfo; name: string; direction: 'left' | 'right' }) {
  return (
    <div
      data-name={name}
      className={direction === 'left' ? 'slide-in-left' : 'slide-in-right'}
      style={{
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        gap: 10,
        alignItems: 'center',
        minWidth: 0,
        animationDelay: ENTRANCE_DELAY_MATCHUP_TEAMS,
      }}
    >
      <img
        src={team.logo}
        alt={team.name}
        data-name={`${name}-logo`}
        style={{ width: 64, height: 64, objectFit: 'cover', flexShrink: 0 }}
      />
      <p style={teamNameStyle}>{team.name}</p>
    </div>
  );
}

function GameDetailsCard({
  week,
  homeTeam,
  visitingTeam,
  sponsorLogo,
  dateTimeLabel,
  venue,
}: Pick<WelcomeScreenProps, 'week' | 'homeTeam' | 'visitingTeam' | 'sponsorLogo' | 'dateTimeLabel' | 'venue'>) {
  return (
    <div
      data-name="game-details"
      className="punch-through"
      style={{
        animationDelay: ENTRANCE_DELAY_GAME_DETAILS,
        width: '100%',
        background: 'var(--background-surface)',
        border: '1px solid var(--outline-neutral-base)',
        borderRadius: 'var(--radius-lrg)',
        boxShadow: 'var(--shadow-card-high)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <div
        data-name="banner"
        style={{
          background: 'var(--background-muted-light)',
          borderBottomLeftRadius: 'var(--radius-lrg)',
          borderBottomRightRadius: 'var(--radius-lrg)',
          padding: 'var(--spacing-sm) var(--spacing-xxl)',
        }}
      >
        <p
          style={{
            margin: 0,
            fontFamily: 'var(--font-family-figtree)',
            fontWeight: 'var(--font-weight-semibold)',
            fontSize: 'var(--text-heading-s-font-size)',
            lineHeight: 'var(--text-heading-s-line-height)',
            color: 'var(--foreground-light-pr)',
            whiteSpace: 'nowrap',
          }}
        >
          {week}
        </p>
      </div>

      <div
        data-name="matchup"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--spacing-lrg)',
          width: '100%',
          padding: 'var(--spacing-lrg) var(--spacing-lrg) var(--spacing-xxl)',
        }}
      >
        <TeamColumn team={homeTeam} name="home-team" direction="left" />
        <div
          data-name="vs-div"
          className="pop-in"
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 33, animationDelay: ENTRANCE_DELAY_MATCHUP_VS }}
        >
          <p style={{ ...teamNameStyle, width: 'auto', whiteSpace: 'nowrap' }}>vs</p>
        </div>
        <TeamColumn team={visitingTeam} name="visiting-team" direction="right" />
      </div>

      <div
        data-name="addl-details"
        style={{
          position: 'relative',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 'var(--spacing-lrg)',
          background: 'var(--background-scrim)',
          borderTop: '1px solid var(--outline-neutral-base)',
          padding: 'var(--spacing-xxl) var(--spacing-lrg) var(--spacing-lrg)',
        }}
      >
        <div data-name="meta" style={{ width: '100%', textAlign: 'center' }}>
          <p
            style={{
              margin: 0,
              fontFamily: 'var(--font-family-figtree)',
              fontWeight: 'var(--font-weight-semibold)',
              fontSize: 'var(--text-heading-s-font-size)',
              lineHeight: 'var(--text-heading-s-line-height)',
              color: 'var(--foreground-light-pr)',
            }}
          >
            {dateTimeLabel}
          </p>
          <p
            style={{
              margin: 0,
              fontFamily: 'var(--font-family-figtree)',
              fontWeight: 'var(--font-weight-regular)',
              fontSize: 'var(--text-body-m-font-size)',
              lineHeight: 'var(--text-body-m-line-height)',
              color: 'var(--foreground-light-secondary)',
            }}
          >
            {venue}
          </p>
        </div>

        <Sponsor
          logo={sponsorLogo}
          shadow="modal"
          style={{ position: 'absolute', top: -24.58, left: '50%', transform: 'translateX(-50%)' }}
        />
      </div>
    </div>
  );
}

export function WelcomeScreen({
  backgroundImage,
  week,
  homeTeam,
  visitingTeam,
  sponsorLogo,
  dateTimeLabel,
  venue,
  description,
  ctaLabel,
  onPlay,
  transitionState,
}: WelcomeScreenProps) {
  return (
    <Background image={backgroundImage} name="page-wrapper" animateIn>
      <div
        data-name="content"
        className={contentTransitionClassName(transitionState)}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 'var(--spacing-xxl)',
          height: '100%',
          padding: 'var(--spacing-xxl) var(--spacing-xl)',
          boxSizing: 'border-box',
        }}
      >
        <div
          data-name="section--main"
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 'var(--spacing-xl)',
            width: '100%',
            minHeight: 0,
          }}
        >
          <h1 className="fade-in-up" style={{ ...headingStyle, animationDelay: ENTRANCE_DELAY_HEADER }}>
            Welcome to Turnstile!
          </h1>
          <GameDetailsCard
            week={week}
            homeTeam={homeTeam}
            visitingTeam={visitingTeam}
            sponsorLogo={sponsorLogo}
            dateTimeLabel={dateTimeLabel}
            venue={venue}
          />
          <p className="fade-in-up" style={{ ...descriptionStyle, animationDelay: ENTRANCE_DELAY_BODY_COPY }}>
            {description}
          </p>
        </div>

        <div
          data-name="section--button-footer"
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', paddingBottom: 'var(--spacing-xxl)' }}
        >
          <Button variant="primary" onClick={onPlay}>
            {ctaLabel}
          </Button>
        </div>
      </div>
    </Background>
  );
}
