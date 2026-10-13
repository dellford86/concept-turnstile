import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { TrendChart } from './TrendChart';

// Sampled from the Figma reference's own distribution curve (node 2306:1200).
const SAMPLE_DATA = [
  0, 0.281, 0.281, 0.281, 0.163, 0.385, 0.281, 0.489, 0.385, 0.281, 0.385, 0.281, 0.163, 0.281, 0.489, 0.652, 0.652,
  0.83, 0.83, 0.993, 0.993, 0.83, 0.83, 0.652, 0.652, 0.385, 0.281, 0.163, 0,
];

const meta: Meta<typeof TrendChart> = {
  title: 'Components/TrendChart',
  component: TrendChart,
  args: {
    data: SAMPLE_DATA,
    low: 32718,
    high: 67890,
    currentValue: 45678,
  },
  parameters: {
    docs: {
      description: {
        component:
          'Fully data-driven — `data` is plotted as straight line segments and auto-normalized, not a fixed decorative image. `currentValue` positions the "You\'re here!" marker along the low-high axis.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div data-team="bucs" data-theme="dark" style={{ background: 'var(--background-surface)', padding: '48px 0', width: 390 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof TrendChart>;

export const Default: Story = {};

export const NearTheLow: Story = {
  args: { currentValue: 34000 },
};

export const NearTheHigh: Story = {
  args: { currentValue: 65000 },
};

export const SparseData: Story = {
  args: { data: [0.1, 0.9, 0.3, 0.7, 0.2], currentValue: 50000 },
};
