import React, { useEffect, useState } from 'react';
import { SplashScreen } from './screens/Splash/SplashScreen';
import { WelcomeScreen } from './screens/Welcome/WelcomeScreen';
import { sampleWelcomeScreenProps } from './screens/Welcome/sampleData';
import { QuestionScreen } from './screens/Question/QuestionScreen';
import { sampleQuestionScreenProps } from './screens/Question/sampleData';
import { GameViewScreen } from './screens/GameView/GameViewScreen';
import {
  sampleAchievementNotice,
  sampleFinalStatusLabel,
  sampleGameViewScreenProps,
  sampleOfficialAttendance,
} from './screens/GameView/sampleData';
import { ProfileScreen } from './screens/Profile/ProfileScreen';
import { sampleProfileScreenProps } from './screens/Profile/sampleData';
import { AchievementScreen } from './screens/Achievement/AchievementScreen';
import { sampleAchievementDetails, sampleAchievementScreenProps } from './screens/Achievement/sampleData';
import { GameMenu } from './components/GameMenu/GameMenu';
import { PostGameMessage } from './components/PostGameMessage/PostGameMessage';
import type { ScreenTransitionState } from './screens/screenTransition';
import questionOutlineIcon from './assets/menu/question-outline.svg';
import smileyFaceIcon from './assets/menu/smiley-face.svg';
import userOutlineIcon from './assets/menu/user-outline.svg';
import homeIcon from './assets/menu/home.svg';
import postGameHero from './assets/post-game/hero-fans.png';

type ScreenName = 'splash' | 'welcome' | 'question' | 'gameView' | 'profile' | 'achievement';

// Keep in sync with .content-fade-out/.content-fade-in's durations in styles/motion.css.
const EXIT_MS = 300;
const ENTER_MS = 300;
// How long the splash shows before moving on to Welcome (stand-in for real app loading).
const SPLASH_MS = 2500;
// Shown as the attendance guess if the Question screen was submitted without a usable number.
const DEFAULT_GUESS = 45678;
// Profile's Games Attended rows end with the current game (Game View's TB vs NO).
const CURRENT_GAME_INDEX = sampleProfileScreenProps.gamesAttended.length - 1;
const currentGame = sampleProfileScreenProps.gamesAttended[CURRENT_GAME_INDEX];

function formatCount(value: number): string {
  return value.toLocaleString('en-US');
}

// Signed, like the Games Attended table's other outcomes: "+3,450" over, "-8,120" under.
function formatDelta(delta: number): string {
  return delta > 0 ? `+${formatCount(delta)}` : formatCount(delta);
}

/**
 * Temporary single-flow shell. As more screens are built, this becomes real routing.
 * data-team is set per the active game being shown — a real app would derive this from
 * the game's actual home team, not hardcode it.
 */
export function App() {
  const [current, setCurrent] = useState<ScreenName>('splash');
  const [transitionState, setTransitionState] = useState<ScreenTransitionState | undefined>(undefined);
  const [guess, setGuess] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // Demo switch between the live game (pre-game/in-progress) and post-game scenarios,
  // flipped from the toggle at the bottom of the game menu.
  const [isPostGame, setIsPostGame] = useState(false);
  const [isResultsOpen, setIsResultsOpen] = useState(false);
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
  // Runs on first load and again whenever the menu's "Go Back Home" returns here.
  useEffect(() => {
    if (current !== 'splash') return;
    const timer = window.setTimeout(() => navigate('welcome'), SPLASH_MS);
    return () => window.clearTimeout(timer);
  }, [current]);

  const attendanceGuess = Number(guess) || DEFAULT_GUESS;
  // Outcome = how far the guess landed from the official count (positive = over).
  const guessDelta = attendanceGuess - sampleOfficialAttendance;

  function openProfile() {
    setHasUnseenAchievements(false);
    navigate('profile');
  }

  // The menu slides out while the screen behind it fades to the destination.
  function navigateFromMenu(next: ScreenName) {
    setIsMenuOpen(false);
    navigate(next);
  }

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
            attendanceGuess={attendanceGuess}
            onGuessChange={(value) => setGuess(String(value))}
            achievementNotice={hasUnseenAchievements ? sampleAchievementNotice : undefined}
            onMenuClick={() => setIsMenuOpen(true)}
            onViewProfile={openProfile}
            isFinal={isPostGame}
            statusLabel={isPostGame ? sampleFinalStatusLabel : sampleGameViewScreenProps.statusLabel}
            onViewResults={() => setIsResultsOpen(true)}
          />
        )}
        {current === 'profile' && (
          <ProfileScreen
            {...sampleProfileScreenProps}
            achievements={sampleProfileScreenProps.achievements.map((a) => ({ ...a, isNew: newAchievementIds.has(a.id) }))}
            // The current game's row shows the user's guess, and no outcome until the game is final.
            gamesAttended={sampleProfileScreenProps.gamesAttended.map((game, index) =>
              index === CURRENT_GAME_INDEX
                ? { ...game, guess: formatCount(attendanceGuess), outcome: isPostGame ? formatDelta(guessDelta) : '--' }
                : game,
            )}
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
        <GameMenu
          open={isMenuOpen}
          onClose={() => setIsMenuOpen(false)}
          items={[
            { label: 'How to Play', icon: questionOutlineIcon, disabled: true },
            { label: 'Welcome Message', icon: smileyFaceIcon, onClick: () => navigateFromMenu('welcome') },
            {
              label: 'My Profile',
              icon: userOutlineIcon,
              badge: hasUnseenAchievements ? 'new achievements' : undefined,
              onClick: () => {
                setIsMenuOpen(false);
                openProfile();
              },
            },
            { label: 'Go Back Home', icon: homeIcon, onClick: () => navigateFromMenu('splash') },
          ]}
          toggle={{ label: 'Post-game', checked: isPostGame, onChange: setIsPostGame }}
        />
        <PostGameMessage
          open={isResultsOpen && isPostGame}
          onClose={() => setIsResultsOpen(false)}
          image={postGameHero}
          date={currentGame.date}
          title="Aww shucks!"
          paragraphs={[
            `The actual attendance count was ${formatCount(sampleOfficialAttendance)}. You missed it by ${formatCount(Math.abs(guessDelta))}.`,
            `Thank you for playing ${sampleWelcomeScreenProps.homeTeam.name} Turnstile and try your chances again on the next game!`,
          ]}
        />
      </div>
    </div>
  );
}
