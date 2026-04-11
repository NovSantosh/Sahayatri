'use client'
import { useTheme } from '../context/ThemeContext'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      onClick={toggleTheme}
      style={{
        width: '52px',
        height: '28px',
        borderRadius: '14px',
        background: isDark ? 'rgba(220,20,60,0.2)' : '#E9EAEC',
        border: `1.5px solid ${isDark ? 'rgba(220,20,60,0.3)' : '#D5D5DC'}`,
        position: 'relative',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        flexShrink: 0,
        padding: 0,
      }}
    >
      {/* Track icons */}
      <span style={{position: 'absolute', left: '6px', top: '50%', transform: 'translateY(-50%)', fontSize: '11px', opacity: isDark ? 0.4 : 0.8, transition: 'opacity 0.3s ease'}}>☀️</span>
      <span style={{position: 'absolute', right: '5px', top: '50%', transform: 'translateY(-50%)', fontSize: '11px', opacity: isDark ? 0.9 : 0.3, transition: 'opacity 0.3s ease'}}>🌙</span>

      {/* Thumb */}
      <div style={{
        position: 'absolute',
        top: '3px',
        left: isDark ? '26px' : '3px',
        width: '20px',
        height: '20px',
        borderRadius: '50%',
        background: isDark ? '#DC143C' : 'white',
        boxShadow: isDark ? '0 2px 8px rgba(220,20,60,0.4)' : '0 2px 6px rgba(0,0,0,0.15)',
        transition: 'all 0.3s ease',
      }}/>
    </button>
  )
}
