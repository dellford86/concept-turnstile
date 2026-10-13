import React from 'react';

/**
 * Storybook-only presentation chrome — constrains a screen-level story to a phone-sized
 * frame so full screens can be reviewed at their intended size. Not part of the product
 * component tree: real screens should stay fluid (100% width/height of their container)
 * so they still work correctly in an actual mobile browser.
 */
export function MobileViewport({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        padding: 24,
        minHeight: '100vh',
        background: '#1a1a1a',
        boxSizing: 'border-box',
      }}
    >
      <div
        style={{
          width: 390,
          height: 844,
          flexShrink: 0,
          borderRadius: 16,
          overflow: 'hidden',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
        }}
      >
        {children}
      </div>
    </div>
  );
}
