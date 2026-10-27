import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useState } from 'react';
import { GameMenu } from './GameMenu';
import { MobileViewport } from '../../stories/MobileViewport';
import questionOutlineIcon from '../../assets/menu/question-outline.svg';
import smileyFaceIcon from '../../assets/menu/smiley-face.svg';
import userOutlineIcon from '../../assets/menu/user-outline.svg';
import homeIcon from '../../assets/menu/home.svg';

const noop = () => {};

const meta: Meta<typeof GameMenu> = {
  title: 'Components/GameMenu',
  component: GameMenu,
  args: {
    open: true,
    onClose: noop,
    items: [
      { label: 'How to Play', icon: questionOutlineIcon, disabled: true },
      { label: 'Welcome Message', icon: smileyFaceIcon, onClick: noop },
      { label: 'My Profile', icon: userOutlineIcon, onClick: noop, badge: 'new achievements' },
      { label: 'Go Back Home', icon: homeIcon, onClick: noop },
    ],
  },
  decorators: [
    (Story) => (
      <MobileViewport>
        <div data-team="bucs" data-theme="dark" style={{ position: 'relative', height: '100%', background: 'var(--background-surface-light)' }}>
          <Story />
        </div>
      </MobileViewport>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof GameMenu>;

export const Open: Story = {};

function InteractiveGameMenu(args: React.ComponentProps<typeof GameMenu>) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button type="button" onClick={() => setOpen(true)} style={{ margin: 16 }}>
        Open menu
      </button>
      <GameMenu {...args} open={open} onClose={() => setOpen(false)} />
    </>
  );
}

/** Toggle to preview the slide/fade enter and exit animations. */
export const Interactive: Story = {
  render: (args) => <InteractiveGameMenu {...args} />,
};
