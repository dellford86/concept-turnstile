import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { PostGameMessage } from './PostGameMessage';
import { MobileViewport } from '../../stories/MobileViewport';
import heroFans from '../../assets/post-game/hero-fans.png';

const meta: Meta<typeof PostGameMessage> = {
  title: 'Components/PostGameMessage',
  component: PostGameMessage,
  args: {
    open: true,
    onClose: () => {},
    image: heroFans,
    date: '12/20/2026',
    title: 'Aww shucks!',
    paragraphs: [
      'The actual attendance count was 52,108. You missed it by 6,430.',
      'Thank you for playing Tampa Bay Buccaneers Turnstile and try your chances again on the next game!',
    ],
  },
  decorators: [
    (Story) => (
      <MobileViewport>
        <div data-team="bucs" data-theme="dark" style={{ position: 'relative', height: '100%', background: 'var(--background-surface)' }}>
          <Story />
        </div>
      </MobileViewport>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof PostGameMessage>;

export const Default: Story = {};
