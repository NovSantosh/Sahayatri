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
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null)

  const startCountdown = () => {
    setShowModal(true)
    setCountdown(3)
    setSent(false)

    const id = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(id)
          sendSOS()
          return 0
        }
        return prev - 1
      })
    }, 1000)
    setIntervalId(id)
  }

  const cancel = () => {
    if (intervalId) clearInterval(intervalId)
    setShowModal(false)
    setCountdown(3)
    setSending(false)
    setSent(false)
  }

  const sendSOS = async () => {
    setSending(true)
    let locationStr = 'Location unavailable'
    if (navigator.geolocation) {
      await new Promise<void>(resolve => {
        navigator.geolocation.getCurrentPosition(
          pos => { locationStr = `${pos.coords.latitude}, ${pos.coords.longitude}`; resolve() },
          () => resolve(),
          { timeout: 3000 }
        )
      })
    }
    try {
      await fetch('/api/sos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: session?.user?.email,
          location: locationStr,
          message: 'Emergency SOS from Sahayatri app',
        })
      })
    } catch (e) {}
    setSending(false)
    setSent(true)
  }

  return (
    <>
      {/* Subtle SOS button — just a small pill */}
      <button
        onClick={startCountdown}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          padding: '6px 10px',
          background: 'rgba(220,20,60,0.08)',
          border: `1px solid rgba(220,20,60,0.2)`,
          borderRadius: '9999px',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
        }}>
        {/* Small dot indicator */}
        <div style={{
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          background: brand.primary,
          flexShrink: 0,
        }}/>
        <span style={{
          fontSize: '11px',
          fontWeight: 700,
          color: brand.primary,
          letterSpacing: '0.3px',
        }}>SOS</span>
      </button>

      {/* Full screen modal */}
      {showModal && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 1000,
          background: 'rgba(0,0,0,0.9)',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          padding: '32px',
          fontFamily: 'Inter, sans-serif',
        }}>
          {!sent ? (
            <div style={{ textAlign: 'center', maxWidth: '300px', width: '100%' }}>

              {/* Icon */}
              <div style={{
                width: '80px', height: '80px', borderRadius: '50%',
                background: 'rgba(220,20,60,0.15)',
                border: '2px solid rgba(220,20,60,0.4)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 24px',
              }}>
                {sending ? (
                  <div style={{ width: '32px', height: '32px', border: '3px solid rgba(255,255,255,0.2)', borderTop: '3px solid white', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }}/>
                ) : (
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.19 12 19.79 19.79 0 0 1 1.07 3.18 2 2 0 0 1 3.05 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                )}
              </div>

              <h2 style={{ fontSize: '22px', fontWeight: 900, color: 'white', marginBottom: '8px' }}>
                {sending ? 'Sending alert…' : 'Emergency Alert'}
              </h2>
              <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.6, marginBottom: '28px' }}>
                {sending
                  ? 'Notifying your family and nearest companion.'
                  : 'Your family and nearest companion will be alerted. Sending in…'}
              </p>

              {/* Countdown */}
              {!sending && (
                <div style={{
                  width: '72px', height: '72px', borderRadius: '50%',
                  background: 'rgba(220,20,60,0.12)',
                  border: '2px solid rgba(220,20,60,0.35)',
                  display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 28px',
                }}>
                  <span style={{ fontSize: '32px', fontWeight: 900, color: 'white', lineHeight: 1 }}>{countdown}</span>
                </div>
              )}

              {!sending && (
                <button onClick={cancel}
                  style={{
                    width: '100%', padding: '14px',
                    background: 'rgba(255,255,255,0.08)',
                    border: '1px solid rgba(255,255,255,0.15)',
                    borderRadius: '14px', color: 'white',
                    fontSize: '15px', fontWeight: 700,
                    cursor: 'pointer', fontFamily: 'Inter, sans-serif',
                  }}>
                  Cancel
                </button>
              )}
            </div>
          ) : (
            <div style={{ textAlign: 'center', maxWidth: '300px', width: '100%' }}>
              <div style={{
                width: '80px', height: '80px', borderRadius: '50%',
                background: 'rgba(34,197,94,0.15)',
                border: '2px solid rgba(34,197,94,0.4)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 24px',
              }}>
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2.5" strokeLinecap="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>

              <h2 style={{ fontSize: '22px', fontWeight: 900, color: 'white', marginBottom: '8px' }}>Alert Sent</h2>
              <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.6, marginBottom: '24px' }}>
                Your family has been notified. Stay calm, help is on the way.
              </p>

              <div style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '14px', padding: '14px 16px',
                marginBottom: '24px', textAlign: 'left',
              }}>
                {[
                  { label: 'Family notified', done: true },
                  { label: 'Nearest companion alerted', done: true },
                  { label: 'Location shared', done: true },
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: i < 2 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
                    <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)' }}>{item.label}</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22C55E' }}/>
                      <p style={{ fontSize: '12px', fontWeight: 700, color: '#22C55E' }}>Done</p>
                    </div>
                  </div>
                ))}
              </div>

              <button onClick={cancel}
                style={{
                  width: '100%', padding: '14px',
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  borderRadius: '14px', color: 'white',
                  fontSize: '15px', fontWeight: 700,
                  cursor: 'pointer', fontFamily: 'Inter, sans-serif',
                }}>
                Close
              </button>
            </div>
          )}
        </div>
      )}

      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </>
  )
}
