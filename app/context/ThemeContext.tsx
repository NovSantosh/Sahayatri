'use client'
import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { light, dark, brand } from '../design-system'

type Theme = 'light' | 'dark'

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
  t: typeof light & typeof brand
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  toggleTheme: () => {},
  t: { ...light, ...brand },
})

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light')

  useEffect(() => {
    const saved = localStorage.getItem('sahayatri-theme') as Theme
    if (saved) setTheme(saved)
  }, [])

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light'
    setTheme(next)
    localStorage.setItem('sahayatri-theme', next)
  }

  const t = theme === 'light'
    ? { ...light, ...brand }
    : { ...dark, ...brand }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, t }}>
      <div style={{background: t.pageBg, minHeight: '100vh', transition: 'background 0.3s ease'}}>
        {children}
      </div>
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
