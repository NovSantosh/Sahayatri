'use client'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useTheme } from '../context/ThemeContext'
import { brand } from '../design-system'

export default function SOSButton() {
  const { data: session } = useSession()
  const { t } = useTheme()
  const [showModal, setShowModal] = useState(false)
  const [countdown, setCountdown] = useState(3)
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  let timer: NodeJS.Timeout

  const startSOS = () => {
    setShowModal(true)
    setCountdown(3)
    setSent(false)
    let count = 3
    timer = setInterval(() => {
      count--
      setCountdown(count)
      if (count === 0) {
        clearInterval(timer)
        sendSOS()
      }
    }, 1000)
  }

  const cancelSOS = () => {
    clearInterval(timer)
    setShowModal(false)
    setCountdown(3)
    setSent(false)
  }

  const sendSOS = async () => {
    setSending(true)
    try {
      // Get location
      let lat = 0, lng = 0
      if (navigator.geolocation) {
        await new Promise<void>((resolve) => {
          navigator.geolocation.getCurrentPosition(
            pos => { lat = pos.coords.latitude; lng = pos.coords.longitude; resolve() },
            () => resolve(),
            { timeout: 3000 }
          )
        })
      }

      // Send SOS to API
      await fetch('/api/sos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userEmail: session?.user?.email,
          userName: session?.user?.name,
          lat, lng,
          message: `🆘 SOS Alert from ${session?.user?.name}. They need immediate help.`,
          timestamp: new Date().toISOString(),
        })
      })

      // Also send notification to family room
      await fetch('/api/notifications/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          toEmail: session?.user?.email,
          title: '🆘 SOS Alert Sent',
          body: `Your family room has been notified. ${lat ? `Location: ${lat.toFixed(4)}, ${lng.toFixed(4)}` : 'Location unavailable'}`,
          type: 'sos',
        })
      })

      setSent(true)
    } catch (e) {}
    setSending(false)
  }

  return (
    <>
      {/* SOS trigger button */}
      <button
        onClick={startSOS}
        className="pressable"
        style={{
          display: 'flex', alignItems: 'center', gap: '5px',
          padding: '8px 12px',
          background: 'rgba(220,20,60,0.1)',
          border: '1px solid rgba(220,20,60,0.25)',
          borderRadius: '9999px',
          cursor: 'pointer',
          fontFamily: 'Inter, sans-serif',
          flexShrink: 0,
          animation: 'sosPulse 3s ease infinite',
        }}>
        <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: brand.primary }}/>
        <span style={{ fontSize: '12px', fontWeight: 800, color: brand.primary, letterSpacing: '0.3px' }}>SOS</span>
      </button>

      {/* SOS Modal */}
      {showModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', zIndex: 99999, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '32px', backdropFilter: 'blur(8px)' }}>

          {!sent ? (
            <div style={{ textAlign: 'center', animation: 'fadeIn 200ms ease' }}>
              {/* Countdown ring */}
              <div style={{ width: '120px', height: '120px', borderRadius: '50%', background: sending ? 'rgba(220,20,60,0.15)' : 'rgba(220,20,60,0.1)', border: '3px solid rgba(220,20,60,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', animation: 'breathe 1s ease infinite' }}>
                {sending
                  ? <div style={{ width: '40px', height: '40px', border: '3px solid rgba(255,255,255,0.2)', borderTop: '3px solid white', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }}/>
                  : <span style={{ fontSize: '48px', fontWeight: 900, color: brand.primary }}>{countdown}</span>}
              </div>

              <h2 style={{ fontSize: '24px', fontWeight: 900, color: 'white', marginBottom: '8px' }}>
                {sending ? 'Sending SOS…' : 'SOS Alert'}
              </h2>
              <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.6)', marginBottom: '8px', lineHeight: 1.6 }}>
                {sending ? 'Notifying your family room and nearest companion…' : `Alerting your family room in ${countdown} second${countdown !== 1 ? 's' : ''}…`}
              </p>

              {/* What will happen */}
              <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '16px', padding: '16px', marginBottom: '28px', textAlign: 'left' }}>
                {[
                  '🏠 Family room notified instantly',
                  '📍 Your location shared',
                  '👥 Nearest companion alerted',
                ].map((item, i) => (
                  <p key={i} style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', marginBottom: i < 2 ? '8px' : '0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {item}
                  </p>
                ))}
              </div>

              {!sending && (
                <button onClick={cancelSOS}
                  style={{ padding: '14px 40px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '14px', color: 'white', fontSize: '16px', fontWeight: 700, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
                  Cancel
                </button>
              )}
            </div>
          ) : (
            <div style={{ textAlign: 'center', animation: 'scaleIn 300ms cubic-bezier(0.34,1.56,0.64,1)' }}>
              <div style={{ width: '96px', height: '96px', borderRadius: '50%', background: 'rgba(16,185,129,0.15)', border: '3px solid rgba(16,185,129,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>
              <h2 style={{ fontSize: '24px', fontWeight: 900, color: 'white', marginBottom: '8px' }}>Alert Sent!</h2>
              <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.6)', marginBottom: '28px', lineHeight: 1.6 }}>
                Your family room has been notified. Stay calm — help is on the way.
              </p>
              <button onClick={cancelSOS}
                style={{ padding: '14px 40px', background: 'linear-gradient(135deg, #10B981, #059669)', border: 'none', borderRadius: '14px', color: 'white', fontSize: '16px', fontWeight: 700, cursor: 'pointer', fontFamily: 'Inter, sans-serif', boxShadow: '0 4px 16px rgba(16,185,129,0.35)' }}>
                Done
              </button>
            </div>
          )}
        </div>
      )}

      <style>{`
        @keyframes sosPulse { 0%,100% { box-shadow:0 0 0 0 rgba(220,20,60,0.3) } 50% { box-shadow:0 0 0 6px rgba(220,20,60,0) } }
        @keyframes breathe { 0%,100% { transform:scale(1) } 50% { transform:scale(1.05) } }
        @keyframes fadeIn { from { opacity:0;transform:scale(0.95) } to { opacity:1;transform:scale(1) } }
        @keyframes scaleIn { from { opacity:0;transform:scale(0.8) } to { opacity:1;transform:scale(1) } }
        @keyframes spin { to { transform:rotate(360deg) } }
      `}</style>
    </>
  )
}
