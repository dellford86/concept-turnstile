import type { Preview } from '@storybook/react-vite';
import React, { useEffect } from 'react';

import '../tokens/sideline-fan-ds.tokens.css';
import '../tokens/sideline-fan-ds.brand.tokens.css';
import '../tokens/sideline-fan-ds.semantics.tokens.css';

const TEAMS = ['sideline', 'twins', 'bucs', 'lions', 'mariners', 'mlb', 'bally-sports'] as const;

const preview: Preview = {
  initialGlobals: {
    theme: 'light',
    team: 'sideline',
  },
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Light / Dark mode (data-theme)',
      toolbar: {
        icon: 'mirror',
        items: [
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' },
        ],
        dynamicTitle: true,
      },
    },
    team: {
      name: 'Team',
      description: 'Active brand (data-team)',
      toolbar: {
        icon: 'paintbrush',
        items: TEAMS.map((team) => ({ value: team, title: team })),
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const { theme, team } = context.globals;
      useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        document.documentElement.setAttribute('data-team', team);
      }, [theme, team]);
      return <Story />;
    },
  ],
  parameters: {
    layout: 'fullscreen',
  },
};

export default preview;
