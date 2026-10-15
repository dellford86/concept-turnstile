import React from 'react';
import logoTurnstile from '../../assets/splash/logo-turnstile.svg';
import bgTexture1 from '../../assets/splash/bg-texture-1.svg';
import bgTexture2 from '../../assets/splash/bg-texture-2.svg';
import { contentTransitionClassName, type ScreenTransitionState } from '../screenTransition';
import '../../styles/motion.css';

export interface SplashScreenProps {
  transitionState?: ScreenTransitionState;
}

/**
 * App-launch splash: Turnstile logo over a faint brush-stroke texture, with an
 * indeterminate 3-dot loader. A fixed composition (Figma node 2420:1031), so each piece
 * keeps its exact Figma offset — but measured from the screen's center (195, 422 in the
 * 390x844 frame) rather than its top-left, so it stays centered on any phone size and
 * lands at Figma's exact coordinates in the 390x844 desktop preview.
 */
export function SplashScreen({ transitionState }: SplashScreenProps) {
  return (
    <div
      data-name="wf--splash"
      style={{ position: 'relative', height: '100%', overflow: 'hidden', background: 'var(--background-surface)' }}
    >
      {/* Brush-stroke texture (4% white, baked into the SVGs). Figma rotates these 180°
          and flips them vertically, which nets out to a horizontal mirror. */}
      <img
        src={bgTexture1}
        alt=""
        aria-hidden="true"
        width={826}
        height={559.999}
        style={{ position: 'absolute', left: 'calc(50% - 301px)', top: 'calc(50% - 245px)', transform: 'scaleX(-1)', maxWidth: 'none', pointerEvents: 'none' }}
      />
      <img
        src={bgTexture2}
        alt=""
        aria-hidden="true"
        width={1076.746}
        height={918.958}
        style={{ position: 'absolute', left: 'calc(50% - 447.15px)', top: 'calc(50% - 361.52px)', transform: 'scaleX(-1)', maxWidth: 'none', pointerEvents: 'none' }}
      />

      <div className={contentTransitionClassName(transitionState)}>
        {/* The exported SVG is 390x360: the 280x280 logo plus room for its drop shadow.
            The logo itself sits at (55, 28.916) inside it, so placing the SVG at
            (0, 219.084) — i.e. center minus (195, 202.916) — puts the logo at Figma's (55, 248). Starts hidden and fades
            up into that resting spot (.fade-in-up, styles/motion.css). */}
        <img
          className="fade-in-up"
          src={logoTurnstile}
          alt="Turnstile"
          width={390}
          height={360}
          style={{ position: 'absolute', left: 'calc(50% - 195px)', top: 'calc(50% - 202.916px)', display: 'block', maxWidth: 'none' }}
        />

        <div
          role="status"
          aria-label="Loading"
          data-name="loader"
          style={{ position: 'absolute', left: 'calc(50% - 19px)', top: 'calc(50% + 98px)', width: 40, height: 8, display: 'flex', gap: 8 }}
        >
          {[0, 1, 2].map((i) => (
            // dot-flashing's 0s / 0.5s / 1s stagger, shifted back one full 2s cycle so the
            // dots are already in step on first paint instead of all starting solid.
            <span key={i} className="splash-loader-dot" style={{ animationDelay: `${i * 0.5 - 2}s` }} />
          ))}
        </div>
      </div>
    </div>
  );
}
