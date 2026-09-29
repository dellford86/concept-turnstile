import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { SpacingSwatch, TokenPage, TokenSection } from './TokenSwatch';

const meta: Meta = {
  title: 'Tokens/Primitives',
};

export default meta;
type Story = StoryObj;

export const Spacing: Story = {
  render: () => (
    <TokenPage>
      <TokenSection title="Spacing scale">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <SpacingSwatch label="spacing/0" varName="--spacing-0" />
          <SpacingSwatch label="spacing/2" varName="--spacing-2" />
          <SpacingSwatch label="spacing/4" varName="--spacing-4" />
          <SpacingSwatch label="spacing/8" varName="--spacing-8" />
          <SpacingSwatch label="spacing/16" varName="--spacing-16" />
          <SpacingSwatch label="spacing/24" varName="--spacing-24" />
          <SpacingSwatch label="spacing/40" varName="--spacing-40" />
          <SpacingSwatch label="spacing/80" varName="--spacing-80" />
        </div>
      </TokenSection>
    </TokenPage>
  ),
};
