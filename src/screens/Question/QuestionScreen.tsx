import React from 'react';
import { Background } from '../../components/Background/Background';
import { Button } from '../../components/Button/Button';
import { Sponsor } from '../../components/Sponsor/Sponsor';
import { NumberField } from '../../components/NumberField/NumberField';
import { DidYouKnowCard } from '../../components/DidYouKnowCard/DidYouKnowCard';
import { contentTransitionClassName, type ScreenTransitionState } from '../screenTransition';

export interface QuestionScreenProps {
  backgroundImage: string;
  sponsorLogo: string;
  sponsorName?: string;
  question: string;
  value: string;
  onChangeValue: (value: string) => void;
  didYouKnowLogo: string;
  didYouKnowLogoAlt?: string;
  didYouKnowBody: string;
  ctaLabel: string;
  onSubmit?: () => void;
  transitionState?: ScreenTransitionState;
}

const questionStyle: React.CSSProperties = {
  margin: 0,
  width: '100%',
  fontFamily: 'var(--font-family-figtree)',
  fontWeight: 'var(--font-weight-black)',
  fontSize: 'var(--text-heading-l-font-size)',
  lineHeight: 'var(--text-heading-l-line-height)',
  color: 'var(--foreground-light-pr)',
  textAlign: 'center',
};

export function QuestionScreen({
  backgroundImage,
  sponsorLogo,
  sponsorName,
  question,
  value,
  onChangeValue,
  didYouKnowLogo,
  didYouKnowLogoAlt,
  didYouKnowBody,
  ctaLabel,
  onSubmit,
  transitionState,
}: QuestionScreenProps) {
  return (
    // Figma now insets bg-img--02 at top:5.09% bottom:0 — effectively full-bleed below
    // the status-bar gap we don't render. Unlike the previous revision (a short top
    // band), the photo now covers the whole screen, same treatment as Welcome.
    <Background image={backgroundImage} name="bg-img--02">
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
            gap: 'var(--spacing-xxl)',
            width: '100%',
            minHeight: 0,
          }}
        >
          <div
            data-name="section--main-content"
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 'var(--spacing-xl)',
              background: 'var(--background-surface)',
              border: '1px solid var(--outline-light)',
              borderRadius: 'var(--radius-lrg)',
              paddingTop: 'var(--spacing-lrg)',
              boxSizing: 'border-box',
            }}
          >
            {/* Sponsor pokes up out of the card: an 8px-tall, bottom-aligned slot lets
                the 48px badge overlap the card's top border, per the Figma source. */}
            <div data-name="sponsor-container" style={{ height: 8, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
              <Sponsor logo={sponsorLogo} name={sponsorName} shadow="card" />
            </div>
            <div
              data-name="question"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                padding: 'var(--spacing-med) var(--spacing-xl)',
                boxSizing: 'border-box',
              }}
            >
              <p style={questionStyle}>{question}</p>
            </div>
            <NumberField value={value} onChange={onChangeValue} ariaLabel={question} />
            <DidYouKnowCard logo={didYouKnowLogo} logoAlt={didYouKnowLogoAlt} body={didYouKnowBody} />
          </div>
        </div>

        <div
          data-name="section--button-footer"
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', paddingBottom: 'var(--spacing-xxl)' }}
        >
          <Button variant="primary" onClick={onSubmit}>
            {ctaLabel}
          </Button>
        </div>
      </div>
    </Background>
  );
}
