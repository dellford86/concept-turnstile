import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Tooltip } from './Tooltip';

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  args: {
    title: 'Good job!',
    message: 'Two achievements unlocked!',
  },
  decorators: [
    (Story) => (
      <div data-team="bucs" data-theme="dark" style={{ padding: 40, display: 'flex', justifyContent: 'center', background: 'var(--background-surface)' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {};
