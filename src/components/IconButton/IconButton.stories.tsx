import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { IconButton } from './IconButton';
import { EditIcon } from './EditIcon';

const meta: Meta<typeof IconButton> = {
  title: 'Components/IconButton',
  component: IconButton,
  args: {
    icon: <EditIcon />,
    'aria-label': 'Edit',
  },
  decorators: [
    (Story) => (
      <div data-team="bucs" data-theme="dark" style={{ background: 'var(--background-surface)', padding: 24 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof IconButton>;

export const Default: Story = {};
