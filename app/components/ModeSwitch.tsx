'use client'
import { useSession } from 'next-auth/react'
import { useRouter, usePathname } from 'next/navigation'
import { brand } from '../design-system'
import { useTheme } from '../context/ThemeContext'
import { useEffect, useState } from 'react'

export default function ModeSwitch() {
  const { data: session } = useSession()
  const router = useRouter()
  const pathname = usePathname()
  const { t } = useTheme()
  const [companionEnabled, setCompanionEnabled] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!session?.user?.email) return
    fetch(`/api/profile?email=${session.user.email}`)
      .then(r => r.json())
      .then(data => {
        setCompanionEnabled(data?.user?.companionProfile?.enabled || false)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [session?.user?.email])

  const isOnCompanionDashboard = pathname?.startsWith('/companion/dashboard')

  if (loading || !companionEnabled) return null

  return (
    <div
      onClick={() => {
        if (isOnCompanionDashboard) {
          window.location.href = '/home'
        } else {
          window.location.href = '/companion/dashboard'
        }
      }}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        background: isOnCompanionDashboard
          ? 'rgba(124,58,237,0.12)'
          : brand.primaryLight,
        border: `1px solid ${isOnCompanionDashboard ? 'rgba(124,58,237,0.25)' : brand.primaryBorder}`,
        borderRadius: '9999px',
        padding: '6px 12px 6px 8px',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
      }}>
      {/* Toggle pill */}
      <div style={{
        width: '26px',
        height: '14px',
        borderRadius: '9999px',
        background: isOnCompanionDashboard ? '#7C3AED' : brand.primary,
        position: 'relative',
        flexShrink: 0,
      }}>
        <div style={{
          position: 'absolute',
          top: '2px',
          left: isOnCompanionDashboard ? '13px' : '2px',
          width: '10px',
          height: '10px',
          borderRadius: '50%',
          background: 'white',
          transition: 'left 0.2s ease',
          boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
        }}/>
      </div>
      <span style={{
        fontSize: '11px',
        fontWeight: 700,
        color: isOnCompanionDashboard ? '#7C3AED' : brand.primary,
        whiteSpace: 'nowrap' as const,
      }}>
        {isOnCompanionDashboard ? 'Companion' : 'Switch mode'}
      </span>
    </div>
  )
}
