'use client'
import { useState, useEffect, useRef, Suspense } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useTheme } from '../context/ThemeContext'
import { brand } from '../design-system'

function EditProfileForm() {
  const { data: session, update } = useSession()
  const { t } = useTheme()
  const router = useRouter()
  const searchParams = useSearchParams()
  const tab = searchParams.get('tab') || 'profile'

  const [name, setName] = useState('')
  const [bio, setBio] = useState('')
  const [location, setLocation] = useState('')
  const [avatar, setAvatar] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (session?.user) {
      setName(session.user.name || '')
      setEmail(session.user.email || '')
      fetchProfile()
    }
  }, [session])

  const fetchProfile = async () => {
    try {
      const res = await fetch(`/api/profile?email=${session?.user?.email}`)
      const data = await res.json()
      if (data.user) {
        setName(data.user.name || '')
        setBio(data.user.bio || '')
        setLocation(data.user.location || '')
        setAvatar(data.user.avatar || '')
        setPhone(data.user.phone || '')
        setEmail(data.user.email || '')
      }
    } catch (e) {}
    setLoading(false)
  }

  const handleSave = async () => {
    setSaving(true)
    setError('')
    try {
      const res = await fetch('/api/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: session?.user?.email, name, bio, location, avatar, phone })
      })
      if (res.ok) {
        await update({ name })
        setSuccess(true)
        setTimeout(() => { setSuccess(false); router.push('/profile') }, 1500)
      } else {
        setError('Failed to save. Try again.')
      }
    } catch (e) {
      setError('Network error. Try again.')
    }
    setSaving(false)
  }

  const handlePasswordChange = async () => {
    if (newPassword !== confirmPassword) { setError('Passwords do not match'); return }
    if (newPassword.length < 6) { setError('Password must be at least 6 characters'); return }
    setSaving(true)
    setError('')
    try {
      const res = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: session?.user?.email, currentPassword, newPassword })
      })
      if (res.ok) {
        setSuccess(true)
        setCurrentPassword(''); setNewPassword(''); setConfirmPassword('')
        setTimeout(() => { setSuccess(false); router.push('/profile') }, 1500)
      } else {
        setError('Current password is incorrect')
      }
    } catch (e) {
      setError('Network error. Try again.')
    }
    setSaving(false)
  }

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onloadend = () => setAvatar(reader.result as string)
    reader.readAsDataURL(file)
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    background: t.inputBg,
    border: `1px solid ${t.border}`,
    borderRadius: '14px',
    padding: '14px 16px',
    fontSize: '15px',
    color: t.text1,
    outline: 'none',
    fontFamily: 'Inter, sans-serif',
    boxSizing: 'border-box',
    transition: 'all 0.2s ease',
  }

  const labelStyle: React.CSSProperties = {
    fontSize: '12px',
    fontWeight: 600,
    color: t.text3,
    marginBottom: '6px',
    display: 'block',
    letterSpacing: '0.3px',
  }

  const TABS = [
    { id: 'profile', label: 'Profile' },
    { id: 'password', label: 'Password' },
    { id: 'phone', label: 'Phone' },
    { id: 'email', label: 'Email' },
  ]

  if (loading) return (
    <div style={{ minHeight: '100vh', background: t.pageBg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: '36px', height: '36px', border: `3px solid ${t.border}`, borderTop: `3px solid ${brand.primary}`, borderRadius: '50%', animation: 'spin 0.8s linear infinite' }}/>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  )

  return (
    <div style={{ minHeight: '100vh', background: t.pageBg, fontFamily: 'Inter, sans-serif', paddingBottom: '40px', transition: 'background 0.3s ease' }}>

      {/* Success overlay */}
      {success && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(8px)' }}>
          <div style={{ background: t.cardBg, borderRadius: '24px', padding: '32px', textAlign: 'center', border: `1px solid ${t.border}` }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(16,185,129,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <p style={{ fontSize: '18px', fontWeight: 800, color: t.text1 }}>Saved!</p>
          </div>
        </div>
      )}

      {/* Header */}
      <div style={{ background: t.headerBg, backdropFilter: 'blur(20px)', padding: '52px 20px 0', borderBottom: `1px solid ${t.border}`, position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
          <button onClick={() => router.back()}
            style={{ width: '38px', height: '38px', borderRadius: '12px', background: t.inputBg, border: `1px solid ${t.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={t.text2} strokeWidth="2.5" strokeLinecap="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
          </button>
          <h1 style={{ fontSize: '20px', fontWeight: 800, color: t.text1, letterSpacing: '-0.4px' }}>Edit Profile</h1>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '6px', paddingBottom: '14px', overflowX: 'auto', scrollbarWidth: 'none' }}>
          {TABS.map(t2 => (
            <button key={t2.id}
              onClick={() => router.push(`/edit-profile?tab=${t2.id}`)}
              style={{ flexShrink: 0, padding: '7px 16px', borderRadius: '9999px', border: 'none', background: tab === t2.id ? 'linear-gradient(135deg, #DC143C, #A50E2D)' : t.inputBg, color: tab === t2.id ? 'white' : t.text3, fontSize: '13px', fontWeight: 700, cursor: 'pointer', fontFamily: 'Inter, sans-serif', transition: 'all 0.2s ease', boxShadow: tab === t2.id ? '0 4px 12px rgba(220,20,60,0.25)' : 'none' }}>
              {t2.label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ padding: '20px 16px', display: 'flex', flexDirection: 'column', gap: '14px' }}>

        {error && (
          <div style={{ background: 'rgba(220,20,60,0.08)', border: `1px solid rgba(220,20,60,0.2)`, borderRadius: '14px', padding: '13px 16px', fontSize: '14px', color: brand.primary, fontWeight: 600 }}>
            {error}
          </div>
        )}

        {/* ── PROFILE TAB ── */}
        {tab === 'profile' && (
          <>
            {/* Avatar */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', padding: '24px', background: t.cardBg, borderRadius: '20px', border: `1px solid ${t.border}` }}>
              <div style={{ position: 'relative' }}>
                {avatar
                  ? <img src={avatar} style={{ width: '88px', height: '88px', borderRadius: '50%', objectFit: 'cover' }} alt="Avatar"/>
                  : <div style={{ width: '88px', height: '88px', borderRadius: '50%', background: 'linear-gradient(135deg, #DC143C, #A50E2D)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800, fontSize: '28px' }}>
                      {name?.[0]?.toUpperCase() || 'U'}
                    </div>}
                <button onClick={() => fileInputRef.current?.click()}
                  style={{ position: 'absolute', bottom: 0, right: 0, width: '28px', height: '28px', borderRadius: '50%', background: brand.primary, border: '2px solid white', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round"><path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/><circle cx="12" cy="13" r="4"/></svg>
                </button>
              </div>
              <input ref={fileInputRef} type="file" accept="image/*" onChange={handleAvatarUpload} style={{ display: 'none' }}/>
              <p style={{ fontSize: '13px', color: t.text3 }}>Tap to change photo</p>
            </div>

            {/* Fields */}
            <div style={{ background: t.cardBg, borderRadius: '20px', border: `1px solid ${t.border}`, padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={labelStyle}>Full name *</label>
                <input value={name} onChange={e => setName(e.target.value)} placeholder="Your full name" style={inputStyle}/>
              </div>
              <div>
                <label style={labelStyle}>Bio</label>
                <textarea value={bio} onChange={e => setBio(e.target.value)}
                  placeholder="Tell your story… Who are you? Why Sahayatri?"
                  rows={3}
                  style={{ ...inputStyle, resize: 'none', lineHeight: 1.6 }}/>
              </div>
              <div>
                <label style={labelStyle}>Location</label>
                <input value={location} onChange={e => setLocation(e.target.value)} placeholder="e.g. Vancouver, Canada" style={inputStyle}/>
              </div>
            </div>

            <button onClick={handleSave} disabled={saving}
              style={{ width: '100%', padding: '16px', background: saving ? t.inputBg : 'linear-gradient(135deg, #DC143C, #A50E2D)', border: 'none', borderRadius: '16px', color: saving ? t.text3 : 'white', fontSize: '16px', fontWeight: 800, cursor: saving ? 'not-allowed' : 'pointer', fontFamily: 'Inter, sans-serif', boxShadow: saving ? 'none' : '0 6px 24px rgba(220,20,60,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              {saving ? 'Saving…' : 'Save Changes'}
            </button>
          </>
        )}

        {/* ── PASSWORD TAB ── */}
        {tab === 'password' && (
          <>
            <div style={{ background: t.cardBg, borderRadius: '20px', border: `1px solid ${t.border}`, padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={labelStyle}>Current password</label>
                <input type="password" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} placeholder="Enter current password" style={inputStyle}/>
              </div>
              <div>
                <label style={labelStyle}>New password</label>
                <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} placeholder="Min. 6 characters" style={inputStyle}/>
                {newPassword.length > 0 && (
                  <div style={{ display: 'flex', gap: '4px', marginTop: '8px' }}>
                    {[1,2,3,4].map(i => (
                      <div key={i} style={{ flex: 1, height: '3px', borderRadius: '9999px', background: newPassword.length >= i * 2 ? i <= 2 ? '#F59E0B' : '#10B981' : t.border, transition: 'background 0.3s' }}/>
                    ))}
                  </div>
                )}
              </div>
              <div>
                <label style={labelStyle}>Confirm new password</label>
                <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="Repeat new password" style={{ ...inputStyle, border: `1px solid ${confirmPassword && confirmPassword !== newPassword ? '#EF4444' : confirmPassword && confirmPassword === newPassword ? '#10B981' : t.border}` }}/>
                {confirmPassword && confirmPassword !== newPassword && (
                  <p style={{ fontSize: '12px', color: '#EF4444', marginTop: '6px' }}>Passwords do not match</p>
                )}
              </div>
            </div>

            <button onClick={handlePasswordChange} disabled={saving || !currentPassword || !newPassword || newPassword !== confirmPassword}
              style={{ width: '100%', padding: '16px', background: (!currentPassword || !newPassword || newPassword !== confirmPassword) ? t.inputBg : 'linear-gradient(135deg, #DC143C, #A50E2D)', border: 'none', borderRadius: '16px', color: (!currentPassword || !newPassword || newPassword !== confirmPassword) ? t.text3 : 'white', fontSize: '16px', fontWeight: 800, cursor: (!currentPassword || !newPassword || newPassword !== confirmPassword) ? 'not-allowed' : 'pointer', fontFamily: 'Inter, sans-serif', boxShadow: (currentPassword && newPassword && newPassword === confirmPassword) ? '0 6px 24px rgba(220,20,60,0.35)' : 'none' }}>
              {saving ? 'Updating…' : 'Update Password'}
            </button>
          </>
        )}

        {/* ── PHONE TAB ── */}
        {tab === 'phone' && (
          <>
            <div style={{ background: t.cardBg, borderRadius: '20px', border: `1px solid ${t.border}`, padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={labelStyle}>Phone number</label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <div style={{ ...inputStyle, width: '80px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '14px 10px' }}>
                    <span style={{ fontSize: '14px', color: t.text2 }}>+977</span>
                  </div>
                  <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="98XXXXXXXX" style={{ ...inputStyle, flex: 1 }}/>
                </div>
              </div>
              <div style={{ padding: '14px', background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.15)', borderRadius: '12px' }}>
                <p style={{ fontSize: '13px', color: '#10B981', lineHeight: 1.5 }}>
                  📱 A verification code will be sent to confirm your new number
                </p>
              </div>
            </div>

            <button onClick={handleSave} disabled={saving || !phone}
              style={{ width: '100%', padding: '16px', background: (!phone || saving) ? t.inputBg : 'linear-gradient(135deg, #DC143C, #A50E2D)', border: 'none', borderRadius: '16px', color: (!phone || saving) ? t.text3 : 'white', fontSize: '16px', fontWeight: 800, cursor: (!phone || saving) ? 'not-allowed' : 'pointer', fontFamily: 'Inter, sans-serif', boxShadow: phone && !saving ? '0 6px 24px rgba(220,20,60,0.35)' : 'none' }}>
              {saving ? 'Saving…' : 'Update Phone Number'}
            </button>
          </>
        )}

        {/* ── EMAIL TAB ── */}
        {tab === 'email' && (
          <>
            <div style={{ background: t.cardBg, borderRadius: '20px', border: `1px solid ${t.border}`, padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={labelStyle}>Current email</label>
                <input value={session?.user?.email || ''} disabled style={{ ...inputStyle, opacity: 0.5 }}/>
              </div>
              <div>
                <label style={labelStyle}>New email address</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="new@email.com" style={inputStyle}/>
              </div>
              <div style={{ padding: '14px', background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.15)', borderRadius: '12px' }}>
                <p style={{ fontSize: '13px', color: '#F59E0B', lineHeight: 1.5 }}>
                  ⚠️ Changing your email will require re-verification. You will need to sign in again.
                </p>
              </div>
            </div>

            <button onClick={handleSave} disabled={saving || !email || email === session?.user?.email}
              style={{ width: '100%', padding: '16px', background: (!email || email === session?.user?.email || saving) ? t.inputBg : 'linear-gradient(135deg, #DC143C, #A50E2D)', border: 'none', borderRadius: '16px', color: (!email || email === session?.user?.email || saving) ? t.text3 : 'white', fontSize: '16px', fontWeight: 800, cursor: (!email || email === session?.user?.email || saving) ? 'not-allowed' : 'pointer', fontFamily: 'Inter, sans-serif', boxShadow: (email && email !== session?.user?.email && !saving) ? '0 6px 24px rgba(220,20,60,0.35)' : 'none' }}>
              {saving ? 'Saving…' : 'Update Email'}
            </button>
          </>
        )}
      </div>
      <style>{`input::placeholder,textarea::placeholder{color:${t.text3}}`}</style>
    </div>
  )
}

export default function EditProfile() {
  return <Suspense><EditProfileForm/></Suspense>
}
