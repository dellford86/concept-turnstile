import React from 'react';

export interface DidYouKnowCardProps {
  /** Team logo, flanked by divider lines. */
  logo: string;
  logoAlt?: string;
  /** The fact itself, e.g. "The average attendance at a ... game this year is 45,678". */
  body: string;
}

/**
 * The "DID YOU KNOW?" fact section shown beneath the guess field on the question
 * screens. No border/background/shadow of its own — it's meant to sit embedded inside
 * a parent card (e.g. the question screen's section--main-content), which supplies
 * that chrome. A divider line flanks each side of the team logo.
 */
export function DidYouKnowCard({ logo, logoAlt = 'Team logo', body }: DidYouKnowCardProps) {
  return (
    <div
      data-name="section--did-you-know"
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 'var(--spacing-med)',
        padding: '0 var(--spacing-lrg) var(--spacing-xl)',
        boxSizing: 'border-box',
      }}
    >
      <div
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 'var(--spacing-xl)',
          padding: 'var(--spacing-med) var(--spacing-lrg)',
          boxSizing: 'border-box',
        }}
      >
        <span aria-hidden="true" style={{ flex: 1, height: 1, background: 'var(--outline-light)' }} />
        <div data-name="client-logo" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', flexShrink: 0 }}>
          <img src={logo} alt={logoAlt} style={{ width: 40, height: 40, objectFit: 'cover' }} />
        </div>
        <span aria-hidden="true" style={{ flex: 1, height: 1, background: 'var(--outline-light)' }} />
      </div>
      <p
        style={{
          margin: 0,
          width: '100%',
          fontFamily: 'var(--font-family-figtree)',
          fontWeight: 'var(--font-weight-semibold)',
          fontSize: 'var(--text-heading-s-font-size)',
          lineHeight: 'var(--text-heading-s-line-height)',
          color: 'var(--background-accent)',
          textAlign: 'center',
        }}
      >
        DID YOU KNOW?
      </p>
      <p
        style={{
          margin: 0,
          width: '100%',
          fontFamily: 'var(--font-family-figtree)',
          fontWeight: 'var(--font-weight-regular)',
          fontSize: 'var(--text-body-m-font-size)',
          lineHeight: 'var(--text-body-m-line-height)',
          color: 'var(--foreground-light-pr)',
          textAlign: 'center',
        }}
      >
        {body}
      </p>
    </div>
  );
}
