import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Background } from './Background';
import heroBackground from '../../assets/welcome/hero-background.jpg';

const meta: Meta<typeof Background> = {
  title: 'Components/Background',
  component: Background,
  parameters: {
    docs: {
      description: {
        component:
          'Full-bleed background photo tinted toward the active team (via --background-hero-tint). Use the Team toolbar control to see it retint live.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Background>;

export const Default: Story = {
  render: () => (
    <div style={{ width: 390, height: 400 }}>
      <Background image={heroBackground} />
    </div>
  ),
};

export const WithContent: Story = {
  render: () => (
    <div style={{ width: 390, height: 400 }}>
      <Background image={heroBackground}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            color: 'var(--foreground-light-pr)',
            fontFamily: 'var(--font-family-figtree)',
            fontWeight: 'var(--font-weight-black)',
            fontSize: 24,
          }}
        >
          Content sits above the tint
        </div>
      </Background>
    </div>
  ),
};
