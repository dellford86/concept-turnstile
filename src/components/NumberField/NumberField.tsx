import React, { useRef, useState } from 'react';
import './NumberField.css';

export interface NumberFieldProps {
  /** Raw digits only, e.g. "45678". Empty string renders the dimmed placeholder. */
  value: string;
  onChange: (rawDigits: string) => void;
  placeholder?: string;
  maxLength?: number;
  ariaLabel?: string;
  autoFocus?: boolean;
}

function formatWithCommas(raw: string): string {
  if (!raw) return '';
  return Number(raw).toLocaleString('en-US');
}

/**
 * Oversized numeric guess entry — the Display/100 (48px Black) number treatment used
 * on the question screens, inside a --background-surface-light pill. Dimmed
 * --foreground-inverse-muted placeholder "0" when empty and unfocused; full
 * --foreground-light-pr plus a trailing caret line once a value is entered and the
 * field isn't focused. Both the placeholder "0" and the custom caret line hide while
 * focused — the browser's own text cursor is the indicator at that point, so either
 * would just be a redundant second marker. Strips non-digits on input and formats the
 * display with thousands separators. The whole pill is the tap target, not just the
 * (auto-sized, often 1-character-wide) input inside it.
 */
export function NumberField({
  value,
  onChange,
  placeholder = '0',
  maxLength = 6,
  ariaLabel = 'Attendance guess',
  autoFocus = false,
}: NumberFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const filled = value.length > 0;
  const displayValue = formatWithCommas(value);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const digitsOnly = event.target.value.replace(/[^0-9]/g, '').slice(0, maxLength);
    onChange(digitsOnly);
  }

  // Clicks on the pill outside the input focus it with the caret at the end. Handled on
  // mousedown (and the default prevented) so an already-focused input doesn't blur and
  // re-focus, which would flash the placeholder/caret line. Clicks on the input itself
  // keep native behavior so users can still place the caret mid-number.
  function handleFieldMouseDown(event: React.MouseEvent<HTMLDivElement>) {
    const input = inputRef.current;
    if (!input || event.target === input) return;
    event.preventDefault();
    input.focus();
    const end = input.value.length;
    input.setSelectionRange(end, end);
  }

  return (
    <div
      data-name="field-container"
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'var(--spacing-lrg) var(--spacing-xl)',
        borderTopLeftRadius: 'var(--radius-lrg)',
        borderTopRightRadius: 'var(--radius-lrg)',
        boxSizing: 'border-box',
      }}
    >
      <div
        data-name="field"
        onMouseDown={handleFieldMouseDown}
        style={{
          cursor: 'text',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 10,
          background: 'var(--background-surface-light)',
          borderRadius: 'var(--radius-lrg)',
          padding: 'var(--spacing-lrg) 0',
          boxSizing: 'border-box',
        }}
      >
        <input
          ref={inputRef}
          className="number-field-input"
          type="text"
          inputMode="numeric"
          value={displayValue}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={isFocused ? '' : placeholder}
          aria-label={ariaLabel}
          autoFocus={autoFocus}
          size={Math.max((displayValue || placeholder).length, 1)}
          style={{
            fontFamily: 'var(--font-family-figtree)',
            fontWeight: 'var(--font-weight-black)',
            fontSize: 'var(--text-display-100-font-size)',
            lineHeight: 'var(--text-display-100-line-height)',
            color: filled ? 'var(--foreground-light-pr)' : 'var(--foreground-inverse-muted)',
            textAlign: 'center',
            background: 'transparent',
            border: 'none',
            outline: 'none',
            padding: 0,
            minWidth: 0,
            maxWidth: '100%',
          }}
        />
        {filled && !isFocused && (
          <span
            aria-hidden="true"
            style={{ width: 1, height: 56, background: 'var(--foreground-light-pr)', flexShrink: 0 }}
          />
        )}
      </div>
    </div>
  );
}
