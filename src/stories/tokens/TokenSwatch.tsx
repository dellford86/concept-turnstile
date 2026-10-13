import React from 'react';

export function TokenSwatch({ label, varName }: { label: string; varName: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontFamily: 'ui-sans-serif, system-ui', fontSize: 12 }}>
      <div
        style={{
          width: '100%',
          height: 64,
          borderRadius: 8,
          border: '1px solid rgba(128,128,128,0.3)',
          background: `var(${varName})`,
        }}
      />
      <div style={{ fontWeight: 600 }}>{label}</div>
      <code style={{ opacity: 0.7 }}>{varName}</code>
    </div>
  );
}

export function SpacingSwatch({ label, varName }: { label: string; varName: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontFamily: 'ui-sans-serif, system-ui', fontSize: 12 }}>
      <div style={{ width: 96, fontWeight: 600 }}>{label}</div>
      <div style={{ height: 16, width: `var(${varName})`, background: 'var(--brand-interactive)', borderRadius: 2 }} />
      <code style={{ opacity: 0.7 }}>{varName}</code>
    </div>
  );
}

export function RadiusSwatch({ label, varName }: { label: string; varName: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontFamily: 'ui-sans-serif, system-ui', fontSize: 12 }}>
      <div
        style={{
          width: 120,
          height: 48,
          borderRadius: `var(${varName})`,
          background: 'var(--brand-interactive)',
        }}
      />
      <div style={{ fontWeight: 600 }}>{label}</div>
      <code style={{ opacity: 0.7 }}>{varName}</code>
    </div>
  );
}

export function TokenGrid({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
        gap: 16,
      }}
    >
      {children}
    </div>
  );
}

export function TokenSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: 32 }}>
      <h3 style={{ fontFamily: 'ui-sans-serif, system-ui', marginBottom: 12 }}>{title}</h3>
      {children}
    </section>
  );
}

export function TypeSample({
  label,
  fontSizeVar,
  lineHeightVar,
  sample = 'The quick brown fox jumps over the lazy dog',
}: {
  label: string;
  fontSizeVar: string;
  lineHeightVar: string;
  sample?: string;
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginBottom: 20 }}>
      <div
        style={{
          fontFamily: 'var(--font-family-figtree)',
          fontSize: `var(${fontSizeVar})`,
          lineHeight: `var(${lineHeightVar})`,
        }}
      >
        {sample}
      </div>
      <div style={{ display: 'flex', gap: 12, fontFamily: 'ui-sans-serif, system-ui', fontSize: 12, opacity: 0.7 }}>
        <span style={{ fontWeight: 600 }}>{label}</span>
        <code>{fontSizeVar}</code>
        <code>{lineHeightVar}</code>
      </div>
    </div>
  );
}

export function TokenPage({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        padding: 24,
        background: 'var(--background-surface)',
        color: 'var(--foreground-dark-primary)',
        minHeight: '100vh',
      }}
    >
      {children}
    </div>
  );
}
