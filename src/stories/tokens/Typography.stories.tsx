import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { TokenPage, TokenSection } from './TokenSwatch';

const meta: Meta = {
  title: 'Tokens/Primitives',
};

export default meta;
type Story = StoryObj;

const FONT_SIZES = [12, 14, 16, 20, 24, 28, 32, 40, 48, 80];
const LINE_HEIGHTS = [16, 18, 20, 24, 28, 32, 40, 48, 56, 88];

export const TypographyScale: Story = {
  render: () => (
    <TokenPage>
      <TokenSection title="Font size">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {FONT_SIZES.map((size) => (
            <div key={size} style={{ display: 'flex', alignItems: 'baseline', gap: 16 }}>
              <code style={{ width: 140, fontSize: 12, opacity: 0.7 }}>{`--font-size-${size}`}</code>
              <span style={{ fontFamily: 'var(--font-family-figtree)', fontSize: `var(--font-size-${size})` }}>Ag</span>
            </div>
          ))}
        </div>
      </TokenSection>

      <TokenSection title="Line height">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {LINE_HEIGHTS.map((lh) => (
            <div key={lh} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <code style={{ width: 140, fontSize: 12, opacity: 0.7 }}>{`--line-height-${lh}`}</code>
              <div
                style={{
                  width: 240,
                  height: `var(--line-height-${lh})`,
                  background: 'var(--color-alpha-black-8)',
                  border: '1px dashed var(--color-black-300)',
                }}
              />
            </div>
          ))}
        </div>
      </TokenSection>

      <TokenSection title="Font weight">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ fontFamily: 'var(--font-family-figtree)', fontWeight: 'var(--font-weight-regular)', fontSize: 20 }}>
            Regular (--font-weight-regular)
          </div>
          <div style={{ fontFamily: 'var(--font-family-figtree)', fontWeight: 'var(--font-weight-semibold)', fontSize: 20 }}>
            Semibold (--font-weight-semibold)
          </div>
          <div style={{ fontFamily: 'var(--font-family-figtree)', fontWeight: 'var(--font-weight-black)', fontSize: 20 }}>
            Black (--font-weight-black)
          </div>
        </div>
      </TokenSection>

      <TokenSection title="Font family">
        <div style={{ fontFamily: 'var(--font-family-figtree)', fontSize: 24 }}>
          Figtree (--font-family-figtree)
        </div>
      </TokenSection>
    </TokenPage>
  ),
};
