import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { DidYouKnowCard } from './DidYouKnowCard';
import homeTeamLogo from '../../assets/welcome/home-team-logo.png';

const meta: Meta<typeof DidYouKnowCard> = {
  title: 'Components/DidYouKnowCard',
  component: DidYouKnowCard,
  args: {
    logo: homeTeamLogo,
    logoAlt: 'Tampa Bay Buccaneers',
    body: 'The average attendance at a Tampa Bay Buccaneers home game this year is 45,678',
  },
  decorators: [
    (Story) => (
      <div data-team="bucs" data-theme="dark" style={{ background: 'var(--background-surface)', padding: 60, width: 342 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof DidYouKnowCard>;

export const Default: Story = {};
