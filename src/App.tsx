import React, { useEffect, useState } from 'react';
import { SplashScreen } from './screens/Splash/SplashScreen';
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

type ScreenName = 'splash' | 'welcome' | 'question' | 'gameView' | 'profile' | 'achievement';

// Keep in sync with .content-fade-out/.content-fade-in's durations in styles/motion.css.
const EXIT_MS = 300;
const ENTER_MS = 300;
// How long the splash shows before moving on to Welcome (stand-in for real app loading).
const SPLASH_MS = 2500;

/**
 * Temporary single-flow shell. As more screens are built, this becomes real routing.
 * data-team is set per the active game being shown — a real app would derive this from
 * the game's actual home team, not hardcode it.
 */
export function App() {
  const [current, setCurrent] = useState<ScreenName>('splash');
  const [transitionState, setTransitionState] = useState<ScreenTransitionState | undefined>(undefined);
  const [guess, setGuess] = useState('');
  const [selectedAchievementId, setSelectedAchievementId] = useState<string | undefined>(undefined);
  // Whether the currently open achievement is being opened for the first time (confetti).
  const [celebrateSelected, setCelebrateSelected] = useState(false);
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
  useEffect(() => {
    const timer = window.setTimeout(() => navigate('welcome'), SPLASH_MS);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    // Phone-frame preview on desktop, full-screen on phones — see .app-shell/.app-frame in index.css.
    <div className="app-shell">
      <div className="app-frame" data-team="bucs" data-theme="dark">
        {current === 'splash' && <SplashScreen transitionState={transitionState} />}
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
              setCelebrateSelected(newAchievementIds.has(achievement.id));
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
            celebrate={celebrateSelected}
            transitionState={transitionState}
            onBack={() => navigate('profile')}
          />
        )}
      </div>
    </div>
  );
}
