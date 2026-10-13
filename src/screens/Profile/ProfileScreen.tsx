import React, { useState } from 'react';
import { Background } from '../../components/Background/Background';
import { Avatar } from '../../components/Avatar/Avatar';
import { Tabs } from '../../components/Tabs/Tabs';
import { IconButton } from '../../components/IconButton/IconButton';
import { ArrowLeftIcon } from '../../components/IconButton/ArrowLeftIcon';
import { AchievementsTab, type Achievement } from './AchievementsTab';
import { GamesAttendedTab, type GameAttended } from './GamesAttendedTab';
import { contentTransitionClassName, type ScreenTransitionState } from '../screenTransition';

export type ProfileTabId = 'achievements' | 'games';

export interface ProfileScreenProps {
  bannerImage: string;
  username: string;
  achievements: Achievement[];
  gamesAttended: GameAttended[];
  onBack?: () => void;
  onSelectAchievement?: (achievement: Achievement) => void;
  transitionState?: ScreenTransitionState;
}

const TABS = [
  { id: 'achievements', label: 'Achievements' },
  { id: 'games', label: 'Games Attended' },
] as const;

export function ProfileScreen({ bannerImage, username, achievements, gamesAttended, onBack, onSelectAchievement, transitionState }: ProfileScreenProps) {
  const [activeTab, setActiveTab] = useState<ProfileTabId>('achievements');

  return (
    <div
      data-name="content"
      className={contentTransitionClassName(transitionState)}
      style={{ display: 'flex', flexDirection: 'column', height: '100%', boxSizing: 'border-box', background: 'var(--background-surface)' }}
    >
      <div data-name="banner" style={{ height: 120, flexShrink: 0 }}>
        <Background image={bannerImage}>
          <div style={{ padding: 'var(--spacing-lrg)' }}>
            <IconButton icon={<ArrowLeftIcon />} aria-label="Back" onClick={onBack} disabled={!onBack} />
          </div>
        </Background>
      </div>

      {/* position:relative here is load-bearing, not decorative: Background's own root
          is position:relative (for its internal absolute overlays), and CSS paints any
          positioned element above all static content in the same stacking context
          regardless of DOM order — without this, the banner would always render on top
          of the avatar poking up into it, even though this div comes after it. */}
      <div data-name="profile-content" style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0, position: 'relative' }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 'var(--spacing-lrg)',
            paddingTop: 'var(--spacing-lrg)',
            paddingBottom: 'var(--spacing-lrg)',
            width: '100%',
          }}
        >
          <div style={{ height: 24, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
            <Avatar />
          </div>
          <p
            style={{
              margin: 0,
              fontFamily: 'var(--font-family-figtree)',
              fontWeight: 'var(--font-weight-black)',
              fontSize: 'var(--text-heading-xxl-font-size)',
              lineHeight: 'var(--text-heading-xxl-line-height)',
              color: 'var(--foreground-light-pr)',
              textShadow: 'var(--shadow-card-low)',
            }}
          >
            {username}
          </p>
        </div>

        <div style={{ padding: 'var(--spacing-med) var(--spacing-lrg)', width: '100%', boxSizing: 'border-box' }}>
          <Tabs tabs={[...TABS]} activeId={activeTab} onChange={(id) => setActiveTab(id as ProfileTabId)} />
        </div>

        <div data-name="tab-content" style={{ flex: 1, minHeight: 0, overflowY: 'auto' }}>
          {activeTab === 'achievements' ? (
            <AchievementsTab achievements={achievements} onSelectAchievement={onSelectAchievement} />
          ) : (
            <GamesAttendedTab games={gamesAttended} />
          )}
        </div>
      </div>
    </div>
  );
}
