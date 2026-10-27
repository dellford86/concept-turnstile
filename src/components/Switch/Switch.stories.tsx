import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useState } from 'react';
import { Switch } from './Switch';

const meta: Meta<typeof Switch> = {
  title: 'Components/Switch',
  component: Switch,
  args: {
    checked: false,
    onChange: () => {},
    label: <span style={{ fontFamily: 'var(--font-family-figtree)', color: 'var(--foreground-light-pr)' }}>Switch label</span>,
  },
  decorators: [
    (Story) => (
      <div data-team="bucs" data-theme="dark" style={{ padding: 40, background: 'var(--background-surface)' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Off: Story = {};

export const On: Story = { args: { checked: true } };

export const LabelLeft: Story = { args: { checked: true, labelPosition: 'left' } };

function InteractiveSwitch(args: React.ComponentProps<typeof Switch>) {
  const [checked, setChecked] = useState(false);
  return <Switch {...args} checked={checked} onChange={setChecked} />;
}

export const Interactive: Story = {
  render: (args) => <InteractiveSwitch {...args} />,
};
