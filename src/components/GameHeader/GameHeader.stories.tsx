import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { GameHeader } from './GameHeader';
import teamLogo from '../../assets/game-view/header-team-logo.png';

const meta: Meta<typeof GameHeader> = {
  title: 'Components/GameHeader',
  component: GameHeader,
  args: {
    teamLogo,
    teamLogoAlt: 'Tampa Bay Buccaneers',
    gameLabel: 'TB vs NO',
    statusLabel: 'IN PROGRESS',
    date: 'Dec 20',
    time: '1:00 PM ET',
  },
  decorators: [
    (Story) => (
      <div data-team="bucs" data-theme="dark" style={{ background: 'var(--background-surface)', width: 390 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof GameHeader>;

export const Default: Story = {};

export const LongMatchupLabel: Story = {
  args: {
    gameLabel: 'Tampa Bay vs New Orleans',
    time: '1:00 PM Eastern Time',
  },
};

export const NoStatus: Story = {
  args: { statusLabel: undefined },
  parameters: {
    docs: {
      description: {
        story: 'Before the poll closes, Game View omits statusLabel entirely rather than showing a status that hasn’t happened yet.',
      },
    },
  },
};
