import React from 'react';

export interface GameAttended {
  date: string;
  opponent: string;
  guess: string;
  outcome: string;
}

export interface GamesAttendedTabProps {
  games: GameAttended[];
}

const cellStyle: React.CSSProperties = {
  flex: 1,
  minWidth: 0,
  margin: 0,
  fontFamily: 'var(--font-family-figtree)',
  fontSize: 'var(--text-heading-xs-font-size)',
  lineHeight: 'var(--text-heading-xs-line-height)',
  textShadow: 'var(--shadow-card-low)',
};

export function GamesAttendedTab({ games }: GamesAttendedTabProps) {
  return (
    <div data-name="table--games-attended" style={{ padding: 'var(--spacing-lrg)' }}>
      <div
        data-name="table"
        style={{
          display: 'flex',
          flexDirection: 'column',
          border: '1px solid var(--outline-light)',
          borderRadius: 'var(--radius-med)',
          overflow: 'hidden',
        }}
      >
        <div style={{ display: 'flex', gap: 'var(--spacing-sm)', height: 32, alignItems: 'center', padding: 'var(--spacing-med)', boxSizing: 'border-box' }}>
          <p style={{ ...cellStyle, fontWeight: 'var(--font-weight-semibold)', color: 'var(--foreground-light-secondary)', textTransform: 'uppercase' }}>
            Date
          </p>
          <p style={{ ...cellStyle, fontWeight: 'var(--font-weight-semibold)', color: 'var(--foreground-light-secondary)', textTransform: 'uppercase' }}>
            Opp
          </p>
          <p style={{ ...cellStyle, fontWeight: 'var(--font-weight-semibold)', color: 'var(--foreground-light-secondary)', textTransform: 'uppercase' }}>
            Guess
          </p>
          <p
            style={{
              ...cellStyle,
              fontWeight: 'var(--font-weight-semibold)',
              color: 'var(--foreground-light-secondary)',
              textTransform: 'uppercase',
              textAlign: 'right',
            }}
          >
            Outcome
          </p>
        </div>

        {games.map((game, index) => (
          <div
            key={index}
            style={{
              display: 'flex',
              gap: 'var(--spacing-sm)',
              height: 32,
              alignItems: 'center',
              padding: 'var(--spacing-med)',
              boxSizing: 'border-box',
              borderTop: '1px solid var(--outline-light)',
            }}
          >
            <p style={{ ...cellStyle, fontWeight: 'var(--font-weight-regular)', color: 'var(--foreground-light-pr)' }}>{game.date}</p>
            <p style={{ ...cellStyle, fontWeight: 'var(--font-weight-regular)', color: 'var(--foreground-light-pr)' }}>{game.opponent}</p>
            <p style={{ ...cellStyle, fontWeight: 'var(--font-weight-regular)', color: 'var(--foreground-light-pr)' }}>{game.guess}</p>
            <p style={{ ...cellStyle, fontWeight: 'var(--font-weight-regular)', color: 'var(--foreground-light-pr)', textAlign: 'right' }}>
              {game.outcome}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
