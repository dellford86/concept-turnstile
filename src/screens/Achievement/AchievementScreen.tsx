import React from 'react';
import { IconButton } from '../../components/IconButton/IconButton';
import { ArrowLeftIcon } from '../../components/IconButton/ArrowLeftIcon';
import { Illustration, type IllustrationType } from '../../components/Illustration/Illustration';
import shadowEllipse from '../../assets/achievement/shadow-ellipse.svg';
import { contentTransitionClassName, type ScreenTransitionState } from '../screenTransition';
import { useTilt } from './useTilt';
import { useConfettiBurst } from './useConfettiBurst';
import '../../styles/motion.css';

export interface AchievementScreenProps {
  illustration: IllustrationType;
  title: string;
  /** e.g. "Common Achievement" — rendered uppercase. */
  rarity: string;
  description: string;
  lastEarned: string;
  teamLogo: string;
  teamLogoAlt: string;
  /** Count of other fans who've earned it. */
  fansEarnedCount: number;
  /** First time this achievement is opened — celebrate with a confetti burst. */
  celebrate?: boolean;
  onBack?: () => void;
  transitionState?: ScreenTransitionState;
}

// Fire as the badge reaches its apex and starts spinning: .achievement-rise's 0.2s
// delay + 20% of its 2s duration (see styles/motion.css).
const CONFETTI_DELAY_MS = 600;

const bodyText: React.CSSProperties = {
  margin: 0,
  fontFamily: 'var(--font-family-figtree)',
  fontWeight: 'var(--font-weight-regular)',
  fontSize: 'var(--text-body-m-font-size)',
  lineHeight: 'var(--text-body-m-line-height)',
};

export function AchievementScreen({
  illustration,
  title,
  rarity,
  description,
  lastEarned,
  teamLogo,
  teamLogoAlt,
  fansEarnedCount,
  celebrate = false,
  onBack,
  transitionState,
}: AchievementScreenProps) {
  const { onPointerMove: onTiltMove, onPointerLeave: onTiltLeave } = useTilt<HTMLDivElement>();
  const { canvasRef: confettiCanvasRef, originRef: confettiOriginRef } = useConfettiBurst({ enabled: celebrate, delayMs: CONFETTI_DELAY_MS });

  return (
    <div style={{ position: 'relative', height: '100%', background: 'var(--background-surface)' }}>
      <div
        data-name="content"
        className={contentTransitionClassName(transitionState)}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 'var(--spacing-xl)',
          height: '100%',
          // Scrolls instead of squeezing sections when a short phone can't fit them.
          overflowY: 'auto',
          padding: 'var(--spacing-lrg)',
          boxSizing: 'border-box',
        }}
      >
        {/* position:relative on every row below the hero: the hero's full-bleed gradient
            is absolutely positioned, and CSS paints positioned elements above static ones
            regardless of DOM order — without it the gradient would cover the back button
            and the team logo that straddles its bottom edge. */}
        <div style={{ display: 'flex', alignItems: 'center', width: '100%', position: 'relative' }}>
          <IconButton icon={<ArrowLeftIcon size={24} />} aria-label="Back" onClick={onBack} disabled={!onBack} />
        </div>

        <div
          data-name="achievement"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            // Figma: 342x324 inside the 358-wide content column, i.e. inset 8px a side;
            // kept as an inset so it tracks the phone's width. The extra height below
            // the hero is intentional breathing room before the logo.
            width: 'calc(100% - 16px)',
            height: 324,
            flexShrink: 0,
            paddingBottom: 'var(--spacing-xl)',
            boxSizing: 'border-box',
          }}
        >
          <div
            data-name="hero"
            style={{
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'flex-end',
              gap: 'var(--spacing-lrg)',
              height: 272,
              width: '100%',
              flexShrink: 0,
              paddingBottom: 'var(--spacing-med)',
              boxSizing: 'border-box',
            }}
          >
            {/* Full-bleed backdrop: Figma positions it relative to the hero (left -24 /
                top -80, 390x456). The hero is inset 24px from each screen edge (16px
                content padding + 8px card inset), so -24px plus 48px of extra width
                spans the whole screen at any phone width — 390 in the Figma frame. */}
            <div
              aria-hidden
              style={{
                position: 'absolute',
                left: -24,
                top: -80,
                width: 'calc(100% + 48px)',
                height: 456,
                background: 'linear-gradient(to bottom, transparent, var(--background-scrim))',
                pointerEvents: 'none',
              }}
            />
            {/* Tilt (outer, inline transform), rise and spin (inner, keyframes) each live
                on their own node so none overwrites another's transform. See
                .achievement-rise in styles/motion.css. */}
            <div
              ref={confettiOriginRef}
              onPointerMove={onTiltMove}
              onPointerLeave={onTiltLeave}
              style={{ position: 'relative', flexShrink: 0, transformStyle: 'preserve-3d', willChange: 'transform' }}
            >
              <div className="achievement-rise">
                <div className="achievement-spin">
                  <Illustration type={illustration} size={200} />
                </div>
              </div>
            </div>
            <img
              className="achievement-shadow-reveal"
              src={shadowEllipse}
              alt=""
              width={120}
              height={24}
              style={{ position: 'relative', display: 'block', flexShrink: 0 }}
            />
          </div>
        </div>

        <div
          data-name="client-logo"
          style={{
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
            padding: 'var(--spacing-med) var(--spacing-lrg)',
            boxSizing: 'border-box',
          }}
        >
          <img src={teamLogo} alt={teamLogoAlt} width={40} height={40} style={{ display: 'block', objectFit: 'cover' }} />
        </div>

        <div
          data-name="details"
          style={{
            position: 'relative',
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 'var(--spacing-lrg)',
            width: '100%',
            padding: '0 var(--spacing-lrg) var(--spacing-xxl)',
            boxSizing: 'border-box',
            textAlign: 'center',
            textShadow: 'var(--shadow-card-low)',
            overflowWrap: 'break-word',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--spacing-sm)', width: '100%' }}>
            <h1
              style={{
                margin: 0,
                fontFamily: 'var(--font-family-figtree)',
                fontWeight: 'var(--font-weight-black)',
                fontSize: 'var(--text-heading-xxl-font-size)',
                lineHeight: 'var(--text-heading-xxl-line-height)',
                color: 'var(--foreground-light-pr)',
              }}
            >
              {title}
            </h1>
            <p
              style={{
                margin: 0,
                fontFamily: 'var(--font-family-figtree)',
                fontWeight: 'var(--font-weight-semibold)',
                fontSize: 'var(--text-heading-xs-font-size)',
                lineHeight: 'var(--text-heading-xs-line-height)',
                color: 'var(--background-accent)',
                textTransform: 'uppercase',
              }}
            >
              {rarity}
            </p>
          </div>
          {/* flex:1 pushes the fan count down to the bottom of the screen. */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)', width: '100%' }}>
            <p style={{ ...bodyText, color: 'var(--foreground-light-pr)' }}>{description}</p>
            <p style={{ ...bodyText, color: 'var(--foreground-light-secondary)' }}>Last earned: {lastEarned}</p>
          </div>
          <p style={{ ...bodyText, width: '100%', color: 'var(--foreground-light-secondary)' }}>
            You and {fansEarnedCount.toLocaleString('en-US')} fans have earned this achievement
          </p>
        </div>
      </div>
      {celebrate && (
        <canvas
          ref={confettiCanvasRef}
          aria-hidden="true"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 2 }}
        />
      )}
    </div>
  );
}
