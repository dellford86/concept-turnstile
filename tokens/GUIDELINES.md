# Sideline Fan Design System — Usage Guidelines

Rules for how tokens and components in this design system are allowed to be consumed. These are hard constraints, not suggestions — code review should reject anything that violates them.

## Tokens

1. **Any semantic token added in the future must be built from existing primitive tokens.** No new hardcoded hex, px, or raw values inside `sideline-fan-ds.semantics.tokens.css`. If the primitive scale doesn't have the value you need, add it to the primitive tier first (`sideline-fan-ds.tokens.css` or `sideline-fan-ds.brand.tokens.css`), then reference it with `var(--...)`.
2. **All elements/components must use semantic tokens** (`--background-*`, `--foreground-*`, `--outline-*`, `--a11y-*`, `--spacing-*`, `--text-*`), never a bare value.
3. **Primitive tokens are never used directly on elements or components.** `--color-black-100`, `--font-size-16`, `--spacing-8`, etc. only ever get referenced *from* a semantic token — not from component CSS. If a component needs a primitive value that no semantic token currently exposes, that's a gap to close in the semantic layer, not a reason to reach into primitives directly.

## Components

4. **Once a component exists in this library, it must be used exclusively.** Don't pull in an equivalent component from another design system (or another one-off implementation) once this library already has one that does the job.
5. **Never build a bespoke, one-off component unless explicitly requested.** Default to composing existing library components. A bespoke component is the exception that requires an explicit ask, not the default path.
