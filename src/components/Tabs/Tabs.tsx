import React from 'react';

export interface TabItem {
  id: string;
  label: string;
}

export interface TabsProps {
  tabs: TabItem[];
  activeId: string;
  onChange: (id: string) => void;
}

/** Segmented tab control — a surface-light pill holding equal-width tab buttons; the
 * active one gets its own raised surface pill inside. Used by ProfileScreen to switch
 * between Achievements and Games Attended, but generic enough for any 2+-tab set. */
export function Tabs({ tabs, activeId, onChange }: TabsProps) {
  return (
    <div
      data-name="tabs"
      role="tablist"
      style={{
        display: 'flex',
        width: '100%',
        padding: 'var(--spacing-med)',
        background: 'var(--background-surface-light)',
        borderRadius: 'var(--radius-pill)',
        boxSizing: 'border-box',
      }}
    >
      {tabs.map((tab) => {
        const isActive = tab.id === activeId;
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(tab.id)}
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 'var(--spacing-med)',
              border: 'none',
              borderRadius: 'var(--radius-pill)',
              background: isActive ? 'var(--background-surface)' : 'transparent',
              boxShadow: isActive ? 'var(--shadow-tab)' : 'none',
              cursor: 'pointer',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-family-figtree)',
                fontWeight: 'var(--font-weight-semibold)',
                fontSize: 'var(--text-heading-s-font-size)',
                lineHeight: 'var(--text-heading-s-line-height)',
                color: isActive ? 'var(--foreground-light-pr)' : 'var(--foreground-light-secondary)',
                whiteSpace: 'nowrap',
              }}
            >
              {tab.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
