import React, { useState } from 'react';
import { WelcomeScreen } from './screens/Welcome/WelcomeScreen';
import { sampleWelcomeScreenProps } from './screens/Welcome/sampleData';
import { QuestionScreen } from './screens/Question/QuestionScreen';
import { sampleQuestionScreenProps } from './screens/Question/sampleData';
import { GameViewScreen } from './screens/GameView/GameViewScreen';
import { sampleAchievementNotice, sampleGameViewScreenProps } from './screens/GameView/sampleData';
import { ProfileScreen } from './screens/Profile/ProfileScreen';
import { sampleProfileScreenProps } from './screens/Profile/sampleData';
import { AchievementScreen } from './screens/Achievement/AchievementScreen';
import { sampleAchievementDetails, sampleAchievementScreenProps } from './screens/Achievement/sampleData';
import type { ScreenTransitionState } from './screens/screenTransition';

type ScreenName = 'welcome' | 'question' | 'gameView' | 'profile' | 'achievement';

// Keep in sync with .content-fade-out/.content-fade-in's durations in styles/motion.css.
const EXIT_MS = 300;
const ENTER_MS = 300;

/**
 * Temporary single-flow shell. As more screens are built, this becomes real routing.
 * data-team is set per the active game being shown — a real app would derive this from
 * the game's actual home team, not hardcode it.
 */
export function App() {
  const [current, setCurrent] = useState<ScreenName>('welcome');
  const [transitionState, setTransitionState] = useState<ScreenTransitionState | undefined>(undefined);
  const [guess, setGuess] = useState('');
  const [selectedAchievementId, setSelectedAchievementId] = useState<string | undefined>(undefined);
  // Newly earned achievements stay "unseen" (badge + tooltip on Game View) until Profile is opened.
  const [hasUnseenAchievements, setHasUnseenAchievements] = useState(true);
  // Achievements still showing a "New" chip on Profile — each clears once it's opened.
  const [newAchievementIds, setNewAchievementIds] = useState<ReadonlySet<string>>(
    () => new Set(sampleProfileScreenProps.achievements.filter((a) => a.isNew).map((a) => a.id)),
  );

  function navigate(next: ScreenName) {
    setTransitionState('exiting');
    window.setTimeout(() => {
      setCurrent(next);
      setTransitionState('entering');
      window.setTimeout(() => setTransitionState(undefined), ENTER_MS);
    }, EXIT_MS);
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: '#1a1a1a' }}>
      <div
        data-team="bucs"
        data-theme="dark"
        style={{
          width: 390,
          height: 844,
          borderRadius: 'var(--radius-lrg)',
          overflow: 'hidden',
        }}
      >
        {current === 'welcome' && (
          <WelcomeScreen {...sampleWelcomeScreenProps} transitionState={transitionState} onPlay={() => navigate('question')} />
        )}
        {current === 'question' && (
          <QuestionScreen
            {...sampleQuestionScreenProps}
            transitionState={transitionState}
            value={guess}
            onChangeValue={setGuess}
            onSubmit={() => navigate('gameView')}
          />
        )}
        {current === 'gameView' && (
          <GameViewScreen
            {...sampleGameViewScreenProps}
            transitionState={transitionState}
            attendanceGuess={Number(guess) || 45678}
            onGuessChange={(value) => setGuess(String(value))}
            achievementNotice={hasUnseenAchievements ? sampleAchievementNotice : undefined}
            onViewProfile={() => {
              setHasUnseenAchievements(false);
              navigate('profile');
            }}
          />
        )}
        {current === 'profile' && (
          <ProfileScreen
            {...sampleProfileScreenProps}
            achievements={sampleProfileScreenProps.achievements.map((a) => ({ ...a, isNew: newAchievementIds.has(a.id) }))}
            transitionState={transitionState}
            onBack={() => navigate('gameView')}
            onSelectAchievement={(achievement) => {
              setSelectedAchievementId(achievement.id);
              setNewAchievementIds((ids) => {
                const next = new Set(ids);
                next.delete(achievement.id);
                return next;
              });
              navigate('achievement');
            }}
          />
        )}
        {current === 'achievement' && (
          <AchievementScreen
            {...((selectedAchievementId && sampleAchievementDetails[selectedAchievementId]) || sampleAchievementScreenProps)}
            transitionState={transitionState}
            onBack={() => navigate('profile')}
          />
        )}
      </div>
    </div>
  );
}
