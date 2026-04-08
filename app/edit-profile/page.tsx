'use client'
import { useState, useEffect, useRef } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function EditProfile() {
  const { data: session, update } = useSession()
  const router = useRouter()
  const [name, setName] = useState('')
  const [bio, setBio] = useState('')
  const [location, setLocation] = useState('')
  const [avatar, setAvatar] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (session?.user?.email) fetchProfile()
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
      }
    } catch (e) { console.error(e) }
    setLoading(false)
  }

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    const formData = new FormData()
    formData.append('file', file)
    try {
      const res = await fetch('/api/upload', { method: 'POST', body: formData })
      const data = await res.json()
      if (data.url) setAvatar(data.url)
    } catch (e) { setError('Failed to upload photo') }
    setUploading(false)
  }

  const handleSave = async () => {
    if (!name.trim()) { setError('Name is required'); return }
    setSaving(true)
    setError('')
    try {
      const res = await fetch('/api/profile/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: session?.user?.email, name, bio, location, avatar }),
      })
      const data = await res.json()
      if (res.ok) {
        setSuccess(true)
        await update({ name })
        setTimeout(() => router.push('/profile'), 1500)
      } else {
        setError(data.error || 'Failed to save')
      }
    } catch (e) { setError('Something went wrong') }
    setSaving(false)
  }

  const initials = (n: string) => n?.split(' ').map((w: string) => w[0]).join('').toUpperCase().slice(0, 2) || 'U'

  if (loading) {
    return <div style={{minHeight: '100vh', background: '#F5F6F8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif', color: '#9CA3AF'}}>Loading…</div>
  }

  return (
    <div style={{minHeight: '100vh', background: '#F5F6F8', fontFamily: 'sans-serif'}}>

      {/* Header */}
      <div style={{background: 'white', padding: '52px 20px 16px', borderBottom: '1px solid #F0F1F3', position: 'sticky', top: 0, zIndex: 50}}>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
            <button onClick={() => router.back()} style={{width: '36px', height: '36px', borderRadius: '10px', background: '#F5F6F8', border: '1px solid #E9EAEC', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'}}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4A5060" strokeWidth="2.5" strokeLinecap="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
            </button>
            <h1 style={{fontSize: '20px', fontWeight: 800, color: '#111318', letterSpacing: '-0.4px'}}>Edit Profile</h1>
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            style={{padding: '8px 20px', background: saving ? 'rgba(220,20,60,0.5)' : 'linear-gradient(135deg, #DC143C, #A50E2D)', color: 'white', border: 'none', borderRadius: '20px', fontSize: '13px', fontWeight: 700, cursor: saving ? 'not-allowed' : 'pointer', fontFamily: 'sans-serif'}}>
            {saving ? 'Saving…' : 'Save'}
          </button>
        </div>
      </div>

      <div style={{padding: '24px 16px', display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '480px', margin: '0 auto'}}>

        {success && (
          <div style={{background: '#ECFDF5', border: '1px solid rgba(5,150,105,0.2)', borderRadius: '12px', padding: '12px 16px', fontSize: '13px', color: '#059669', fontWeight: 600, textAlign: 'center'}}>
            Profile updated successfully!
          </div>
        )}

        {error && (
          <div style={{background: '#FEF2F2', border: '1px solid rgba(220,20,60,0.2)', borderRadius: '12px', padding: '12px 16px', fontSize: '13px', color: '#DC143C', fontWeight: 600}}>
            {error}
          </div>
        )}

        {/* Avatar */}
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px'}}>
          <div style={{position: 'relative'}}>
            {avatar ? (
              <img src={avatar} alt="avatar" style={{width: '88px', height: '88px', borderRadius: '50%', objectFit: 'cover', border: '3px solid white', boxShadow: '0 2px 8px rgba(0,0,0,0.1)'}}/>
            ) : (
              <div style={{width: '88px', height: '88px', borderRadius: '50%', background: 'linear-gradient(135deg, #DC143C, #A50E2D)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '28px', fontWeight: 800, border: '3px solid white', boxShadow: '0 2px 8px rgba(0,0,0,0.1)'}}>
                {initials(name)}
              </div>
            )}
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              style={{position: 'absolute', bottom: '0', right: '0', width: '28px', height: '28px', borderRadius: '50%', background: '#DC143C', border: '2px solid white', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'}}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
            </button>
            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleAvatarUpload} style={{display: 'none'}}/>
          </div>
          <p style={{fontSize: '13px', color: '#9CA3AF', fontWeight: 500}}>
            {uploading ? 'Uploading…' : 'Tap camera to change photo'}
          </p>
        </div>

        {/* Form fields */}
        <div style={{background: 'white', borderRadius: '16px', border: '1px solid #E9EAEC', overflow: 'hidden'}}>
          {[
            { label: 'Full Name', value: name, setter: setName, placeholder: 'Your full name', type: 'text', required: true },
            { label: 'Location', value: location, setter: setLocation, placeholder: 'e.g. Mumbai, India', type: 'text', required: false },
          ].map((field, i, arr) => (
            <div key={field.label} style={{padding: '14px 16px', borderBottom: i < arr.length - 1 ? '1px solid #F0F1F3' : 'none'}}>
              <label style={{fontSize: '11px', fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: '6px'}}>
                {field.label} {field.required && <span style={{color: '#DC143C'}}>*</span>}
              </label>
              <input
                type={field.type}
                value={field.value}
                onChange={(e) => field.setter(e.target.value)}
                placeholder={field.placeholder}
                style={{width: '100%', border: 'none', outline: 'none', fontSize: '15px', color: '#111318', fontFamily: 'sans-serif', background: 'transparent'}}
              />
            </div>
          ))}
        </div>

        {/* Bio */}
        <div style={{background: 'white', borderRadius: '16px', border: '1px solid #E9EAEC', padding: '14px 16px'}}>
          <label style={{fontSize: '11px', fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: '6px'}}>Bio</label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Tell your story… Who are you? Why Sahayatri?"
            rows={4}
            maxLength={200}
            style={{width: '100%', border: 'none', outline: 'none', fontSize: '15px', color: '#111318', fontFamily: 'sans-serif', background: 'transparent', resize: 'none', lineHeight: 1.6, boxSizing: 'border-box'}}
          />
          <p style={{fontSize: '11px', color: '#9CA3AF', textAlign: 'right', marginTop: '4px'}}>{bio.length}/200</p>
        </div>

        {/* Account info */}
        <div style={{background: 'white', borderRadius: '16px', border: '1px solid #E9EAEC', padding: '14px 16px'}}>
          <label style={{fontSize: '11px', fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: '6px'}}>Email</label>
          <p style={{fontSize: '15px', color: '#9CA3AF'}}>{session?.user?.email}</p>
          <p style={{fontSize: '11px', color: '#9CA3AF', marginTop: '4px'}}>Email cannot be changed</p>
        </div>

        <div style={{height: '20px'}}/>
      </div>
    </div>
  )
}
