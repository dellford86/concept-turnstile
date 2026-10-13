import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Avatar } from './Avatar';

const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
  decorators: [
    (Story) => (
      <div data-team="bucs" data-theme="dark" style={{ background: 'var(--background-surface)', padding: 24 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Default: Story = {};
