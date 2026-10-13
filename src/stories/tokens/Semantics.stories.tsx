import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { RadiusSwatch, SpacingSwatch, TokenGrid, TokenSection, TokenSwatch, TokenPage, TypeSample } from './TokenSwatch';

const meta: Meta = {
  title: 'Tokens/Semantics',
  parameters: {
    docs: {
      description: {
        component:
          'Aliases the Primitive and Brand tiers. Reacts to both the "Theme" (light/dark) and "Team" toolbar controls.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const Background: Story = {
  render: () => (
    <TokenPage>
      <TokenSection title="Background">
        <TokenGrid>
          <TokenSwatch label="background-surface" varName="--background-surface" />
          <TokenSwatch label="background-surface-light" varName="--background-surface-light" />
          <TokenSwatch label="background-interactive" varName="--background-interactive" />
          <TokenSwatch label="background-interactive-light" varName="--background-interactive-light" />
          <TokenSwatch label="background-interactive-disabled" varName="--background-interactive-disabled" />
          <TokenSwatch label="background-accent" varName="--background-accent" />
          <TokenSwatch label="background-muted-light" varName="--background-muted-light" />
          <TokenSwatch label="background-error" varName="--background-error" />
          <TokenSwatch label="background-muted-dark" varName="--background-muted-dark" />
        </TokenGrid>
      </TokenSection>
    </TokenPage>
  ),
};

export const Foreground: Story = {
  render: () => (
    <TokenPage>
      <TokenSection title="Foreground">
        <TokenGrid>
          <TokenSwatch label="foreground-link" varName="--foreground-link" />
          <TokenSwatch label="foreground-brand-accent" varName="--foreground-brand-accent" />
          <TokenSwatch label="foreground-light-pr" varName="--foreground-light-pr" />
          <TokenSwatch label="foreground-light-secondary" varName="--foreground-light-secondary" />
          <TokenSwatch label="foreground-light-disabled" varName="--foreground-light-disabled" />
          <TokenSwatch label="foreground-dark-primary" varName="--foreground-dark-primary" />
          <TokenSwatch label="foreground-dark-secondary" varName="--foreground-dark-secondary" />
          <TokenSwatch label="foreground-dark-disabled" varName="--foreground-dark-disabled" />
          <TokenSwatch label="foreground-error" varName="--foreground-error" />
        </TokenGrid>
      </TokenSection>
    </TokenPage>
  ),
};

export const Outline: Story = {
  render: () => (
    <TokenPage>
      <TokenSection title="Outline">
        <TokenGrid>
          <TokenSwatch label="outline-interactive" varName="--outline-interactive" />
          <TokenSwatch label="outline-interactive-pressed" varName="--outline-interactive-pressed" />
          <TokenSwatch label="outline-interactive-focused" varName="--outline-interactive-focused" />
          <TokenSwatch label="outline-accent" varName="--outline-accent" />
          <TokenSwatch label="outline-light" varName="--outline-light" />
          <TokenSwatch label="outline-light-pressed" varName="--outline-light-pressed" />
          <TokenSwatch label="outline-light-focused" varName="--outline-light-focused" />
          <TokenSwatch label="outline-dark" varName="--outline-dark" />
          <TokenSwatch label="outline-dark-pressed" varName="--outline-dark-pressed" />
          <TokenSwatch label="outline-dark-focused" varName="--outline-dark-focused" />
          <TokenSwatch label="outline-error" varName="--outline-error" />
        </TokenGrid>
      </TokenSection>
    </TokenPage>
  ),
};

export const A11y: Story = {
  render: () => (
    <TokenPage>
      <TokenSection title="A11y">
        <TokenGrid>
          <TokenSwatch label="a11y-on-interactive" varName="--a11y-on-interactive" />
          <TokenSwatch label="a11y-on-accent" varName="--a11y-on-accent" />
        </TokenGrid>
      </TokenSection>
    </TokenPage>
  ),
};

export const Spacing: Story = {
  render: () => (
    <TokenPage>
      <TokenSection title="Spacing">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <SpacingSwatch label="spacing-none" varName="--spacing-none" />
          <SpacingSwatch label="spacing-xs" varName="--spacing-xs" />
          <SpacingSwatch label="spacing-sm" varName="--spacing-sm" />
          <SpacingSwatch label="spacing-med" varName="--spacing-med" />
          <SpacingSwatch label="spacing-lrg" varName="--spacing-lrg" />
          <SpacingSwatch label="spacing-xl" varName="--spacing-xl" />
          <SpacingSwatch label="spacing-xxl" varName="--spacing-xxl" />
        </div>
      </TokenSection>
    </TokenPage>
  ),
};

export const Radius: Story = {
  render: () => (
    <TokenPage>
      <TokenSection title="Radius (aliases the spacing scale)">
        <TokenGrid>
          <RadiusSwatch label="radius-none" varName="--radius-none" />
          <RadiusSwatch label="radius-sm" varName="--radius-sm" />
          <RadiusSwatch label="radius-med" varName="--radius-med" />
          <RadiusSwatch label="radius-lrg" varName="--radius-lrg" />
          <RadiusSwatch label="radius-pill" varName="--radius-pill" />
        </TokenGrid>
      </TokenSection>
    </TokenPage>
  ),
};

export const Typography: Story = {
  render: () => (
    <TokenPage>
      <TokenSection title="Display">
        <TypeSample label="display-50" fontSizeVar="--text-display-50-font-size" lineHeightVar="--text-display-50-line-height" />
        <TypeSample label="display-100" fontSizeVar="--text-display-100-font-size" lineHeightVar="--text-display-100-line-height" />
        <TypeSample label="display-200" fontSizeVar="--text-display-200-font-size" lineHeightVar="--text-display-200-line-height" />
        <TypeSample label="display-300" fontSizeVar="--text-display-300-font-size" lineHeightVar="--text-display-300-line-height" />
      </TokenSection>

      <TokenSection title="Heading">
        <TypeSample label="heading-xxl" fontSizeVar="--text-heading-xxl-font-size" lineHeightVar="--text-heading-xxl-line-height" />
        <TypeSample label="heading-xl" fontSizeVar="--text-heading-xl-font-size" lineHeightVar="--text-heading-xl-line-height" />
        <TypeSample label="heading-l" fontSizeVar="--text-heading-l-font-size" lineHeightVar="--text-heading-l-line-height" />
        <TypeSample label="heading-m" fontSizeVar="--text-heading-m-font-size" lineHeightVar="--text-heading-m-line-height" />
        <TypeSample label="heading-s" fontSizeVar="--text-heading-s-font-size" lineHeightVar="--text-heading-s-line-height" />
        <TypeSample label="heading-xs" fontSizeVar="--text-heading-xs-font-size" lineHeightVar="--text-heading-xs-line-height" />
      </TokenSection>

      <TokenSection title="Body">
        <TypeSample label="body-l" fontSizeVar="--text-body-l-font-size" lineHeightVar="--text-body-l-line-height" />
        <TypeSample label="body-m" fontSizeVar="--text-body-m-font-size" lineHeightVar="--text-body-m-line-height" />
        <TypeSample label="body-s" fontSizeVar="--text-body-s-font-size" lineHeightVar="--text-body-s-line-height" />
      </TokenSection>

      <TokenSection title="Button">
        <TypeSample label="button-l" fontSizeVar="--text-button-l-font-size" lineHeightVar="--text-button-l-line-height" sample="Continue" />
        <TypeSample label="button-m" fontSizeVar="--text-button-m-font-size" lineHeightVar="--text-button-m-line-height" sample="Continue" />
      </TokenSection>
    </TokenPage>
  ),
};
