import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useState } from 'react';
import { NumberField } from './NumberField';

const meta: Meta<typeof NumberField> = {
  title: 'Components/NumberField',
  component: NumberField,
  parameters: {
    docs: {
      description: {
        component:
          'A real controlled input — type into it. Empty shows the dimmed placeholder "0"; any value shows full-strength white with a trailing caret line, formatted with thousands separators.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div data-team="bucs" data-theme="dark" style={{ background: 'var(--background-surface)', padding: 40, display: 'flex', justifyContent: 'center' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof NumberField>;

function EmptyExample() {
  const [value, setValue] = useState('');
  return <NumberField value={value} onChange={setValue} />;
}

function FilledExample() {
  const [value, setValue] = useState('45678');
  return <NumberField value={value} onChange={setValue} />;
}

export const Empty: Story = {
  render: () => <EmptyExample />,
};

export const Filled: Story = {
  render: () => <FilledExample />,
};
