import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { TokenGrid, TokenSection, TokenSwatch, TokenPage } from './TokenSwatch';

const meta: Meta = {
  title: 'Tokens/Primitives',
};

export default meta;
type Story = StoryObj;

export const Colors: Story = {
  render: () => (
    <TokenPage>
      <TokenSection title="Brand placeholders">
        <TokenGrid>
          <TokenSwatch label="brand/primary" varName="--color-brand-primary" />
          <TokenSwatch label="brand/secondary" varName="--color-brand-secondary" />
          <TokenSwatch label="brand/tertiary" varName="--color-brand-tertiary" />
        </TokenGrid>
      </TokenSection>

      <TokenSection title="Utility">
        <TokenGrid>
          <TokenSwatch label="utility/success" varName="--color-utility-success" />
          <TokenSwatch label="utility/error" varName="--color-utility-error" />
        </TokenGrid>
      </TokenSection>

      <TokenSection title="Black scale (100 darkest → 600 lightest)">
        <TokenGrid>
          <TokenSwatch label="black/100" varName="--color-black-100" />
          <TokenSwatch label="black/200" varName="--color-black-200" />
          <TokenSwatch label="black/300" varName="--color-black-300" />
          <TokenSwatch label="black/400" varName="--color-black-400" />
          <TokenSwatch label="black/500" varName="--color-black-500" />
          <TokenSwatch label="black/600" varName="--color-black-600" />
        </TokenGrid>
      </TokenSection>

      <TokenSection title="Alpha white">
        <TokenGrid>
          <TokenSwatch label="alpha-white/8" varName="--color-alpha-white-8" />
          <TokenSwatch label="alpha-white/16" varName="--color-alpha-white-16" />
          <TokenSwatch label="alpha-white/24" varName="--color-alpha-white-24" />
          <TokenSwatch label="alpha-white/40" varName="--color-alpha-white-40" />
          <TokenSwatch label="alpha-white/64" varName="--color-alpha-white-64" />
          <TokenSwatch label="alpha-white/100" varName="--color-alpha-white-100" />
        </TokenGrid>
      </TokenSection>

      <TokenSection title="Alpha black">
        <TokenGrid>
          <TokenSwatch label="alpha-black/8" varName="--color-alpha-black-8" />
          <TokenSwatch label="alpha-black/16" varName="--color-alpha-black-16" />
          <TokenSwatch label="alpha-black/24" varName="--color-alpha-black-24" />
          <TokenSwatch label="alpha-black/40" varName="--color-alpha-black-40" />
          <TokenSwatch label="alpha-black/64" varName="--color-alpha-black-64" />
          <TokenSwatch label="alpha-black/100" varName="--color-alpha-black-100" />
        </TokenGrid>
      </TokenSection>
    </TokenPage>
  ),
};
