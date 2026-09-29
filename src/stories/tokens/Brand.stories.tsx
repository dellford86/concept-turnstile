import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { TokenGrid, TokenSection, TokenSwatch, TokenPage } from './TokenSwatch';

const meta: Meta = {
  title: 'Tokens/Brand',
  parameters: {
    docs: {
      description: {
        component:
          'Same seven variable names for every team — only the values change. Use the "Team" toolbar control above to swap the active brand.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const ActiveTeam: Story = {
  render: () => (
    <TokenPage>
      <TokenSection title="Active team (switch with the Team toolbar control)">
        <TokenGrid>
          <TokenSwatch label="brand-bg" varName="--brand-bg" />
          <TokenSwatch label="brand-bg-light" varName="--brand-bg-light" />
          <TokenSwatch label="brand-interactive" varName="--brand-interactive" />
          <TokenSwatch label="brand-interactive-light" varName="--brand-interactive-light" />
          <TokenSwatch label="brand-accent" varName="--brand-accent" />
          <TokenSwatch label="brand-a11y-on-interactive" varName="--brand-a11y-on-interactive" />
          <TokenSwatch label="brand-a11y-on-accent" varName="--brand-a11y-on-accent" />
        </TokenGrid>
      </TokenSection>
    </TokenPage>
  ),
};
