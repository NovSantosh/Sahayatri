'use client'
import { useState, useEffect, useRef } from 'react'
import { useSession } from 'next-auth/react'
import BottomNav from '../components/BottomNav'

const NEPALI_FESTIVALS = [
  { name: 'Dashain', nepali: 'दशैं', date: new Date('2025-10-02'), emoji: '🎊' },
  { name: 'Tihar', nepali: 'तिहार', date: new Date('2025-10-20'), emoji: '🪔' },
  { name: 'Holi', nepali: 'होली', date: new Date('2026-03-14'), emoji: '🎨' },
  { name: 'Teej', nepali: 'तीज', date: new Date('2026-08-20'), emoji: '💃' },
  { name: 'Maghe Sankranti', nepali: 'माघे संक्रान्ति', date: new Date('2026-01-14'), emoji: '🌸' },
]

const NEPALI_WORDS = [
  { word: 'आमा', meaning: 'Mother — the one who gives life', roman: 'Aama' },
  { word: 'बुबा', meaning: 'Father — the pillar of the family', roman: 'Buba' },
  { word: 'माया', meaning: 'Love — the deepest kind', roman: 'Maya' },
  { word: 'घर', meaning: 'Home — where the heart is', roman: 'Ghar' },
  { word: 'साथी', meaning: 'Companion — fellow traveler', roman: 'Sathi' },
  { word: 'परिवार', meaning: 'Family — everything', roman: 'Pariwar' },
  { word: 'खुशी', meaning: 'Happiness — what we seek', roman: 'Khushi' },
  { word: 'सपना', meaning: 'Dream — what keeps us going', roman: 'Sapana' },
]

