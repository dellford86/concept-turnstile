import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Illustration, type IllustrationType } from './Illustration';

const meta: Meta<typeof Illustration> = {
  title: 'Components/Illustration',
  component: Illustration,
  args: {
    type: 'star',
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
type Story = StoryObj<typeof Illustration>;

export const Star: Story = {};

export const Seal: Story = {
  args: { type: 'seal' },
};

export const Jewel: Story = {
  args: { type: 'jewel' },
};

export const Crown: Story = {
  args: { type: 'crown' },
};

export const Shield: Story = {
  args: { type: 'shield' },
};

export const Trophy: Story = {
  args: { type: 'trophy' },
};

const ALL_TYPES: IllustrationType[] = ['star', 'seal', 'jewel', 'crown', 'shield', 'trophy'];

function AllTypes() {
  return (
    <div style={{ display: 'flex', gap: 16 }}>
      {ALL_TYPES.map((type) => (
        <Illustration key={type} type={type} />
      ))}
    </div>
  );
}

export const AllTypesStory: Story = {
  name: 'All Types',
  render: () => <AllTypes />,
};
