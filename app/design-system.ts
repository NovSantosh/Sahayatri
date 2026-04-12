// ─────────────────────────────────────────────
// SAHAYATRI DESIGN SYSTEM v2.0
// World-class. Every pixel intentional.
// ─────────────────────────────────────────────

export const brand = {
  primary: '#DC143C',
  primaryDark: '#A50E2D',
  primaryLight: 'rgba(220,20,60,0.08)',
  primaryBorder: 'rgba(220,20,60,0.2)',
  warning: '#F59E0B',
  success: '#10B981',
  accent: '#6366F1',
  accentBg: 'rgba(99,102,241,0.08)',
}

// Typography scale — fluid, consistent
export const type = {
  hero: { fontSize: 'clamp(28px, 5vw, 38px)', fontWeight: 900, letterSpacing: '-1.5px', lineHeight: 1.1 },
  h1: { fontSize: 'clamp(22px, 4vw, 28px)', fontWeight: 800, letterSpacing: '-0.8px', lineHeight: 1.2 },
  h2: { fontSize: 'clamp(18px, 3vw, 22px)', fontWeight: 700, letterSpacing: '-0.5px', lineHeight: 1.3 },
  h3: { fontSize: 'clamp(15px, 2.5vw, 18px)', fontWeight: 700, letterSpacing: '-0.3px', lineHeight: 1.4 },
  body: { fontSize: 'clamp(13px, 2vw, 15px)', fontWeight: 400, lineHeight: 1.6 },
  bodyBold: { fontSize: 'clamp(13px, 2vw, 15px)', fontWeight: 600, lineHeight: 1.6 },
  caption: { fontSize: 'clamp(11px, 1.5vw, 12px)', fontWeight: 500, lineHeight: 1.5 },
  label: { fontSize: '11px', fontWeight: 700, letterSpacing: '0.8px', textTransform: 'uppercase' as const },
}

// Spacing — 4px base grid
export const space = {
  xs: '4px',
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '20px',
  '2xl': '24px',
  '3xl': '32px',
  '4xl': '40px',
  '5xl': '48px',
}

// Radius — consistent rounding
export const radius = {
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '20px',
  '2xl': '24px',
  full: '9999px',
}

// Animation — smooth, intentional
export const motion = {
  fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
  base: '250ms cubic-bezier(0.4, 0, 0.2, 1)',
  slow: '400ms cubic-bezier(0.4, 0, 0.2, 1)',
  spring: '500ms cubic-bezier(0.34, 1.56, 0.64, 1)',
  bounce: '600ms cubic-bezier(0.68, -0.55, 0.265, 1.55)',
}

// Light theme
export const light = {
  pageBg: '#F7F7F8',
  cardBg: '#FFFFFF',
  headerBg: 'rgba(247,247,248,0.92)',
  inputBg: '#F3F4F6',
  border: '#E5E7EB',
  shadow: '0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)',
  shadowHover: '0 4px 12px rgba(0,0,0,0.1), 0 8px 32px rgba(0,0,0,0.06)',
  text1: '#0F0F10',
  text2: '#374151',
  text3: '#9CA3AF',
  text4: '#D1D5DB',
}

// Dark theme
export const dark = {
  pageBg: '#06040C',
  cardBg: '#0E0B18',
  headerBg: 'rgba(6,4,12,0.92)',
  inputBg: '#13111F',
  border: 'rgba(255,255,255,0.07)',
  shadow: '0 1px 3px rgba(0,0,0,0.3), 0 4px 16px rgba(0,0,0,0.2)',
  shadowHover: '0 4px 12px rgba(0,0,0,0.4), 0 8px 32px rgba(0,0,0,0.3)',
  text1: '#F9FAFB',
  text2: '#D1D5DB',
  text3: '#6B7280',
  text4: '#374151',
}
