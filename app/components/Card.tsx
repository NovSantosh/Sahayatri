'use client'
import { useTheme } from '../context/ThemeContext'
import { motion } from '../design-system'

interface CardProps {
  children: React.ReactNode
  padding?: string
  onClick?: () => void
  hover?: boolean
  glass?: boolean
  dark?: boolean
  style?: React.CSSProperties
  className?: string
}

export default function Card({
  children,
  padding = '20px',
  onClick,
  hover = false,
  glass = false,
  dark = false,
  style = {},
  className = '',
}: CardProps) {
  const { t, theme } = useTheme()
  const isDark = theme === 'dark'

  const base: React.CSSProperties = {
    background: dark
      ? 'linear-gradient(135deg, #0E0B18, #1A0A16)'
      : glass
        ? isDark ? 'rgba(14,11,24,0.7)' : 'rgba(255,255,255,0.7)'
        : t.cardBg,
    borderRadius: '20px',
    border: dark
      ? '1px solid rgba(255,255,255,0.06)'
      : `1px solid ${t.border}`,
    boxShadow: t.shadow,
    padding,
    transition: `all ${motion.base}`,
    cursor: onClick ? 'pointer' : 'default',
    backdropFilter: glass ? 'blur(20px)' : 'none',
    WebkitBackdropFilter: glass ? 'blur(20px)' : 'none',
    ...(hover && onClick ? {
      WebkitTapHighlightColor: 'transparent',
    } : {}),
  }

  return (
    <div
      className={`${hover && onClick ? 'pressable' : ''} ${className}`}
      style={{ ...base, ...style }}
      onClick={onClick}>
      {children}
    </div>
  )
}
