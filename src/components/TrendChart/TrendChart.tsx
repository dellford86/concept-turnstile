import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';

export interface TrendChartProps {
  /** Distribution shape — any positive numbers; auto-normalized to the chart's height. */
  data: number[];
  low: number;
  high: number;
  /** Where the viewer's own value falls on the low-high axis. */
  currentValue: number;
  currentLabel?: string;
  /**
   * Plays a one-time entrance on mount — the curve starts flat along the baseline and
   * rises into its real shape, via the same `d` transition used for ongoing data
   * updates. Opt-in, same convention as Background's animateIn — only screens where
   * this chart is freshly arriving should set it.
   */
  animateIn?: boolean;
}

const CHART_WIDTH = 304;
const CHART_HEIGHT = 66;
const DOT_RADIUS = 3;
// Room around the curve's own box so the current-value dot (the only one still drawn)
// never gets clipped by the SVG's bounds when it sits at the very low/high extreme.
const PADDING = DOT_RADIUS;
const SVG_WIDTH = CHART_WIDTH + PADDING * 2;
const SVG_HEIGHT = CHART_HEIGHT + PADDING * 2;
const BASELINE_Y = PADDING + CHART_HEIGHT;
// Keeps the tooltip at least this close to --spacing-lrg away from the edge it's
// nudged against, matching the LOW/HIGH labels' own edge margin.
const TOOLTIP_EDGE_MARGIN = 16;

function formatNumber(value: number): string {
  return Math.round(value).toLocaleString('en-US');
}

function buildPoints(data: number[]): { x: number; y: number }[] {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  return data.map((value, index) => ({
    x: PADDING + (data.length > 1 ? (index / (data.length - 1)) * CHART_WIDTH : CHART_WIDTH / 2),
    y: PADDING + CHART_HEIGHT - ((value - min) / range) * CHART_HEIGHT,
  }));
}

/** Linearly interpolates the chart's Y value at an arbitrary X fraction (0-1) along the curve. */
function interpolateY(points: { x: number; y: number }[], fraction: number): number {
  const targetX = PADDING + fraction * CHART_WIDTH;
  for (let i = 0; i < points.length - 1; i++) {
    const a = points[i];
    const b = points[i + 1];
    if (targetX >= a.x && targetX <= b.x) {
      const t = b.x === a.x ? 0 : (targetX - a.x) / (b.x - a.x);
      return a.y + (b.y - a.y) * t;
    }
  }
  return points[points.length - 1]?.y ?? BASELINE_Y;
}

/**
 * Distribution of guesses from `low` to `high`, with a marker showing where
 * `currentValue` (the viewer's own guess) falls. Fully data-driven — `data` is plotted
 * as straight line segments, auto-normalized, not a fixed decorative image.
 */