const NEPALI_QUOTES = [
  'जहाँ जान्छ नेपाली, त्यहाँ जान्छ साथी।',
  'आमाको माया संसारमा सबैभन्दा ठूलो हो।',
  'परिवार नै सबैभन्दा ठूलो धन हो।',
  'टाढा भए पनि मन सधैँ नजिकै छ।',
]

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
  const [activeTab, setActiveTab] = useState<'home' | 'members' | 'wall'>('home')
  const [lampLit, setLampLit] = useState(false)
  const [goodnight, setGoodnight] = useState(false)
  const [feeling, setFeeling] = useState<string | null>(null)
  const [mayaSent, setMayaSent] = useState(false)
  const [showMayaAnim, setShowMayaAnim] = useState(false)
  const [voiceMessages, setVoiceMessages] = useState<any[]>([])
  const [recording, setRecording] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [playingId, setPlayingId] = useState<string | null>(null)
  const [recordingTime, setRecordingTime] = useState(0)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])
  const timerRef = useRef<any>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    if (session?.user?.email) {
      fetchFamily()
      ping()
      const interval = setInterval(ping, 30000)
      return () => clearInterval(interval)
    }
  }, [session])

  useEffect(() => {
    if (family?.code) fetchVoiceMessages()
  }, [family])

  const fetchFamily = async () => {
    try {
      const res = await fetch(`/api/family?email=${session?.user?.email}`)
      const data = await res.json()
      setFamily(data.family)
    } catch (e) { console.error(e) }
    setLoading(false)
  }

  const fetchVoiceMessages = async () => {
    try {
      const res = await fetch(`/api/voice?familyCode=${family?.code}&type=family`)
      const data = await res.json()
      setVoiceMessages(data.messages || [])
    } catch (e) { console.error(e) }
  }

  const ping = async () => {
    if (!session?.user?.email) return
    try {
      await fetch('/api/family', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'ping', email: session.user.email }),
      })
    } catch (e) {}
  }

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder
      audioChunksRef.current = []
      mediaRecorder.ondataavailable = (e) => { if (e.data.size > 0) audioChunksRef.current.push(e.data) }
      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' })
        stream.getTracks().forEach(t => t.stop())
        await uploadVoice(audioBlob)
      }
      mediaRecorder.start()
      setRecording(true)
      setRecordingTime(0)
      timerRef.current = setInterval(() => setRecordingTime(prev => prev + 1), 1000)
    } catch (e) { setError('Microphone permission denied.') }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && recording) {
      mediaRecorderRef.current.stop()
      setRecording(false)
      clearInterval(timerRef.current)
    }
  }

  const uploadVoice = async (audioBlob: Blob) => {
    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('audio', audioBlob, 'voice.webm')
      formData.append('senderName', session?.user?.name || 'Family Member')
      formData.append('familyCode', family?.code || '')
      formData.append('type', 'family')
      const res = await fetch('/api/voice', { method: 'POST', body: formData })
      if (res.ok) await fetchVoiceMessages()
    } catch (e) { setError('Failed to send voice message') }
    setUploading(false)
  }

  const playVoice = (msg: any) => {
    if (playingId === msg._id) {
      audioRef.current?.pause()
      setPlayingId(null)
      return
    }
    if (audioRef.current) audioRef.current.pause()
    const audio = new Audio(msg.audioUrl)
    audioRef.current = audio
    setPlayingId(msg._id)
    audio.play()
    audio.onended = () => setPlayingId(null)
  }

  const sendMaya = () => {
    setMayaSent(true)
    setShowMayaAnim(true)
    setTimeout(() => setShowMayaAnim(false), 2500)
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
      if (res.ok) { setFamily(data.family); setShowCreate(false) }
      else setError(data.error)
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
      if (res.ok) { setFamily(data.family); setShowJoin(false) }
      else setError(data.error)
    } catch (e) { setError('Something went wrong') }
    setSubmitting(false)
  }

  const copyCode = () => {
    navigator.clipboard.writeText(family?.code || '')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const isOnline = (date: string) => Math.floor((Date.now() - new Date(date).getTime()) / 1000) < 120

  const timeAgo = (date: string) => {
    const s = Math.floor((Date.now() - new Date(date).getTime()) / 1000)
    if (s < 60) return 'just now'
    if (s < 3600) return `${Math.floor(s / 60)}m ago`
    if (s < 86400) return `${Math.floor(s / 3600)}h ago`
    return `${Math.floor(s / 86400)}d ago`
  }

  const initials = (name: string) => name?.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2) || 'U'

  const formatTime = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`

  // Times
  const now = new Date()
  const kathmandu = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Kathmandu' }))
  const vancouver = new Date(now.toLocaleString('en-US', { timeZone: 'America/Vancouver' }))

  // Festival countdown
  const nextFestival = NEPALI_FESTIVALS
    .map(f => ({ ...f, days: Math.ceil((f.date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)) }))
    .filter(f => f.days > 0)
    .sort((a, b) => a.days - b.days)[0]

  // Daily word
  const todayWord = NEPALI_WORDS[now.getDate() % NEPALI_WORDS.length]
  const todayQuote = NEPALI_QUOTES[now.getDate() % NEPALI_QUOTES.length]

  if (loading) return <div style={{minHeight: '100vh', background: '#F8F9FA', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Inter, sans-serif', color: '#9CA3AF'}}>Loading...</div>

  return (
    <div style={{minHeight: '100vh', background: '#F8F9FA', fontFamily: 'Inter, -apple-system, sans-serif', paddingBottom: '80px'}}>

      {/* Maya animation */}
      {showMayaAnim && (
        <div style={{position: 'fixed', inset: 0, background: 'linear-gradient(135deg, #7B0021, #DC143C, #FF6B9D)', zIndex: 1000, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', animation: 'fadeIn 0.3s ease'}}>
          <div style={{fontSize: '80px', marginBottom: '20px', animation: 'heartPulse 0.6s ease infinite'}}>❤️</div>
          <h2 style={{fontSize: '32px', fontWeight: 800, color: 'white', marginBottom: '8px'}}>माया पठाइयो!</h2>
          <p style={{fontSize: '16px', color: 'rgba(255,255,255,0.7)'}}>Love sent to your family</p>
        </div>
      )}

      {/* Header */}
      <div style={{background: 'linear-gradient(135deg, #12022A 0%, #1C0028 60%, #0A1628 100%)', padding: '52px 20px 20px', position: 'relative', overflow: 'hidden'}}>
        <div style={{position: 'absolute', top: '-60px', right: '-40px', width: '220px', height: '220px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(220,20,60,0.2), transparent 70%)', pointerEvents: 'none'}}/>

        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', position: 'relative', zIndex: 1}}>
          <div>
            <h1 style={{fontSize: '24px', fontWeight: 800, color: 'white', letterSpacing: '-0.5px'}}>Family Room</h1>
            <p style={{fontSize: '12px', color: 'rgba(255,255,255,0.4)', marginTop: '2px'}}>{family ? family.name : 'Your family · All in one place'}</p>
          </div>
          {family && (
            <button onClick={copyCode} style={{padding: '7px 14px', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '20px', fontSize: '11px', fontWeight: 700, color: 'rgba(255,255,255,0.6)', cursor: 'pointer', fontFamily: 'Inter, sans-serif'}}>
              🔑 {family.code}
            </button>
          )}
        </div>

        {/* Time Bridge */}
        {family && (
          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', position: 'relative', zIndex: 1}}>
            {[
              { flag: '🇨🇦', city: 'Vancouver', time: vancouver },
              { flag: '🇳🇵', city: 'Kathmandu', time: kathmandu },
            ].map((t, i) => (
              <div key={i} style={{background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '14px', padding: '10px 14px'}}>
                <p style={{fontSize: '10px', color: 'rgba(255,255,255,0.35)', fontWeight: 600, marginBottom: '3px'}}>{t.flag} {t.city}</p>
                <p style={{fontSize: '18px', fontWeight: 800, color: 'white', letterSpacing: '-0.5px'}}>
                  {t.time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* No family */}
      {!family && (
        <div style={{padding: '20px 16px', display: 'flex', flexDirection: 'column', gap: '12px'}}>
          {error && <div style={{background: '#FEF2F2', border: '1px solid rgba(220,20,60,0.2)', borderRadius: '12px', padding: '12px 16px', fontSize: '13px', color: '#DC143C', fontWeight: 600}}>{error}</div>}
          <div style={{background: 'white', borderRadius: '24px', border: '1px solid #E9EAEC', padding: '32px 20px', textAlign: 'center', boxShadow: '0 4px 30px rgba(0,0,0,0.05)'}}>
            <div style={{fontSize: '56px', marginBottom: '16px'}}>👨‍👩‍��‍👦</div>
            <h2 style={{fontSize: '20px', fontWeight: 800, color: '#111318', marginBottom: '8px'}}>Create Your Family Room</h2>
            <p style={{fontSize: '14px', color: '#6B7280', marginBottom: '24px', lineHeight: 1.6}}>One place for your whole family. Stay close no matter how far.</p>
            <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
              <button onClick={() => { setShowCreate(true); setShowJoin(false) }}
                style={{width: '100%', padding: '14px', background: 'linear-gradient(135deg, #DC143C, #A50E2D)', color: 'white', border: 'none', borderRadius: '14px', fontSize: '15px', fontWeight: 800, cursor: 'pointer', fontFamily: 'Inter, sans-serif'}}>
                Create Family Room
              </button>
              <button onClick={() => { setShowJoin(true); setShowCreate(false) }}
                style={{width: '100%', padding: '14px', background: 'white', color: '#374151', border: '1px solid #E9EAEC', borderRadius: '14px', fontSize: '15px', fontWeight: 700, cursor: 'pointer', fontFamily: 'Inter, sans-serif'}}>
                Join with a Code
              </button>
            </div>
          </div>

          {showCreate && (
            <div style={{background: 'white', borderRadius: '20px', border: '1px solid #E9EAEC', padding: '20px', boxShadow: '0 4px 30px rgba(0,0,0,0.05)'}}>
              <p style={{fontSize: '15px', fontWeight: 800, color: '#111318', marginBottom: '12px'}}>Name your Family Room</p>
              <input value={familyName} onChange={(e) => setFamilyName(e.target.value)}
                placeholder={`${session?.user?.name?.split(' ')[0]}'s Family`}
                style={{width: '100%', border: '1px solid #E9EAEC', borderRadius: '12px', padding: '12px 14px', fontSize: '15px', color: '#111318', outline: 'none', fontFamily: 'Inter, sans-serif', boxSizing: 'border-box', marginBottom: '12px'}}/>
              <button onClick={handleCreate} disabled={submitting}
                style={{width: '100%', padding: '13px', background: 'linear-gradient(135deg, #DC143C, #A50E2D)', color: 'white', border: 'none', borderRadius: '12px', fontSize: '14px', fontWeight: 800, cursor: 'pointer', fontFamily: 'Inter, sans-serif'}}>
                {submitting ? 'Creating...' : 'Create Room'}
              </button>
            </div>
          )}

          {showJoin && (
            <div style={{background: 'white', borderRadius: '20px', border: '1px solid #E9EAEC', padding: '20px', boxShadow: '0 4px 30px rgba(0,0,0,0.05)'}}>
              <p style={{fontSize: '15px', fontWeight: 800, color: '#111318', marginBottom: '12px'}}>Enter Family Code</p>
              <input value={joinCode} onChange={(e) => setJoinCode(e.target.value.toUpperCase())} placeholder="ABC123" maxLength={6}
                style={{width: '100%', border: '1px solid #E9EAEC', borderRadius: '12px', padding: '14px', fontSize: '24px', color: '#111318', outline: 'none', fontFamily: 'monospace', boxSizing: 'border-box', marginBottom: '12px', letterSpacing: '6px', textAlign: 'center', fontWeight: 800}}/>
              <button onClick={handleJoin} disabled={submitting || joinCode.length < 6}
                style={{width: '100%', padding: '13px', background: joinCode.length >= 6 ? 'linear-gradient(135deg, #DC143C, #A50E2D)' : 'rgba(220,20,60,0.3)', color: 'white', border: 'none', borderRadius: '12px', fontSize: '14px', fontWeight: 800, cursor: joinCode.length >= 6 ? 'pointer' : 'not-allowed', fontFamily: 'Inter, sans-serif'}}>
                {submitting ? 'Joining...' : 'Join Family Room'}
              </button>
            </div>
          )}
        </div>
      )}

      {/* Family content */}
      {family && (
        <div style={{padding: '16px', display: 'flex', flexDirection: 'column', gap: '14px'}}>

          {/* Tabs */}
          <div style={{display: 'flex', background: 'white', borderRadius: '16px', border: '1px solid #E9EAEC', padding: '4px', boxShadow: '0 4px 30px rgba(0,0,0,0.05)'}}>
            {[
              { id: 'home', label: '🏠 Home' },
              { id: 'wall', label: '🎙️ Voices' },
              { id: 'members', label: '👨‍👩‍👧 Family' },
            ].map((tab) => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id as any)}
                style={{flex: 1, padding: '9px 4px', borderRadius: '12px', border: 'none', background: activeTab === tab.id ? 'linear-gradient(135deg, #DC143C, #A50E2D)' : 'transparent', color: activeTab === tab.id ? 'white' : '#6B7280', fontSize: '12px', fontWeight: 700, cursor: 'pointer', fontFamily: 'Inter, sans-serif'}}>
                {tab.label}
              </button>
            ))}
          </div>

          {/* HOME TAB */}
          {activeTab === 'home' && (
            <>
              {/* Morning Lamp */}
              <div style={{background: lampLit ? 'linear-gradient(135deg, #FFF8E7, #FEF3C7)' : 'white', borderRadius: '20px', border: `1px solid ${lampLit ? '#FDE68A' : '#E9EAEC'}`, padding: '20px', boxShadow: '0 4px 30px rgba(0,0,0,0.05)', textAlign: 'center'}}>
                <p style={{fontSize: '11px', fontWeight: 700, color: lampLit ? '#D97706' : '#9CA3AF', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px'}}>Morning Lamp · बिहानको दियो</p>
                <button onClick={() => setLampLit(!lampLit)} style={{fontSize: '52px', background: 'none', border: 'none', cursor: 'pointer', display: 'block', margin: '0 auto 12px', filter: lampLit ? 'none' : 'grayscale(1)', animation: lampLit ? 'glow 2s ease infinite' : 'none'}}>🪔</button>
                <p style={{fontSize: '14px', fontWeight: 700, color: lampLit ? '#D97706' : '#374151', marginBottom: '4px'}}>
                  {lampLit ? 'Your lamp is lit · सब ठीक छ' : 'Tap to light your lamp'}
                </p>
                <p style={{fontSize: '12px', color: '#9CA3AF'}}>
                  {lampLit ? 'Your family knows you are okay today' : 'Let your family know you are okay today'}
                </p>

                {/* Family lamps */}
                {family.members.length > 1 && (
                  <div style={{display: 'flex', justifyContent: 'center', gap: '16px', marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #F0F1F3'}}>
                    {family.members.slice(0, 5).map((m: any, i: number) => (
                      <div key={i} style={{textAlign: 'center'}}>
                        <div style={{fontSize: '24px', filter: isOnline(m.lastActive) ? 'none' : 'grayscale(0.7)'}}>🪔</div>
                        <p style={{fontSize: '9px', color: '#9CA3AF', marginTop: '4px', fontWeight: 600}}>{m.name.split(' ')[0]}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* How are you feeling */}
              <div style={{background: 'white', borderRadius: '20px', border: '1px solid #E9EAEC', padding: '20px', boxShadow: '0 4px 30px rgba(0,0,0,0.05)'}}>
                <p style={{fontSize: '11px', fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '14px'}}>Today I am Feeling · आज म...</p>
                <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px'}}>
                  {[
                    { emoji: '😊', label: 'Happy', nepali: 'खुशी', color: '#059669', bg: '#ECFDF5' },
                    { emoji: '😐', label: 'Okay', nepali: 'ठीक छ', color: '#D97706', bg: '#FFFBEB' },
                    { emoji: '💙', label: 'Need support', nepali: 'साथ चाहियो', color: '#2563EB', bg: '#EFF6FF' },
                  ].map((f) => (
                    <button key={f.label} onClick={() => setFeeling(f.label)}
                      style={{padding: '14px 8px', borderRadius: '16px', border: `2px solid ${feeling === f.label ? f.color : '#E9EAEC'}`, background: feeling === f.label ? f.bg : 'white', cursor: 'pointer', textAlign: 'center', fontFamily: 'Inter, sans-serif', transition: 'all 0.2s ease'}}>
                      <div style={{fontSize: '28px', marginBottom: '6px'}}>{f.emoji}</div>
                      <p style={{fontSize: '11px', fontWeight: 700, color: feeling === f.label ? f.color : '#374151'}}>{f.label}</p>
                      <p style={{fontSize: '10px', color: '#9CA3AF', marginTop: '2px'}}>{f.nepali}</p>
                    </button>
                  ))}
                </div>
                {feeling && (
                  <p style={{fontSize: '12px', color: '#6B7280', textAlign: 'center', marginTop: '12px', fontStyle: 'italic'}}>
                    {feeling === 'Need support' ? '💙 Your family has been notified. You are not alone.' : `Your family knows you are feeling ${feeling.toLowerCase()} today.`}
                  </p>
                )}
              </div>

              {/* Send Maya */}
              <button onClick={sendMaya}
                style={{width: '100%', padding: '18px', background: mayaSent ? 'linear-gradient(135deg, #7B0021, #DC143C)' : 'linear-gradient(135deg, #DC143C, #A50E2D)', border: 'none', borderRadius: '20px', cursor: 'pointer', fontFamily: 'Inter, sans-serif', boxShadow: '0 8px 32px rgba(220,20,60,0.35)', animation: 'mayaGlow 2.5s ease infinite', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px'}}>
                <span style={{fontSize: '28px'}}>❤️</span>
                <div style={{textAlign: 'left'}}>
                  <p style={{fontSize: '16px', fontWeight: 800, color: 'white'}}>{mayaSent ? 'माया पठाइयो! · Sent!' : 'Send Maya to Family'}</p>
                  <p style={{fontSize: '12px', color: 'rgba(255,255,255,0.6)'}}>{mayaSent ? 'Your family felt your love' : 'One tap · Instant love · माया पठाउनुस्'}</p>
                </div>
              </button>

              {/* Festival Countdown */}
              {nextFestival && (
                <div style={{background: 'linear-gradient(135deg, #1a0533, #2D0A4E)', borderRadius: '20px', padding: '20px', boxShadow: '0 4px 30px rgba(0,0,0,0.1)'}}>
                  <p style={{fontSize: '11px', fontWeight: 700, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px'}}>Coming Up · आउँदो चाड</p>
                  <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                    <div>
                      <div style={{display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px'}}>
                        <span style={{fontSize: '32px'}}>{nextFestival.emoji}</span>
                        <div>
                          <p style={{fontSize: '20px', fontWeight: 800, color: 'white', letterSpacing: '-0.4px'}}>{nextFestival.name}</p>
                          <p style={{fontSize: '14px', color: 'rgba(255,255,255,0.5)'}}>{nextFestival.nepali}</p>
                        </div>
                      </div>
                    </div>
                    <div style={{textAlign: 'right'}}>
                      <p style={{fontSize: '36px', fontWeight: 900, color: '#DC143C', letterSpacing: '-2px'}}>{nextFestival.days}</p>
                      <p style={{fontSize: '12px', color: 'rgba(255,255,255,0.4)', fontWeight: 600}}>days away</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Daily Nepali Word */}
              <div style={{background: 'white', borderRadius: '20px', border: '1px solid #E9EAEC', padding: '20px', boxShadow: '0 4px 30px rgba(0,0,0,0.05)'}}>
                <p style={{fontSize: '11px', fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '14px'}}>Word of the Day · आजको शब्द</p>
                <div style={{display: 'flex', alignItems: 'center', gap: '16px'}}>
                  <div style={{width: '60px', height: '60px', borderRadius: '16px', background: 'linear-gradient(135deg, #FEF2F2, #FEE2E2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>
                    <p style={{fontSize: '28px', fontWeight: 800, color: '#DC143C'}}>{todayWord.word[0]}</p>
                  </div>
                  <div>
                    <p style={{fontSize: '24px', fontWeight: 800, color: '#111318', letterSpacing: '-0.5px'}}>{todayWord.word}</p>
                    <p style={{fontSize: '13px', color: '#DC143C', fontWeight: 600, marginBottom: '2px'}}>{todayWord.roman}</p>
                    <p style={{fontSize: '12px', color: '#6B7280', lineHeight: 1.5}}>{todayWord.meaning}</p>
                  </div>
                </div>
              </div>

              {/* Nepali Quote */}
              <div style={{background: 'linear-gradient(135deg, #FFF9F9, white)', borderRadius: '20px', border: '1px solid #FEE2E2', padding: '20px', boxShadow: '0 4px 30px rgba(0,0,0,0.04)'}}>
                <p style={{fontSize: '11px', fontWeight: 700, color: '#DC143C', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px'}}>आजको सोच · Today's Thought</p>
                <p style={{fontSize: '16px', color: '#374151', lineHeight: 1.7, fontStyle: 'italic', fontWeight: 500}}>"{todayQuote}"</p>
              </div>

              {/* Good Night */}
              <button onClick={() => setGoodnight(!goodnight)}
                style={{width: '100%', padding: '16px', background: goodnight ? 'linear-gradient(135deg, #1a0533, #2D0A4E)' : 'white', border: `1px solid ${goodnight ? 'transparent' : '#E9EAEC'}`, borderRadius: '20px', cursor: 'pointer', fontFamily: 'Inter, sans-serif', boxShadow: '0 4px 30px rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px'}}>
                <span style={{fontSize: '28px'}}>{goodnight ? '🌙' : '🌙'}</span>
                <div style={{textAlign: 'left'}}>
                  <p style={{fontSize: '15px', fontWeight: 800, color: goodnight ? 'white' : '#111318'}}>{goodnight ? 'Goodnight sent · शुभरात्री!' : 'Say Goodnight to Family'}</p>
                  <p style={{fontSize: '12px', color: goodnight ? 'rgba(255,255,255,0.5)' : '#9CA3AF'}}>{goodnight ? 'Your family knows you are resting' : 'Let everyone know you are going to sleep'}</p>
                </div>
              </button>
            </>
          )}

          {/* VOICES TAB */}
          {activeTab === 'wall' && (
            <>
              {error && <div style={{background: '#FEF2F2', border: '1px solid rgba(220,20,60,0.2)', borderRadius: '12px', padding: '12px 16px', fontSize: '13px', color: '#DC143C', fontWeight: 600}}>{error}</div>}

              <div style={{background: 'white', borderRadius: '24px', border: '1px solid #E9EAEC', padding: '24px', textAlign: 'center', boxShadow: '0 4px 30px rgba(0,0,0,0.05)'}}>
                <p style={{fontSize: '11px', fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px'}}>
                  {recording ? `Recording ${formatTime(recordingTime)}` : uploading ? 'Sending to family...' : 'Leave a voice for your family'}
                </p>
                <div style={{display: 'flex', justifyContent: 'center', marginBottom: '12px'}}>
                  <button
                    onMouseDown={startRecording} onMouseUp={stopRecording}
                    onTouchStart={(e) => { e.preventDefault(); startRecording() }}
                    onTouchEnd={(e) => { e.preventDefault(); stopRecording() }}
                    disabled={uploading}
                    style={{width: '80px', height: '80px', borderRadius: '50%', background: recording ? 'linear-gradient(135deg, #DC143C, #A50E2D)' : uploading ? '#E9EAEC' : 'linear-gradient(135deg, #DC143C, #A50E2D)', border: 'none', cursor: uploading ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: recording ? '0 0 0 16px rgba(220,20,60,0.15), 0 0 0 32px rgba(220,20,60,0.07)' : '0 8px 32px rgba(220,20,60,0.4)', animation: recording ? 'recordPulse 1s ease infinite' : 'none'}}>
                    {uploading ? <div style={{width: '24px', height: '24px', border: '3px solid white', borderTop: '3px solid transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite'}}/> :
                     recording ? <div style={{width: '20px', height: '20px', background: 'white', borderRadius: '4px'}}/> :
                     <svg width="28" height="28" viewBox="0 0 24 24" fill="white"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round"/><line x1="12" y1="19" x2="12" y2="23" stroke="white" strokeWidth="2" strokeLinecap="round"/><line x1="8" y1="23" x2="16" y2="23" stroke="white" strokeWidth="2" strokeLinecap="round"/></svg>}
                  </button>
                </div>
                {recording && <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px'}}><div style={{width: '8px', height: '8px', borderRadius: '50%', background: '#DC143C', animation: 'blink 1s ease infinite'}}/><span style={{fontSize: '16px', fontWeight: 700, color: '#DC143C', fontFamily: 'monospace'}}>{formatTime(recordingTime)}</span></div>}
                {!recording && !uploading && <p style={{fontSize: '12px', color: '#9CA3AF', marginTop: '8px'}}>Hold to record · Release to send</p>}
              </div>

              {/* Voice messages */}
              <p style={{fontSize: '14px', fontWeight: 800, color: '#111318'}}>Family Voices {voiceMessages.length > 0 && `(${voiceMessages.length})`}</p>

              {voiceMessages.length === 0 && (
                <div style={{background: 'white', borderRadius: '20px', border: '1px solid #E9EAEC', padding: '32px 20px', textAlign: 'center', boxShadow: '0 4px 30px rgba(0,0,0,0.05)'}}>
                  <div style={{fontSize: '40px', marginBottom: '12px'}}>🎙️</div>
                  <p style={{fontSize: '15px', fontWeight: 700, color: '#111318', marginBottom: '6px'}}>No voices yet</p>
                  <p style={{fontSize: '13px', color: '#9CA3AF'}}>Be the first to leave a voice for your family.</p>
                </div>
              )}

              <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
                {voiceMessages.map((msg) => (
                  <div key={msg._id} style={{background: 'white', borderRadius: '20px', border: '1px solid #E9EAEC', padding: '16px', boxShadow: '0 4px 30px rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', gap: '12px'}}>
                    <div style={{width: '44px', height: '44px', borderRadius: '50%', background: 'linear-gradient(135deg, #DC143C, #A50E2D)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800, fontSize: '14px', flexShrink: 0}}>{initials(msg.senderName)}</div>
                    <div style={{flex: 1}}>
                      <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '8px'}}>
                        <p style={{fontSize: '14px', fontWeight: 700, color: '#111318'}}>{msg.senderName}</p>
                        <p style={{fontSize: '11px', color: '#9CA3AF'}}>{timeAgo(msg.createdAt)}</p>
                      </div>
                      <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                        <button onClick={() => playVoice(msg)}
                          style={{width: '34px', height: '34px', borderRadius: '50%', background: 'linear-gradient(135deg, #DC143C, #A50E2D)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0}}>
                          {playingId === msg._id ?
                            <div style={{display: 'flex', gap: '2px'}}>{[0,1,2].map(i => <div key={i} style={{width: '3px', height: '12px', background: 'white', borderRadius: '2px', animation: `wave 0.6s ease ${i * 0.1}s infinite`}}/>)}</div> :
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="white"><polygon points="5 3 19 12 5 21 5 3"/></svg>}
                        </button>
                        <div style={{flex: 1, display: 'flex', alignItems: 'center', gap: '2px', height: '24px'}}>
                          {Array.from({length: 24}).map((_, i) => (
                            <div key={i} style={{width: '3px', height: `${Math.max(4, Math.sin(i * 0.9) * 8 + 10)}px`, background: playingId === msg._id ? '#DC143C' : '#E9EAEC', borderRadius: '2px', transition: 'background 0.3s ease'}}/>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* MEMBERS TAB */}
          {activeTab === 'members' && (
            <>
              <div style={{background: 'white', borderRadius: '20px', border: '1px solid #E9EAEC', overflow: 'hidden', boxShadow: '0 4px 30px rgba(0,0,0,0.05)'}}>
                <div style={{padding: '16px 16px 10px', borderBottom: '1px solid #F0F1F3', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                  <p style={{fontSize: '15px', fontWeight: 800, color: '#111318'}}>Family ({family.members.length})</p>
                  <div style={{display: 'flex', alignItems: 'center', gap: '5px'}}>
                    <div style={{width: '6px', height: '6px', borderRadius: '50%', background: '#22C55E'}}/>
                    <span style={{fontSize: '11px', fontWeight: 600, color: '#22C55E'}}>{family.members.filter((m: any) => isOnline(m.lastActive)).length} online</span>
                  </div>
                </div>
                {family.members.map((member: any, i: number) => (
                  <div key={i} style={{display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 16px', borderBottom: i < family.members.length - 1 ? '1px solid #F5F6F8' : 'none'}}>
                    <div style={{position: 'relative', flexShrink: 0}}>
                      {member.avatar ?
                        <img src={member.avatar} alt={member.name} style={{width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover'}}/> :
                        <div style={{width: '48px', height: '48px', borderRadius: '50%', background: 'linear-gradient(135deg, #DC143C, #A50E2D)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800, fontSize: '16px'}}>{initials(member.name)}</div>}
                      <div style={{position: 'absolute', bottom: '1px', right: '1px', width: '12px', height: '12px', borderRadius: '50%', background: isOnline(member.lastActive) ? '#22C55E' : '#D1D5DB', border: '2px solid white'}}/>
                    </div>
                    <div style={{flex: 1}}>
                      <div style={{display: 'flex', alignItems: 'center', gap: '6px'}}>
                        <p style={{fontSize: '15px', fontWeight: 700, color: '#111318'}}>{member.name}</p>
                        {family.admin?.toString() === member.user?.toString() && <span style={{fontSize: '9px', fontWeight: 700, padding: '2px 6px', borderRadius: '20px', background: '#FEF2F2', color: '#DC143C'}}>Admin</span>}
                      </div>
                      <p style={{fontSize: '12px', color: isOnline(member.lastActive) ? '#22C55E' : '#9CA3AF', marginTop: '1px', fontWeight: 500}}>
                        {isOnline(member.lastActive) ? '● Active now' : `Last seen ${timeAgo(member.lastActive)}`}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Invite */}
              <div style={{background: 'white', borderRadius: '20px', border: '1px solid #E9EAEC', padding: '20px', boxShadow: '0 4px 30px rgba(0,0,0,0.05)'}}>
                <p style={{fontSize: '14px', fontWeight: 800, color: '#111318', marginBottom: '6px'}}>Invite Family Members</p>
                <p style={{fontSize: '12px', color: '#6B7280', marginBottom: '14px', lineHeight: 1.5}}>Share this code. They tap "Join with a Code" to enter your room.</p>
                <div style={{display: 'flex', alignItems: 'center', gap: '10px', background: '#F8F9FA', borderRadius: '14px', padding: '14px 16px'}}>
                  <div style={{flex: 1}}>
                    <p style={{fontSize: '10px', fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px'}}>Family Code</p>
                    <p style={{fontSize: '28px', fontWeight: 800, color: '#111318', letterSpacing: '6px', fontFamily: 'monospace'}}>{family.code}</p>
                  </div>
                  <button onClick={copyCode} style={{padding: '10px 16px', background: copied ? '#ECFDF5' : 'linear-gradient(135deg, #DC143C, #A50E2D)', color: copied ? '#059669' : 'white', border: copied ? '1px solid #059669' : 'none', borderRadius: '12px', fontSize: '13px', fontWeight: 700, cursor: 'pointer', fontFamily: 'Inter, sans-serif', flexShrink: 0}}>
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}

      <style>{`
        @keyframes glow { 0%, 100% { filter: drop-shadow(0 0 8px rgba(251,191,36,0.6)); } 50% { filter: drop-shadow(0 0 20px rgba(251,191,36,0.9)); } }
        @keyframes heartPulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.15); } }
        @keyframes mayaGlow { 0%, 100% { box-shadow: 0 8px 32px rgba(220,20,60,0.35); } 50% { box-shadow: 0 8px 40px rgba(220,20,60,0.6); } }
        @keyframes recordPulse { 0%, 100% { box-shadow: 0 0 0 16px rgba(220,20,60,0.15), 0 0 0 32px rgba(220,20,60,0.07); } 50% { box-shadow: 0 0 0 20px rgba(220,20,60,0.2), 0 0 0 40px rgba(220,20,60,0.1); } }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes wave { 0%, 100% { transform: scaleY(0.4); } 50% { transform: scaleY(1.2); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      `}</style>

      <BottomNav />
    </div>
  )
}
