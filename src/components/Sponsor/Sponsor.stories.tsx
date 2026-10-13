import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Sponsor } from './Sponsor';
import sponsorLogo from '../../assets/welcome/sponsor-logo.png';

const meta: Meta<typeof Sponsor> = {
  title: 'Components/Sponsor',
  component: Sponsor,
  args: {
    logo: sponsorLogo,
    name: 'Coca-Cola',
  },
  decorators: [
    (Story) => (
      <div data-team="bucs" data-theme="dark" style={{ padding: 40, display: 'flex', justifyContent: 'center' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Sponsor>;

export const Card: Story = {
  name: 'card (free-standing)',
  parameters: {
    docs: {
      description: {
        story:
          'Sits normally in the page flow, like the standalone sponsor badge on the form screens — not overlapping anything.',
      },
    },
  },
  render: (args) => (
    <div
      style={{
        width: 342,
        padding: 24,
        display: 'flex',
        justifyContent: 'center',
        background: 'var(--background-surface)',
        borderRadius: 'var(--radius-lrg)',
      }}
    >
      <Sponsor {...args} shadow="card" />
    </div>
  ),
};

export const Modal: Story = {
  name: 'modal (overlapping an edge)',
  parameters: {
    docs: {
      description: {
        story:
          'Absolutely positioned straddling another surface\'s border — like the badge floating over the game-details card on the Welcome screen. The component only supplies the shadow token; the caller positions it (see WelcomeScreen.tsx).',
      },
    },
  },
  render: (args) => (
    <div
      style={{
        position: 'relative',
        width: 342,
        paddingTop: 48,
        background: 'var(--background-scrim)',
        borderTop: '1px solid var(--outline-neutral-base)',
        borderBottomLeftRadius: 'var(--radius-lrg)',
        borderBottomRightRadius: 'var(--radius-lrg)',
      }}
    >
      <Sponsor
        {...args}
        shadow="modal"
        style={{ position: 'absolute', top: -24, left: '50%', transform: 'translateX(-50%)' }}
      />
    </div>
  ),
};