export function TrendChart({ data, low, high, currentValue, currentLabel = 'You’re here!', animateIn }: TrendChartProps) {
  const [hasEntered, setHasEntered] = useState(!animateIn);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [tooltipWidth, setTooltipWidth] = useState(0);
  const [tooltipHeight, setTooltipHeight] = useState(0);

  useEffect(() => {
    if (!animateIn) return;
    const frameId = requestAnimationFrame(() => setHasEntered(true));
    return () => cancelAnimationFrame(frameId);
  }, [animateIn]);

  // currentValue jumping (an edited guess) should snap the indicator straight to its
  // new spot, not glide there like the ongoing low/high drift and curve reshaping do.
  // React's documented "adjust state during render" pattern: comparing props to state
  // set during a prior render, and updating state synchronously when they differ, lets
  // this render (the one that actually changes position) paint with transitions off —
  // a ref read here would trigger react-hooks/refs, since refs aren't meant for render.
  const [prevCurrentValue, setPrevCurrentValue] = useState(currentValue);
  const [justChangedValue, setJustChangedValue] = useState(false);
  if (currentValue !== prevCurrentValue) {
    setPrevCurrentValue(currentValue);
    setJustChangedValue(true);
  }
  useEffect(() => {
    if (!justChangedValue) return;
    const frameId = requestAnimationFrame(() => setJustChangedValue(false));
    return () => cancelAnimationFrame(frameId);
  }, [justChangedValue]);

  // Measures the actual rendered width of both the chart (now responsive) and the
  // tooltip (variable-width text) so the tooltip can be nudged in from an edge it
  // would otherwise overflow — a pure-CSS position can't know either of those sizes.
  useLayoutEffect(() => {
    function measure() {
      setContainerWidth(wrapperRef.current?.clientWidth ?? 0);
      setTooltipWidth(tooltipRef.current?.offsetWidth ?? 0);
      setTooltipHeight(tooltipRef.current?.offsetHeight ?? 0);
    }
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [currentLabel]);

  // A constant array normalizes to a flat line at the baseline — reused as the
  // "not risen yet" state rather than special-casing the geometry.
  const points = buildPoints(hasEntered ? data : data.map(() => 0));
  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ');
  const fillPath = `M${PADDING},${BASELINE_Y} L${points.map((p) => `${p.x},${p.y}`).join(' L')} L${PADDING + CHART_WIDTH},${BASELINE_Y} Z`;

  const currentFraction = high === low ? 0.5 : Math.min(1, Math.max(0, (currentValue - low) / (high - low)));
  const currentX = PADDING + currentFraction * CHART_WIDTH;
  const currentY = interpolateY(points, currentFraction);
  // The tooltip is a plain CSS-positioned div, not part of the SVG's viewBox coordinate
  // space, so its left offset needs to be a percentage of the (now responsive) width.
  const currentXPercent = (currentX / SVG_WIDTH) * 100;

  const measured = containerWidth > 0 && tooltipWidth > 0;
  const idealLeftPx = (currentXPercent / 100) * containerWidth;
  const halfTooltip = tooltipWidth / 2;
  const clampedLeftPx = measured
    ? Math.min(Math.max(idealLeftPx, halfTooltip + TOOLTIP_EDGE_MARGIN), containerWidth - halfTooltip - TOOLTIP_EDGE_MARGIN)
    : idealLeftPx;
  const isNudged = measured && Math.abs(clampedLeftPx - idealLeftPx) > 0.5;
  const nudgedRight = clampedLeftPx > idealLeftPx;

  // Not nudged: a plain vertical line up to the tooltip's bottom-center, same as a
  // non-bent connector. Nudged: an L — vertical to the tooltip's mid-height, then
  // horizontal to whichever side edge now faces the dot (left edge if the tooltip was
  // pushed right of the dot, right edge if pushed left) — converting from pixel space
  // to the SVG's (horizontally stretched) viewBox units same as the dot/tooltip above.
  const connectorPath = isNudged
    ? (() => {
        const tooltipEdgePx = nudgedRight ? clampedLeftPx - halfTooltip : clampedLeftPx + halfTooltip;
        const tooltipEdgeX = (tooltipEdgePx / containerWidth) * SVG_WIDTH;
        const tooltipMidY = -tooltipHeight / 2;
        return `M${currentX},${currentY} L${currentX},${tooltipMidY} L${tooltipEdgeX},${tooltipMidY}`;
      })()
    : `M${currentX},${currentY} L${currentX},0`;

  return (
    <div data-name="trend-chart" style={{ width: '100%' }}>
      <div ref={wrapperRef} style={{ position: 'relative', width: '100%', marginBottom: 'var(--spacing-med)' }}>
        <div
          ref={tooltipRef}
          data-name="tooltip"
          style={{
            position: 'absolute',
            left: measured ? clampedLeftPx : `${currentXPercent}%`,
            top: 0,
            transform: 'translate(-50%, -100%)',
            background: 'var(--background-surface)',
            border: '1px solid var(--outline-accent)',
            borderRadius: 'var(--radius-sm)',
            padding: 'var(--spacing-sm)',
            whiteSpace: 'nowrap',
            transition: justChangedValue ? 'none' : 'left 1.2s ease',
          }}
        >
          <p
            style={{
              margin: 0,
              fontFamily: 'var(--font-family-figtree)',
              fontWeight: 'var(--font-weight-semibold)',
              fontSize: 'var(--text-heading-xxs-font-size)',
              lineHeight: 'var(--text-heading-xxs-line-height)',
              color: 'var(--foreground-light-pr)',
            }}
          >
            {currentLabel}
          </p>
        </div>

        <svg
          width="100%"
          height={SVG_HEIGHT}
          viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
          preserveAspectRatio="none"
          style={{ display: 'block', overflow: 'visible' }}
        >
          <defs>
            <linearGradient id="trend-chart-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" style={{ stopColor: 'var(--background-accent)', stopOpacity: 0.4 }} />
              <stop offset="100%" style={{ stopColor: 'var(--background-accent)', stopOpacity: 0 }} />
            </linearGradient>
          </defs>
          <path d={fillPath} fill="url(#trend-chart-fill)" style={{ transition: 'd 0.9s ease' }} />
          <path
            d={linePath}
            fill="none"
            stroke="var(--background-accent)"
            strokeWidth={1}
            style={{ transition: 'd 0.9s ease' }}
          />
          <path
            d={connectorPath}
            fill="none"
            stroke="var(--background-accent)"
            strokeDasharray="2 2"
            style={{ transition: justChangedValue ? 'none' : 'd 1s ease' }}
          />
        </svg>

        {/* Rendered as a plain HTML circle, not an SVG one: the chart's viewBox is
            stretched non-uniformly (preserveAspectRatio="none", for edge-to-edge
            responsiveness), which would squish an SVG circle into an ellipse. */}
        <div
          data-name="current-value-dot"
          style={{
            position: 'absolute',
            left: `${currentXPercent}%`,
            top: currentY,
            width: DOT_RADIUS * 2,
            height: DOT_RADIUS * 2,
            borderRadius: '50%',
            background: 'var(--background-accent)',
            transform: 'translate(-50%, -50%)',
            transition: justChangedValue ? 'none' : 'left 1.2s ease, top 0.9s ease',
          }}
        />
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
          boxSizing: 'border-box',
          padding: '0 var(--spacing-lrg)',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)', alignItems: 'flex-start' }}>
          <p
            style={{
              margin: 0,
              fontFamily: 'var(--font-family-figtree)',
              fontWeight: 'var(--font-weight-semibold)',
              fontSize: 'var(--text-heading-xxs-font-size)',
              lineHeight: 'var(--text-heading-xxs-line-height)',
              color: 'var(--foreground-light-pr)',
            }}
          >
            {formatNumber(low)}
          </p>
          <p
            style={{
              margin: 0,
              fontFamily: 'var(--font-family-figtree)',
              fontWeight: 'var(--font-weight-semibold)',
              fontSize: 'var(--text-heading-xxs-font-size)',
              lineHeight: 'var(--text-heading-xxs-line-height)',
              color: 'var(--foreground-light-secondary)',
            }}
          >
            LOW
          </p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)', alignItems: 'flex-end' }}>
          <p
            style={{
              margin: 0,
              fontFamily: 'var(--font-family-figtree)',
              fontWeight: 'var(--font-weight-semibold)',
              fontSize: 'var(--text-heading-xxs-font-size)',
              lineHeight: 'var(--text-heading-xxs-line-height)',
              color: 'var(--foreground-light-pr)',
            }}
          >
            {formatNumber(high)}
          </p>
          <p
            style={{
              margin: 0,
              fontFamily: 'var(--font-family-figtree)',
              fontWeight: 'var(--font-weight-semibold)',
              fontSize: 'var(--text-heading-xxs-font-size)',
              lineHeight: 'var(--text-heading-xxs-line-height)',
              color: 'var(--foreground-light-secondary)',
            }}
          >
            HIGH
          </p>
        </div>
      </div>
    </div>
  );
}
