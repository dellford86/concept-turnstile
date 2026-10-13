import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { FeaturedMessage } from './FeaturedMessage';
import bucsGear from '../../assets/game-view/feed-bucs-gear.png';
import fanCrowd from '../../assets/game-view/feed-fan-crowd.png';

const meta: Meta<typeof FeaturedMessage> = {
  title: 'Components/FeaturedMessage',
  component: FeaturedMessage,
  decorators: [
    (Story) => (
      <div data-team="bucs" data-theme="dark" style={{ background: 'var(--background-surface)', padding: 24 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof FeaturedMessage>;

export const Default: Story = {
  args: {
    image: bucsGear,
    imageAlt: 'Buccaneers gear',
    message: 'Place your bids on your favorite gear at Bucs Auction!',
  },
};

export const SecondExample: Story = {
  args: {
    image: fanCrowd,
    imageAlt: 'Fans in the crowd',
    message: 'Welcome to Tampa Bay!',
  },
};
