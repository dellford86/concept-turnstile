# Turnstile

A concept for a stadium attendance-prediction game, built on the **Sideline Fan Design System** — a multi-team, light/dark-aware React + TypeScript component library.

## What's in here

| Path | What it is |
|---|---|
| `docs/` | Turnstile game concept source of truth — personas, fan jobs, org goals, sponsor goals, game loop. Read this before adding a component/feature/page; check it against the design checklist in each file. |
| `tokens/` | Sideline Fan Design System CSS custom properties: primitives → per-team brand → semantic. See `tokens/GUIDELINES.md` for the hard rules on how these may be consumed. |
| `src/components/` | Reusable design-system components (`Background`, `Button`, ...), each with a co-located `*.stories.tsx` for isolated viewing in Storybook. |
| `src/screens/` | Actual game screens (`Welcome`, ...), composed from `src/components/`. Screens are **not** added to Storybook — they run in the real app (see below) so they're viewed in a real app shell, not an isolated story frame. |
| `src/App.tsx` / `src/main.tsx` | The real app entry point — currently a single-screen shell; becomes real routing as more screens are added. |
| `src/stories/` | Storybook-only helpers and the token visualizations (`src/stories/tokens/`). |
| `.storybook/` | Storybook config, including the Team/Theme toolbar switcher and the a11y addon. Scoped to tokens + components only. |
| `visual-tests/` | Playwright + jest-image-snapshot visual regression suite, run independently of Storybook's own test runner. |
| `.claude/agents/` | Project subagents — see below. |

## Token architecture

Three tiers, each in its own file under `tokens/`:

1. **Primitives** (`sideline-fan-ds.tokens.css`) — raw color scales, spacing, and type scale. Named by literal value (`--spacing-8`, `--font-size-16`).
2. **Brand** (`sideline-fan-ds.brand.tokens.css`) — one `[data-team="..."]` block per team (sideline, twins, bucs, lions, mariners, mlb, bally-sports), each defining the same 7 `--brand-*` names.
3. **Semantic** (`sideline-fan-ds.semantics.tokens.css`) — the only tier components should ever consume (`--background-*`, `--foreground-*`, `--outline-*`, `--a11y-*`, `--spacing-*`, `--text-*`). Aliases tiers 1 & 2. `[data-theme="dark"]` overrides the handful of tokens that differ by theme.

Set `data-team="..."` and `data-theme="dark"` on `<html>` (or any ancestor) to switch brand/theme independently — Storybook's toolbar does exactly this.

**Read `tokens/GUIDELINES.md` before adding or using any token or component.** The short version: semantic tokens must alias primitives (never a new raw value), components consume semantic tokens only (never primitives directly), existing components get reused rather than duplicated or rebuilt, and bespoke one-off components require an explicit ask.

## Setup

```
npm install
npx playwright install chromium   # one-time, needed for a11y/visual test suites
```

## Running things

| Command | What it does |
|---|---|
| `npm run dev` | The real app, at `http://localhost:5173`. This is where screens (`src/screens/`) are actually viewed and clicked through — not Storybook. |
| `npm run build` | Production build of the app. |
| `npm run storybook` | Dev server at `http://localhost:6008`, scoped to tokens + reusable components (6006 is often taken by other local projects). |
| `npm run build-storybook` | Static production build of Storybook. |
| `npm run lint` | ESLint (TypeScript + React Hooks rules). |
| `npm run typecheck` | `tsc --noEmit` across `src/` and `.storybook/`. |
| `npm run test:a11y` | Runs every story through `@storybook/test-runner`'s built-in axe-core check. Fails the build on any violation (`a11y: { test: 'error' }` in `.storybook/preview.tsx`) — checked across whatever team/theme each story renders in. |
| `npm run test:visual` | Screenshots every story via Playwright and diffs against `__snapshots__/`. Fails on >0.01% pixel difference. |
| `npm run test:visual:update` | Regenerates the baseline snapshots — run this deliberately after an intentional visual change, review the diff, then commit the updated PNGs. |

`test:a11y` and `test:visual` both expect `npm run storybook` to already be running at `:6008`.

The single highest-value story for both suites is **Tokens/Matrix** (`src/stories/tokens/Matrix.stories.tsx`) — it renders all 7 teams × 2 themes in one screenshot, independent of the toolbar globals, so a token change that only breaks one team/theme combination still gets caught.

## Subagents (`.claude/agents/`)

| Agent | Use for |
|---|---|
| `token-component-builder` | Adding/updating tokens or components. Enforces `tokens/GUIDELINES.md`. |
| `accessibility-reviewer` | Deliberate a11y review pass — WCAG contrast across all team×theme combos, semantic HTML, keyboard/focus, ARIA. Complements, doesn't replace, `test:a11y`. |
| `lint-reviewer` | Runs ESLint plus a design-token compliance sweep ESLint can't express (raw hex/px in components, primitives used directly instead of semantic tokens). |

## Known gaps

No CI is wired up yet — `lint`, `typecheck`, `test:a11y`, and `test:visual` currently only run locally, on request.
