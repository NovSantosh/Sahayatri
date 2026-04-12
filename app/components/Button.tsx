'use client'
import { motion } from '../design-system'

interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'success'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
  fullWidth?: boolean
  style?: React.CSSProperties
  icon?: React.ReactNode
}

const VARIANTS = {
  primary: {
    background: 'linear-gradient(135deg, #DC143C, #A50E2D)',
    color: 'white',
    border: 'none',
    shadow: '0 4px 16px rgba(220,20,60,0.35)',
    shadowHover: '0 6px 24px rgba(220,20,60,0.45)',
  },
  secondary: {
    background: 'rgba(220,20,60,0.08)',
    color: '#DC143C',
    border: '1px solid rgba(220,20,60,0.2)',
    shadow: 'none',
    shadowHover: '0 4px 16px rgba(220,20,60,0.15)',
  },
  ghost: {
    background: 'transparent',
    color: 'rgba(255,255,255,0.6)',
    border: '1px solid rgba(255,255,255,0.12)',
    shadow: 'none',
    shadowHover: '0 2px 8px rgba(0,0,0,0.2)',
  },
  danger: {
    background: 'linear-gradient(135deg, #DC143C, #991B1B)',
    color: 'white',
    border: 'none',
    shadow: '0 4px 16px rgba(220,20,60,0.35)',
    shadowHover: '0 6px 24px rgba(220,20,60,0.45)',
  },
  success: {
    background: 'linear-gradient(135deg, #10B981, #059669)',
    color: 'white',
    border: 'none',
    shadow: '0 4px 16px rgba(16,185,129,0.35)',
    shadowHover: '0 6px 24px rgba(16,185,129,0.45)',
  },
}

const SIZES = {
  sm: { padding: '9px 16px', fontSize: '13px', borderRadius: '10px', height: '36px' },
  md: { padding: '13px 20px', fontSize: '15px', borderRadius: '14px', height: '48px' },
  lg: { padding: '17px 28px', fontSize: '16px', borderRadius: '16px', height: '56px' },
}

export default function Button({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  fullWidth = false,
  style = {},
  icon,
}: ButtonProps) {
  const v = VARIANTS[variant]
  const s = SIZES[size]

  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className="pressable"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        width: fullWidth ? '100%' : 'auto',
        height: s.height,
        padding: s.padding,
        fontSize: s.fontSize,
        fontWeight: 700,
        fontFamily: 'Inter, sans-serif',
        letterSpacing: '-0.2px',
        borderRadius: s.borderRadius,
        background: (disabled || loading) ? 'rgba(255,255,255,0.06)' : v.background,
        color: (disabled || loading) ? 'rgba(255,255,255,0.25)' : v.color,
        border: v.border,
        boxShadow: (disabled || loading) ? 'none' : v.shadow,
        cursor: (disabled || loading) ? 'not-allowed' : 'pointer',
        transition: `all ${motion.base}`,
        outline: 'none',
        position: 'relative',
        overflow: 'hidden',
        ...style,
      }}>
      {loading ? (
        <>
          <div style={{
            width: '16px',
            height: '16px',
            border: '2px solid rgba(255,255,255,0.2)',
            borderTopColor: 'white',
            borderRadius: '50%',
            animation: 'spin 0.7s linear infinite',
            flexShrink: 0,
          }}/>
          <span>Loading…</span>
        </>
      ) : (
        <>
          {icon && <span style={{ flexShrink: 0 }}>{icon}</span>}
          {children}
        </>
      )}
    </button>
  )
}
