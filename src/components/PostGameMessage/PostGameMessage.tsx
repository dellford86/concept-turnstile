import React, { useEffect, useRef } from 'react';
import { Button } from '../Button/Button';
import { IconButton } from '../IconButton/IconButton';
import { usePresence } from '../../hooks/usePresence';
import closeCircleFillIcon from '../../assets/post-game/close-circle-fill.svg';
import '../../styles/motion.css';

export interface PostGameMessageProps {
  open: boolean;
  onClose: () => void;
  /** Hero photo. Data-supplied — varies per game/team. */
  image: string;
  /** Shown over the top-left of the hero, e.g. "12/20/2026". */
  date: string;
  title: string;
  /** Body copy; each entry is its own paragraph, separated by one blank line. */
  paragraphs: string[];
  /** Bottom button label. */
  ctaLabel?: string;
}

// Keep in sync with .post-game-msg-exit's duration in styles/motion.css.
const EXIT_MS = 300;

/**
 * Full-screen post-game result message (Figma "post-game-msg", node 2494:1464): hero
 * photo with the date and a close button over a top fade, then title, body, and a
 * bottom CTA on a white card. Covers its nearest positioned ancestor and inherits its
 * corner radius, so it lines up with the phone frame. Slides up in, down out, over a
 * scrim that fades in behind it.
 */
export function PostGameMessage({ open, onClose, image, date, title, paragraphs, ctaLabel = 'Close' }: PostGameMessageProps) {
  const isRendered = usePresence(open, EXIT_MS);
  const dialogRef = useRef<HTMLDivElement>(null);

  // Move focus into the dialog without scrolling. Plain autoFocus would make the browser
  // scroll the app frame to reveal the still-offscreen card, jumping the screen behind
  // it out of view in a single frame instead of letting the card slide over it.
  useEffect(() => {
    if (open) dialogRef.current?.focus({ preventScroll: true });
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  if (!isRendered) return null;

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 20,
        borderRadius: 'inherit',
        overflow: 'hidden',
        pointerEvents: open ? 'auto' : 'none',
      }}
    >
      <div
        aria-hidden="true"
        className={open ? 'menu-overlay-enter' : 'menu-overlay-exit'}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'var(--background-scrim)',
        }}
      />
      <div
        ref={dialogRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby="post-game-msg-title"
        data-name="post-game-msg"
        className={open ? 'post-game-msg-enter' : 'post-game-msg-exit'}
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          paddingBottom: 'var(--spacing-xxl)',
          boxSizing: 'border-box',
          background: 'var(--background-light-primary)',
          borderRadius: 'inherit',
          overflowX: 'hidden',
          overflowY: 'auto',
          outline: 'none',
          willChange: 'transform',
        }}
      >
        <div
          data-name="hero"
          style={{
            position: 'relative',
            width: '100%',
            height: 320,
            flexShrink: 0,
          }}
        >
          <img
            src={image}
            alt=""
            style={{
              display: 'block',
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
          <div
            data-name="header"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--spacing-med)',
              padding: 'var(--spacing-lrg) var(--spacing-lrg) var(--spacing-xl)',
              background: 'linear-gradient(to bottom, var(--background-overlay-hero-fade), transparent)',
            }}
          >
            {/* Figma heading/s here is 14/20 — the button-m pair carries that exact size and line height. */}
            <p
              style={{
                flex: 1,
                minWidth: 0,
                margin: 0,
                fontFamily: 'var(--font-family-figtree)',
                fontWeight: 'var(--font-weight-semibold)',
                fontSize: 'var(--text-button-m-font-size)',
                lineHeight: 'var(--text-button-m-line-height)',
                color: 'var(--foreground-light-pr)',
              }}
            >
              {date}
            </p>
            <IconButton
              icon={<img src={closeCircleFillIcon} alt="" width={24} height={24} style={{ display: 'block' }} />}
              aria-label="Close results"
              onClick={onClose}
            />
          </div>
        </div>

        <div
          data-name="content"
          style={{
            flex: 1,
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--spacing-lrg)',
            padding: 'var(--spacing-xxl) var(--spacing-xl)',
            boxSizing: 'border-box',
          }}
        >
          <h2
            id="post-game-msg-title"
            style={{
              margin: 0,
              fontFamily: 'var(--font-family-figtree)',
              fontWeight: 'var(--font-weight-black)',
              fontSize: 'var(--text-heading-xxl-font-size)',
              lineHeight: 'var(--text-heading-xxl-line-height)',
              color: 'var(--foreground-dark-primary)',
            }}
          >
            {title}
          </h2>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--text-body-l-line-height)',
            }}
          >
            {paragraphs.map((paragraph, index) => (
              <p
                key={index}
                style={{
                  margin: 0,
                  fontFamily: 'var(--font-family-figtree)',
                  fontWeight: 'var(--font-weight-regular)',
                  fontSize: 'var(--text-body-l-font-size)',
                  lineHeight: 'var(--text-body-l-line-height)',
                  color: 'var(--foreground-dark-secondary)',
                }}
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* Figma's primary button is 48px tall; Button's default primary padding renders 56. */}
        <Button onClick={onClose} style={{ flexShrink: 0, height: 48, paddingBlock: 0 }}>
          {ctaLabel}
        </Button>
      </div>
    </div>
  );
}
