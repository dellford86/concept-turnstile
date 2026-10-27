import React, { useEffect, useState } from 'react';
import { Background } from '../../components/Background/Background';
import { GameHeader } from '../../components/GameHeader/GameHeader';
import { TrendChart } from '../../components/TrendChart/TrendChart';
import { Sponsor } from '../../components/Sponsor/Sponsor';
import { FeaturedMessage } from '../../components/FeaturedMessage/FeaturedMessage';
import { IconButton } from '../../components/IconButton/IconButton';
import { EditIcon } from '../../components/IconButton/EditIcon';
import { NumberField } from '../../components/NumberField/NumberField';
import { Tooltip } from '../../components/Tooltip/Tooltip';
import { Button } from '../../components/Button/Button';
import { useCountdown } from './useCountdown';
import { useMockLiveValue } from './useMockLiveValue';
import { useMockTrendData } from './useMockTrendData';
import { useCountUp } from './useCountUp';
import { contentTransitionClassName, type ScreenTransitionState } from '../screenTransition';

export interface FeaturedMessageData {
  image: string;
  imageAlt?: string;
  message: string;
}

export interface GameViewScreenProps {
  backgroundImage: string;
  teamLogo: string;
  teamLogoAlt?: string;
  gameLabel: string;
  statusLabel: string;
  date: string;
  time: string;
  attendanceGuess: number;
  chartData: number[];
  low: number;
  high: number;
  /** Epoch ms for actual game start — the "poll closes" countdown targets this directly. */
  gameStartTimeMs: number;
  initialFansPlaying: number;
  initialAvgGuess: number;
  sponsorLogo: string;
  sponsorName?: string;
  featuredMessages: FeaturedMessageData[];
  /** Called when an inline edit of the attendance guess is committed (Enter or blur). */
  onGuessChange?: (value: number) => void;
  /** Header team-logo control — opens the game menu. */
  onMenuClick?: () => void;
  onViewProfile?: () => void;
  /**
   * Newly earned achievements the user hasn't seen yet. When set, the profile button gets
   * a dot badge right away; a tooltip under it appears after ACHIEVEMENT_TOOLTIP_DELAY_MS
   * and auto-dismisses after ACHIEVEMENT_TOOLTIP_MS.
   */
  achievementNotice?: { title: string; message: string };
  /**
   * Post-game state (Figma wf--game-view--finished, node 2493:1322): the status chip
   * always shows `statusLabel`, the guess is no longer editable, the poll-closes stat is
   * dropped, and a "View results" button appears under the guess.
   */
  isFinal?: boolean;
  onViewResults?: () => void;
  transitionState?: ScreenTransitionState;
}

const ACHIEVEMENT_TOOLTIP_DELAY_MS = 1000;
const ACHIEVEMENT_TOOLTIP_MS = 4000;
// Keep in sync with .tooltip-exit's duration in styles/motion.css.
const TOOLTIP_EXIT_MS = 200;

function formatNumber(value: number): string {
  return Math.round(value).toLocaleString('en-US');
}

const statLabelStyle: React.CSSProperties = {
  margin: 0,
  fontFamily: 'var(--font-family-figtree)',
  fontWeight: 'var(--font-weight-semibold)',
  fontSize: 'var(--text-heading-xs-font-size)',
  lineHeight: 'var(--text-heading-xs-line-height)',
  color: 'var(--foreground-light-secondary)',
  textTransform: 'uppercase',
};

const statValueStyle: React.CSSProperties = {
  margin: 0,
  fontFamily: 'var(--font-family-figtree)',
  fontWeight: 'var(--font-weight-semibold)',
  fontSize: 'var(--text-heading-m-font-size)',
  lineHeight: 'var(--text-heading-m-line-height)',
  color: 'var(--foreground-light-pr)',
  textShadow: 'var(--shadow-card-low)',
};

