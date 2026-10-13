import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';

const TEAMS = ['sideline', 'twins', 'bucs', 'lions', 'mariners', 'mlb', 'bally-sports'] as const;
const THEMES = ['light', 'dark'] as const;

function MatrixCell({ team, theme }: { team: string; theme: string }) {
  return (
    <div
      data-team={team}
      data-theme={theme}
      style={{
        background: 'var(--background-surface)',
        color: 'var(--foreground-light-pr)',
        padding: 12,
        borderRadius: 8,
        border: '1px solid var(--outline-dark)',
        fontFamily: 'ui-sans-serif, system-ui',
        fontSize: 11,
      }}
    >
      <div style={{ marginBottom: 6, fontWeight: 600 }}>
        {team} / {theme}
      </div>
      <div style={{ display: 'flex', gap: 4 }}>
        <div style={{ width: 24, height: 24, borderRadius: 4, background: 'var(--brand-bg)' }} />
        <div style={{ width: 24, height: 24, borderRadius: 4, background: 'var(--background-interactive)' }} />
        <div style={{ width: 24, height: 24, borderRadius: 4, background: 'var(--background-accent)' }} />
      </div>
      <div
        style={{
          marginTop: 6,
          padding: '4px 8px',
          borderRadius: 4,
          background: 'var(--background-interactive)',
          color: 'var(--a11y-on-interactive)',
          display: 'inline-block',
        }}
      >
        Aa
      </div>
    </div>
  );
}

const meta: Meta = {
  title: 'Tokens/Matrix',
  parameters: {
    docs: {
      description: {
        component:
          'Every team × theme combination rendered at once, independent of the toolbar globals — each cell sets its own data-team/data-theme. This is the story visual regression should watch most closely: it is the one place a token change surfaces across all 14 combinations simultaneously.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const AllTeamsAllThemes: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${THEMES.length}, 1fr)`,
        gap: 12,
        padding: 24,
        background: '#f0f0f0',
      }}
    >
      {TEAMS.flatMap((team) => THEMES.map((theme) => <MatrixCell key={`${team}-${theme}`} team={team} theme={theme} />))}
    </div>
  ),
};
