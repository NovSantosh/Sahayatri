import React from 'react'

interface LogoProps {
  size?: number
  variant?: 'icon' | 'full' | 'wordmark'
  theme?: 'light' | 'dark' | 'color'
}

export function SahayatriIcon({ size = 40, theme = 'color' }: { size?: number, theme?: 'light' | 'dark' | 'color' }) {
  const fg = theme === 'dark' ? '#06040C' : 'white'
  
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Outer circle background */}
      {theme === 'color' && (
        <defs>
          <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#DC143C"/>
            <stop offset="100%" stopColor="#A50E2D"/>
          </linearGradient>
        </defs>
      )}
      
      {/* Background shape — rounded square */}
      {theme === 'color' && (
        <rect width="48" height="48" rx="14" fill="url(#logoGrad)"/>
      )}

      {/* Heart path — centered, proportional */}
      <path
        d="M24 36C24 36 10 27 10 18C10 13.5 13.5 10 18 10C20.5 10 22.8 11.2 24 13C25.2 11.2 27.5 10 30 10C34.5 10 38 13.5 38 18C38 27 24 36 24 36Z"
        fill={theme === 'color' ? fg : theme === 'light' ? '#DC143C' : '#DC143C'}
        opacity="1"
      />

      {/* Inner detail — subtle arc suggesting a path/journey */}
      <path
        d="M18 20C18 17.8 19.8 16 22 16"
        stroke={theme === 'color' ? 'rgba(255,255,255,0.35)' : 'rgba(220,20,60,0.4)'}
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Center dot — the companion */}
      <circle
        cx="24"
        cy="20"
        r="2.5"
        fill={theme === 'color' ? 'rgba(0,0,0,0.15)' : 'rgba(220,20,60,0.3)'}
      />
    </svg>
  )
}

export function SahayatriWordmark({ size = 32, color = '#DC143C' }: { size?: number, color?: string }) {
  return (
    <svg width={size * 4} height={size} viewBox="0 0 160 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <text
        x="0"
        y="30"
        fontFamily="Inter, -apple-system, sans-serif"
        fontWeight="800"
        fontSize="28"
        letterSpacing="-1"
        fill={color}>
        Sahayatri
      </text>
    </svg>
  )
}

export function SahayatriFullLogo({ size = 40, theme = 'dark' }: { size?: number, theme?: 'light' | 'dark' }) {
  const textColor = theme === 'dark' ? 'white' : '#0F0F10'
  const subColor = theme === 'dark' ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.4)'

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <SahayatriIcon size={size} theme="color"/>
      <div>
        <div style={{
          fontSize: `${size * 0.6}px`,
          fontWeight: 800,
          color: textColor,
          letterSpacing: '-0.5px',
          lineHeight: 1,
          fontFamily: 'Inter, sans-serif',
        }}>
          Sahayatri
        </div>
        <div style={{
          fontSize: `${size * 0.28}px`,
          color: subColor,
          fontWeight: 500,
          letterSpacing: '0.3px',
          marginTop: '2px',
          fontFamily: 'Inter, sans-serif',
        }}>
          साथी · Companion
        </div>
      </div>
    </div>
  )
}

export default SahayatriIcon
