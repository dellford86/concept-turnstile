import React from 'react';
import { Illustration, type IllustrationType } from '../../components/Illustration/Illustration';
import { Chip } from '../../components/Chip/Chip';
import './AchievementsTab.css';

export interface Achievement {
  id: string;
  /** Omit for a locked "?" placeholder — set once Figma specs what an earned slot shows. */
  illustration?: IllustrationType;
  /** Shown below the illustration. Only meaningful when `illustration` is set. */
  label?: string;
  /** Recently unlocked and not yet opened — shows a "New" chip on the slot. */
  isNew?: boolean;
}

export interface AchievementsTabProps {
  achievements: Achievement[];
  /** Called when an earned (non-placeholder) achievement is tapped. */
  onSelectAchievement?: (achievement: Achievement) => void;
}

export function AchievementsTab({ achievements, onSelectAchievement }: AchievementsTabProps) {
  return (
    <div
      data-name="table--achievements"
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
        gap: 'var(--spacing-med)',
        padding: 'var(--spacing-lrg)',
      }}
    >
      {achievements.map((achievement) => {
        // Earned slots become buttons when there's somewhere to go; locked "?" stay inert.
        const selectable = Boolean(achievement.illustration && onSelectAchievement);
        const Cell = selectable ? 'button' : 'div';
        return (
          <Cell
            key={achievement.id}
            className="achievement-cell"
            {...(selectable ? { type: 'button' as const, onClick: () => onSelectAchievement?.(achievement) } : {})}
            style={{
              position: 'relative',
              border: 'none',
              font: 'inherit',
              width: '100%',
              cursor: selectable ? 'pointer' : undefined,
              height: 107,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 'var(--spacing-med)',
              padding: 'var(--spacing-sm)',
              background: achievement.illustration ? 'transparent' : 'var(--background-surface-light)',
              borderRadius: 'var(--radius-med)',
              boxSizing: 'border-box',
              overflow: 'hidden',
            }}
          >
            {achievement.illustration ? (
              <>
                <span className="achievement-cell__illustration">
                  <Illustration type={achievement.illustration} size={48} />
                </span>
                {achievement.label && (
                  <p
                    style={{
                      margin: 0,
                      textAlign: 'center',
                      fontFamily: 'var(--font-family-figtree)',
                      fontWeight: 'var(--font-weight-semibold)',
                      fontSize: 'var(--text-heading-xs-font-size)',
                      lineHeight: 'var(--text-heading-xs-line-height)',
                      color: 'var(--foreground-light-pr)',
                    }}
                  >
                    {achievement.label}
                  </p>
                )}
              </>
            ) : (
              <p
                style={{
                  margin: 0,
                  fontFamily: 'var(--font-family-figtree)',
                  fontWeight: 'var(--font-weight-black)',
                  fontSize: 'var(--text-display-100-font-size)',
                  lineHeight: 'var(--text-display-100-line-height)',
                  color: 'var(--foreground-light-secondary)',
                }}
              >
                ?
              </p>
            )}
            {achievement.illustration && achievement.isNew && (
              <Chip label="New" style={{ position: 'absolute', top: 'var(--spacing-sm)', right: 'var(--spacing-sm)' }} />
            )}
          </Cell>
        );
      })}
    </div>
  );
}
