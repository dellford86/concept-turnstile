import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useState } from 'react';
import { Tabs } from './Tabs';

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
  args: {
    tabs: [
      { id: 'achievements', label: 'Achievements' },
      { id: 'games', label: 'Games Attended' },
    ],
  },
  decorators: [
    (Story) => (
      <div data-team="bucs" data-theme="dark" style={{ background: 'var(--background-surface)', padding: 24, width: 390 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  args: { activeId: 'achievements' },
};

export const SecondTabActive: Story = {
  args: { activeId: 'games' },
};

function Interactive() {
  const [activeId, setActiveId] = useState('achievements');
  return (
    <Tabs
      tabs={[
        { id: 'achievements', label: 'Achievements' },
        { id: 'games', label: 'Games Attended' },
      ]}
      activeId={activeId}
      onChange={setActiveId}
    />
  );
}

export const Clickable: Story = {
  render: () => <Interactive />,
};
