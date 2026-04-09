'use client'
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import BottomNav from '../components/BottomNav'

export default function Family() {
  const { data: session } = useSession()
  const [family, setFamily] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [showCreate, setShowCreate] = useState(false)
  const [showJoin, setShowJoin] = useState(false)
  const [familyName, setFamilyName] = useState('')
  const [joinCode, setJoinCode] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (session?.user?.email) {
      fetchFamily()
      // Ping every 30 seconds to update last active
      const interval = setInterval(ping, 30000)
      ping()
      return () => clearInterval(interval)
    }
  }, [session])

  const fetchFamily = async () => {
    try {
      const res = await fetch(`/api/family?email=${session?.user?.email}`)
      const data = await res.json()
      setFamily(data.family)
    } catch (e) { console.error(e) }
    setLoading(false)
  }

  const ping = async () => {
    if (!session?.user?.email) return
    try {
      await fetch('/api/family', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'ping', email: session.user.email }),
      })
    } catch (e) { }
  }

  const handleCreate = async () => {
    setSubmitting(true)
    setError('')
    try {
      const res = await fetch('/api/family', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'create', email: session?.user?.email, familyName }),
      })
      const data = await res.json()
      if (res.ok) {
        setFamily(data.family)
        setShowCreate(false)
      } else { setError(data.error) }
    } catch (e) { setError('Something went wrong') }
    setSubmitting(false)
  }

  const handleJoin = async () => {
    if (!joinCode.trim()) return
    setSubmitting(true)
    setError('')
    try {
      const res = await fetch('/api/family', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'join', email: session?.user?.email, code: joinCode }),
      })
      const data = await res.json()
      if (res.ok) {
        setFamily(data.family)
        setShowJoin(false)
      } else { setError(data.error) }
    } catch (e) { setError('Something went wrong') }
    setSubmitting(false)
  }

  const copyCode = () => {
    navigator.clipboard.writeText(family?.code || '')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const lastActiveText = (date: string) => {
    const s = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000)
    if (s < 60) return 'Active now'
    if (s < 3600) return `${Math.floor(s / 60)}m ago`
    if (s < 86400) return `${Math.floor(s / 3600)}h ago`
    return `${Math.floor(s / 86400)}d ago`
  }

  const isOnline = (date: string) => {
    const s = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000)
    return s < 120
  }

  const initials = (name: string) => name?.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2) || 'U'

  const roleColors: any = {
    FAMILY: '#2563EB',
    COMPANION: '#059669',
    PROFESSIONAL: '#D97706',
  }

  if (loading) {
    return <div style={{minHeight: '100vh', background: '#F5F6F8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif', color: '#9CA3AF'}}>Loading...</div>
  }

  return (
    <div style={{minHeight: '100vh', background: '#F5F6F8', fontFamily: 'sans-serif', paddingBottom: '80px'}}>

      <div style={{background: 'white', padding: '52px 20px 16px', borderBottom: '1px solid #F0F1F3', position: 'sticky', top: 0, zIndex: 50}}>
        <div style={{display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between'}}>
          <div>
            <h1 style={{fontSize: '26px', fontWeight: 800, color: '#111318', letterSpacing: '-0.5px'}}>Family Room</h1>
            <p style={{fontSize: '12px', color: '#9CA3AF', marginTop: '2px', fontWeight: 500}}>
              {family ? family.name : 'Your family · All in one place'}
            </p>
          </div>
          {family && (
            <button onClick={copyCode} style={{display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 14px', background: copied ? '#ECFDF5' : '#F5F6F8', border: `1px solid ${copied ? '#059669' : '#E9EAEC'}`, borderRadius: '20px', fontSize: '12px', fontWeight: 700, color: copied ? '#059669' : '#374151', cursor: 'pointer', fontFamily: 'sans-serif'}}>
              {copied ? '✓ Copied' : `Code: ${family.code}`}
            </button>
          )}
        </div>
      </div>

      <div style={{padding: '16px', display: 'flex', flexDirection: 'column', gap: '16px'}}>

        {!family && (
          <>
            <div style={{background: 'white', borderRadius: '20px', border: '1px solid #E9EAEC', padding: '32px 20px', textAlign: 'center'}}>
              <div style={{fontSize: '56px', marginBottom: '16px'}}>👨‍👩‍👧‍👦</div>
              <h2 style={{fontSize: '20px', fontWeight: 800, color: '#111318', marginBottom: '8px'}}>Create Your Family Room</h2>
              <p style={{fontSize: '14px', color: '#6B7280', marginBottom: '24px', lineHeight: 1.6}}>Bring your family together. Share moments, see who is active, and stay connected no matter where you are.</p>
              <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
                <button onClick={() => { setShowCreate(true); setShowJoin(false); setError('') }}
                  style={{width: '100%', padding: '14px', background: 'linear-gradient(135deg, #DC143C, #A50E2D)', color: 'white', border: 'none', borderRadius: '14px', fontSize: '15px', fontWeight: 800, cursor: 'pointer', fontFamily: 'sans-serif'}}>
                  Create Family Room
                </button>
                <button onClick={() => { setShowJoin(true); setShowCreate(false); setError('') }}
                  style={{width: '100%', padding: '14px', background: 'white', color: '#374151', border: '1px solid #E9EAEC', borderRadius: '14px', fontSize: '15px', fontWeight: 700, cursor: 'pointer', fontFamily: 'sans-serif'}}>
                  Join with a Code
                </button>
              </div>
            </div>

            {showCreate && (
              <div style={{background: 'white', borderRadius: '20px', border: '1px solid #E9EAEC', padding: '20px'}}>
                {error && <div style={{background: '#FEF2F2', border: '1px solid rgba(220,20,60,0.2)', borderRadius: '10px', padding: '10px 14px', marginBottom: '12px', fontSize: '13px', color: '#DC143C', fontWeight: 600}}>{error}</div>}
                <p style={{fontSize: '15px', fontWeight: 800, color: '#111318', marginBottom: '12px'}}>Name your Family Room</p>
                <input value={familyName} onChange={(e) => setFamilyName(e.target.value)}
                  placeholder={`${session?.user?.name?.split(' ')[0]}'s Family`}
                  style={{width: '100%', border: '1px solid #E9EAEC', borderRadius: '12px', padding: '12px 14px', fontSize: '15px', color: '#111318', outline: 'none', fontFamily: 'sans-serif', boxSizing: 'border-box', marginBottom: '12px'}}
                />
                <button onClick={handleCreate} disabled={submitting}
                  style={{width: '100%', padding: '13px', background: 'linear-gradient(135deg, #DC143C, #A50E2D)', color: 'white', border: 'none', borderRadius: '12px', fontSize: '14px', fontWeight: 800, cursor: 'pointer', fontFamily: 'sans-serif'}}>
                  {submitting ? 'Creating...' : 'Create Room'}
                </button>
              </div>
            )}

            {showJoin && (
              <div style={{background: 'white', borderRadius: '20px', border: '1px solid #E9EAEC', padding: '20px'}}>
                {error && <div style={{background: '#FEF2F2', border: '1px solid rgba(220,20,60,0.2)', borderRadius: '10px', padding: '10px 14px', marginBottom: '12px', fontSize: '13px', color: '#DC143C', fontWeight: 600}}>{error}</div>}
                <p style={{fontSize: '15px', fontWeight: 800, color: '#111318', marginBottom: '12px'}}>Enter Family Code</p>
                <input value={joinCode} onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
                  placeholder="e.g. ABC123"
                  maxLength={6}
                  style={{width: '100%', border: '1px solid #E9EAEC', borderRadius: '12px', padding: '12px 14px', fontSize: '20px', color: '#111318', outline: 'none', fontFamily: 'monospace', boxSizing: 'border-box', marginBottom: '12px', letterSpacing: '4px', textAlign: 'center', fontWeight: 800}}
                />
                <button onClick={handleJoin} disabled={submitting || joinCode.length < 6}
                  style={{width: '100%', padding: '13px', background: joinCode.length >= 6 ? 'linear-gradient(135deg, #DC143C, #A50E2D)' : 'rgba(220,20,60,0.3)', color: 'white', border: 'none', borderRadius: '12px', fontSize: '14px', fontWeight: 800, cursor: joinCode.length >= 6 ? 'pointer' : 'not-allowed', fontFamily: 'sans-serif'}}>
                  {submitting ? 'Joining...' : 'Join Family Room'}
                </button>
              </div>
            )}
          </>
        )}

        {family && (
          <>
            {/* Family members */}
            <div style={{background: 'white', borderRadius: '20px', border: '1px solid #E9EAEC', overflow: 'hidden'}}>
              <div style={{padding: '16px 16px 12px', borderBottom: '1px solid #F0F1F3', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <p style={{fontSize: '15px', fontWeight: 800, color: '#111318'}}>Family Members ({family.members.length})</p>
                <div style={{display: 'flex', alignItems: 'center', gap: '6px'}}>
                  <div style={{width: '6px', height: '6px', borderRadius: '50%', background: '#22C55E'}}/>
                  <span style={{fontSize: '11px', fontWeight: 600, color: '#22C55E'}}>
                    {family.members.filter((m: any) => isOnline(m.lastActive)).length} online
                  </span>
                </div>
              </div>
              {family.members.map((member: any, i: number) => (
                <div key={i} style={{display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 16px', borderBottom: i < family.members.length - 1 ? '1px solid #F0F1F3' : 'none'}}>
                  <div style={{position: 'relative', flexShrink: 0}}>
                    {member.avatar ? (
                      <img src={member.avatar} alt={member.name} style={{width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover'}}/>
                    ) : (
                      <div style={{width: '48px', height: '48px', borderRadius: '50%', background: `linear-gradient(135deg, ${roleColors[member.role] || '#DC143C'}, ${roleColors[member.role] || '#A50E2D'})`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800, fontSize: '16px'}}>
                        {initials(member.name)}
                      </div>
                    )}
                    <div style={{position: 'absolute', bottom: '1px', right: '1px', width: '12px', height: '12px', borderRadius: '50%', background: isOnline(member.lastActive) ? '#22C55E' : '#D1D5DB', border: '2px solid white'}}/>
                  </div>
                  <div style={{flex: 1}}>
                    <div style={{display: 'flex', alignItems: 'center', gap: '6px'}}>
                      <p style={{fontSize: '15px', fontWeight: 800, color: '#111318'}}>{member.name}</p>
                      {family.admin.toString() === member.user?.toString() && (
                        <span style={{fontSize: '9px', fontWeight: 700, padding: '2px 6px', borderRadius: '20px', background: '#FEF2F2', color: '#DC143C'}}>Admin</span>
                      )}
                    </div>
                    <p style={{fontSize: '12px', color: isOnline(member.lastActive) ? '#22C55E' : '#9CA3AF', marginTop: '2px', fontWeight: 500}}>
                      {isOnline(member.lastActive) ? 'Active now' : lastActiveText(member.lastActive)}
                    </p>
                  </div>
                  <div style={{padding: '4px 10px', borderRadius: '20px', background: '#F5F6F8', fontSize: '10px', fontWeight: 700, color: '#6B7280'}}>
                    {member.role}
                  </div>
                </div>
              ))}
            </div>

            {/* Invite more */}
            <div style={{background: 'white', borderRadius: '20px', border: '1px solid #E9EAEC', padding: '20px'}}>
              <p style={{fontSize: '15px', fontWeight: 800, color: '#111318', marginBottom: '6px'}}>Invite Family Members</p>
              <p style={{fontSize: '13px', color: '#6B7280', marginBottom: '16px', lineHeight: 1.5}}>Share this code with your family. They tap "Join with a Code" and enter it to join your Family Room.</p>
              <div style={{display: 'flex', alignItems: 'center', gap: '10px', background: '#F5F6F8', borderRadius: '14px', padding: '14px 16px'}}>
                <div style={{flex: 1}}>
                  <p style={{fontSize: '11px', fontWeight: 600, color: '#9CA3AF', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.5px'}}>Your Family Code</p>
                  <p style={{fontSize: '28px', fontWeight: 800, color: '#111318', letterSpacing: '6px', fontFamily: 'monospace'}}>{family.code}</p>
                </div>
                <button onClick={copyCode}
                  style={{padding: '10px 16px', background: copied ? '#ECFDF5' : 'linear-gradient(135deg, #DC143C, #A50E2D)', color: copied ? '#059669' : 'white', border: copied ? '1px solid #059669' : 'none', borderRadius: '12px', fontSize: '13px', fontWeight: 700, cursor: 'pointer', fontFamily: 'sans-serif', flexShrink: 0}}>
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
            </div>

            {/* Recent moments from family */}
            <div style={{background: 'white', borderRadius: '20px', border: '1px solid #E9EAEC', padding: '20px'}}>
              <p style={{fontSize: '15px', fontWeight: 800, color: '#111318', marginBottom: '6px'}}>Family Activity</p>
              <p style={{fontSize: '13px', color: '#9CA3AF'}}>When family members share moments on Memory, they will appear here.</p>
              <button onClick={() => window.location.href = '/memory'}
                style={{marginTop: '14px', width: '100%', padding: '12px', background: '#F5F6F8', border: '1px solid #E9EAEC', borderRadius: '12px', fontSize: '13px', fontWeight: 700, color: '#374151', cursor: 'pointer', fontFamily: 'sans-serif'}}>
                Go to Memory Feed
              </button>
            </div>
          </>
        )}
      </div>

      <BottomNav />
    </div>
  )
}