export function GameViewScreen({
  backgroundImage,
  teamLogo,
  teamLogoAlt,
  gameLabel,
  statusLabel,
  date,
  time,
  attendanceGuess,
  chartData,
  low,
  high,
  gameStartTimeMs,
  initialFansPlaying,
  initialAvgGuess,
  sponsorLogo,
  sponsorName,
  featuredMessages,
  onGuessChange,
  onMenuClick,
  onViewProfile,
  achievementNotice,
  isFinal = false,
  onViewResults,
  transitionState,
}: GameViewScreenProps) {
  const [tooltipPhase, setTooltipPhase] = useState<'pending' | 'visible' | 'exiting' | 'hidden'>(achievementNotice ? 'pending' : 'hidden');
  useEffect(() => {
    if (!achievementNotice) return;
    const showAt = ACHIEVEMENT_TOOLTIP_DELAY_MS;
    const exitAt = showAt + ACHIEVEMENT_TOOLTIP_MS;
    const timers = [
      window.setTimeout(() => setTooltipPhase('visible'), showAt),
      window.setTimeout(() => setTooltipPhase('exiting'), exitAt),
      window.setTimeout(() => setTooltipPhase('hidden'), exitAt + TOOLTIP_EXIT_MS),
    ];
    return () => timers.forEach((id) => window.clearTimeout(id));
    // Only on mount: the notice shows once per visit to this screen.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const { display: pollCloses, isComplete: pollClosed } = useCountdown(gameStartTimeMs);
  const [isEditingGuess, setIsEditingGuess] = useState(false);
  const [editGuessValue, setEditGuessValue] = useState('');
  // useCountUp only animates from its value at mount — once the guess has been edited,
  // show it directly instead of a stale count-up target that will never catch up.
  const [hasEditedGuess, setHasEditedGuess] = useState(false);

  function commitGuessEdit() {
    const parsed = Number(editGuessValue);
    if (editGuessValue && !Number.isNaN(parsed)) {
      onGuessChange?.(parsed);
      setHasEditedGuess(true);
    }
    setIsEditingGuess(false);
  }
  // Post-game, no new fans are joining or guessing: freeze the stats and the chart.
  const fansPlaying = useMockLiveValue(initialFansPlaying, {
    minDelayMs: 1500,
    maxDelayMs: 5000,
    minStep: 1,
    maxStep: 6,
    paused: isFinal,
  });
  const avgGuess = useMockLiveValue(initialAvgGuess, {
    minDelayMs: 2000,
    maxDelayMs: 6000,
    minStep: 5,
    maxStep: 40,
    allowNegativeStep: true,
    min: 0,
    paused: isFinal,
  });
  const liveChartData = useMockTrendData(chartData, {
    minDelayMs: 1000,
    maxDelayMs: 2000,
    maxStep: 0.15,
    paused: isFinal,
  });
  // Low/high track the running min/max guess submitted so far, so they only ever
  // widen (new extremes arriving), and drift slower than the chart's own shape.
  const liveLow = useMockLiveValue(low, {
    minDelayMs: 6000,
    maxDelayMs: 12000,
    minStep: -80,
    maxStep: -20,
    min: 0,
    paused: isFinal,
  });
  const liveHigh = useMockLiveValue(high, {
    minDelayMs: 6000,
    maxDelayMs: 12000,
    minStep: 20,
    maxStep: 80,
    paused: isFinal,
  });
  const displayedGuess = useCountUp(attendanceGuess);

  return (
    <Background image={backgroundImage} name="bg-img--02">
      <div
        data-name="content"
        className={contentTransitionClassName(transitionState)}
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          boxSizing: 'border-box',
          // Header + guess + chart + bottom panel need ~637px. On a phone shorter than
          // that the whole screen scrolls as one piece (the bottom panel itself never
          // does), so nothing gets squeezed into overlapping.
          overflowY: 'auto',
        }}
      >
        <GameHeader
          teamLogo={teamLogo}
          teamLogoAlt={teamLogoAlt}
          gameLabel={gameLabel}
          statusLabel={pollClosed || isFinal ? statusLabel : undefined}
          date={date}
          time={time}
          onMenuClick={onMenuClick}
          onViewProfile={onViewProfile}
          profileBadge={Boolean(achievementNotice)}
        />

        {achievementNotice && (tooltipPhase === 'visible' || tooltipPhase === 'exiting') && (
          // Figma: 6px below the 72px header, right edge flush with the profile button's
          // (16px screen gutter), arrow centered on that button.
          <Tooltip
            title={achievementNotice.title}
            message={achievementNotice.message}
            className={tooltipPhase === 'exiting' ? 'tooltip-exit' : 'tooltip-enter'}
            style={{ position: 'absolute', top: 78, right: 16, zIndex: 1 }}
          />
        )}

        {/* Everything between the header and the bottom panel. It takes the leftover
            height but never shrinks below its own content (header and panel don't
            shrink either), so a too-short screen scrolls instead of overlapping. Its
            flex-grow spacers (weighted to the 844px reference design) split the slack
            between sections and shrink to 0 first. */}
        <div data-name="top-area" style={{ position: 'relative', flex: '1 0 auto', display: 'flex', flexDirection: 'column' }}>
          {/* Legibility fade over the photo. Figma: 301px tall, ending exactly at the
              seam with the bottom panel — so it's pinned to this area's bottom edge
              rather than placed as a percentage of the screen. Painted first; the
              sections below are position:relative so they stack above it. */}
          <div
            aria-hidden="true"
            data-name="gradient-overlay--top"
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: 0,
              height: 301,
              background: 'linear-gradient(to top, var(--background-overlay-strong), transparent)',
              pointerEvents: 'none',
            }}
          />

          <div aria-hidden="true" style={{ flex: 103 }} />

          <div
            data-name="your-attendance-guess"
            style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--spacing-med)' }}
          >
            <p
              style={{
                margin: 0,
                fontFamily: 'var(--font-family-figtree)',
                fontWeight: 'var(--font-weight-semibold)',
                fontSize: 'var(--text-heading-xs-font-size)',
                lineHeight: 'var(--text-heading-xs-line-height)',
                color: 'var(--foreground-light-pr)',
                textTransform: 'uppercase',
              }}
            >
              Your Attendance Guess
            </p>
            {/* Fixed-height slot, sized for the taller of the two variants (NumberField)
                and vertically centered, so toggling between them never changes this
                block's own height — nothing below has to reflow when editing starts
                or ends. */}
            <div style={{ height: 120, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {isEditingGuess && !isFinal ? (
                <div
                  style={{ width: '100%' }}
                  onBlur={commitGuessEdit}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') commitGuessEdit();
                  }}
                >
                  <NumberField value={editGuessValue} onChange={setEditGuessValue} ariaLabel="Edit your attendance guess" autoFocus />
                </div>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <p
                    style={{
                      margin: 0,
                      fontFamily: 'var(--font-family-figtree)',
                      fontWeight: 'var(--font-weight-black)',
                      fontSize: 'var(--text-display-50-font-size)',
                      lineHeight: 'var(--text-display-50-line-height)',
                      color: 'var(--foreground-light-pr)',
                      textShadow: 'var(--shadow-card-low)',
                    }}
                  >
                    {formatNumber(hasEditedGuess ? attendanceGuess : displayedGuess)}
                  </p>
                  {!pollClosed && !isFinal && (
                    <IconButton
                      icon={<EditIcon />}
                      aria-label="Edit your attendance guess"
                      onClick={() => {
                        setEditGuessValue(String(Math.round(attendanceGuess)));
                        setIsEditingGuess(true);
                      }}
                    />
                  )}
                </div>
              )}
            </div>
            {isFinal && (
              // Figma: 16px below the guess number's 72px box. The number is centered in
              // the 120px slot above, so that's 112px down the slot — pulled up into it
              // (-16 cancels the gap too), and the -40 bottom margin hands the rest of
              // the button's height to the spacer below. Label, number and chart then
              // sit exactly where they do in the live state. Figma's primary button is 48px
              // tall; Button's default primary padding renders 56.
              <Button onClick={onViewResults} style={{ height: 48, paddingBlock: 0, marginTop: -16, marginBottom: -40 }}>
                View results
              </Button>
            )}
          </div>

          {/* Post-game, reserves the View results button's overhang so a short phone
              scrolls rather than letting the button overlap the chart. */}
          <div aria-hidden="true" style={{ flex: 88, minHeight: isFinal ? 40 : 0 }} />

          <div style={{ position: 'relative' }}>
            <TrendChart data={liveChartData} low={liveLow} high={liveHigh} currentValue={attendanceGuess} animateIn />
          </div>

          <div aria-hidden="true" style={{ flex: 16 }} />
        </div>

        <div
          data-name="bottom-panel"
          style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            // Always its full natural height (stats + feed cards) and never scrolls;
            // the spacers in the top area absorb any shortfall instead.
            flexShrink: 0,
            background: 'var(--background-surface)',
          }}
        >
          {/* Straddles the seam between the photo and this panel: Figma puts the 48px
              sponsor 25px above the panel's top edge. Anchoring it to the panel (not to
              a % of the screen) keeps it on the seam at every height, below the chart
              line and between the LOW/HIGH labels. */}
          <div data-name="sponsor-container" style={{ position: 'absolute', left: 0, right: 0, top: -25, display: 'flex', justifyContent: 'center', zIndex: 1 }}>
            <Sponsor logo={sponsorLogo} name={sponsorName} shadow="modal" />
          </div>

          <div
            data-name="stats"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 'var(--spacing-lrg)',
              padding: 'var(--spacing-xxl) var(--spacing-xl) var(--spacing-lrg)',
              flexShrink: 0,
            }}
          >
            {!isFinal && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--spacing-sm)', flex: 1 }}>
                <p style={{ ...statValueStyle, color: 'var(--background-accent)' }}>{pollCloses}</p>
                <p style={statLabelStyle}>Poll Closes</p>
              </div>
            )}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--spacing-sm)', flex: 1 }}>
              <p style={statValueStyle}>{formatNumber(fansPlaying)}</p>
              <p style={statLabelStyle}>Fans Playing</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--spacing-sm)', flex: 1 }}>
              <p style={statValueStyle}>{formatNumber(avgGuess)}</p>
              <p style={statLabelStyle}>Avg Guess</p>
            </div>
          </div>

          <div
            data-name="feed"
            style={{
              display: 'flex',
              gap: 'var(--spacing-lrg)',
              overflowX: 'auto',
              padding: '0 var(--spacing-lrg)',
              paddingBottom: 'var(--spacing-lrg)',
              flexShrink: 0,
              boxSizing: 'border-box',
            }}
          >
            {featuredMessages.map((item, index) => (
              <FeaturedMessage key={index} image={item.image} imageAlt={item.imageAlt} message={item.message} />
            ))}
          </div>
        </div>
      </div>
    </Background>
  );
}
