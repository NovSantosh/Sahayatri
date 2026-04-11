// Light mode (default)
export const light = {
  pageBg: '#F7F7F8',
  cardBg: '#FFFFFF',
  cardBg2: '#F0F0F3',
  text1: '#111318',
  text2: '#4A4A5A',
  text3: '#9A9AB0',
  text4: '#C8C8D8',
  border: '#EBEBF0',
  borderStrong: '#E0E0E8',
  shadow: '0 2px 16px rgba(17,19,24,0.07)',
  shadowElevated: '0 8px 32px rgba(17,19,24,0.10)',
  headerBg: 'rgba(255,255,255,0.96)',
  navBg: 'rgba(255,255,255,0.96)',
  navBorder: 'rgba(0,0,0,0.06)',
  inputBg: '#F0F0F3',
}

// Dark mode
export const dark = {
  pageBg: '#06040C',
  cardBg: '#0E0B18',
  cardBg2: '#130F1E',
  text1: '#FFFFFF',
  text2: 'rgba(255,255,255,0.65)',
  text3: 'rgba(255,255,255,0.35)',
  text4: 'rgba(255,255,255,0.15)',
  border: 'rgba(255,255,255,0.07)',
  borderStrong: 'rgba(255,255,255,0.12)',
  shadow: '0 2px 20px rgba(0,0,0,0.35)',
  shadowElevated: '0 8px 40px rgba(0,0,0,0.5)',
  headerBg: 'rgba(6,4,12,0.95)',
  navBg: 'rgba(14,11,24,0.96)',
  navBorder: 'rgba(255,255,255,0.08)',
  inputBg: 'rgba(255,255,255,0.07)',
}

// Brand colors — same in both modes
export const brand = {
  primary: '#DC143C',
  primaryDark: '#A50E2D',
  primaryLight: 'rgba(220,20,60,0.08)',
  primaryBorder: 'rgba(220,20,60,0.18)',
  success: '#059669',
  successBg: 'rgba(5,150,105,0.08)',
  warning: '#D97706',
  warningBg: 'rgba(217,119,6,0.08)',
  info: '#2563EB',
  infoBg: 'rgba(37,99,235,0.08)',
  accent: '#7C3AED',
  accentBg: 'rgba(124,58,237,0.08)',
}

export const DS = {
  colors: {
    ...brand,
    ...light,
  },
  space: {
    xs: '4px', sm: '8px', md: '16px', lg: '24px', xl: '32px', xxl: '48px',
  },
  radius: {
    pill: '9999px', card: '20px', button: '14px', icon: '12px', sm: '10px',
  },
  shadow: {
    card: light.shadow,
    elevated: light.shadowElevated,
    primary: '0 6px 24px rgba(220,20,60,0.28)',
    dark: '0 8px 40px rgba(0,0,0,0.35)',
  },
  font: {
    h1: { fontSize: '28px', fontWeight: 800, letterSpacing: '-0.8px' },
    h2: { fontSize: '22px', fontWeight: 800, letterSpacing: '-0.5px' },
    h3: { fontSize: '17px', fontWeight: 700, letterSpacing: '-0.3px' },
    h4: { fontSize: '15px', fontWeight: 700, letterSpacing: '-0.2px' },
    body: { fontSize: '15px', fontWeight: 400, lineHeight: 1.6 },
    bodyMd: { fontSize: '14px', fontWeight: 400, lineHeight: 1.6 },
    bodySm: { fontSize: '13px', fontWeight: 400, lineHeight: 1.5 },
    label: { fontSize: '11px', fontWeight: 700, letterSpacing: '0.8px', textTransform: 'uppercase' as const },
    caption: { fontSize: '12px', fontWeight: 500 },
  },
  gradient: {
    primary: 'linear-gradient(135deg, #DC143C 0%, #A50E2D 100%)',
    dark: 'linear-gradient(135deg, #0E0B18 0%, #1A0A16 100%)',
    hero: 'linear-gradient(135deg, #0E0B18 0%, #1A0A14 50%, #0A0E1A 100%)',
  },
}
