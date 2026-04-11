'use client'
import { useState, useEffect, useRef } from 'react'
import { useSession } from 'next-auth/react'
import BottomNav from '../components/BottomNav'
import { DS } from '../design-system'
import {
  HeartIcon, LampIcon, MoonIcon, FestivalIcon, QuoteIcon, WordIcon,
  FeelingHappyIcon, FeelingOkayIcon, FeelingSadIcon, MicIcon,
  PlayIcon, PauseIcon, PlusIcon, KeyIcon, CheckIcon, FamilyIcon,
  HomeIcon, ClockIcon
} from '../components/Icons'

const FESTIVALS = [
  { name: 'Dashain', nepali: 'दशैं', date: new Date('2025-10-02') },
  { name: 'Tihar', nepali: 'तिहार', date: new Date('2025-10-20') },
  { name: 'Holi', nepali: 'होली', date: new Date('2026-03-14') },
  { name: 'Teej', nepali: 'तीज', date: new Date('2026-08-20') },
  { name: 'Maghe Sankranti', nepali: 'माघे संक्रान्ति', date: new Date('2026-01-14') },
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

const QUOTES = [
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
  const [activeTab, setActiveTab] = useState<'home' | 'voices' | 'members'>('home')
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

  useEffect(() => { if (family?.code) fetchVoiceMessages() }, [family])

  const fetchFamily = async () => {
    try {
      const res = await fetch(`/api/family?email=${session?.user?.email}`)
      const data = await res.json()
      setFamily(data.family)
    } catch (e) {}
    setLoading(false)
  }

  const fetchVoiceMessages = async () => {
    try {
      const res = await fetch(`/api/voice?familyCode=${family?.code}&type=family`)
      const data = await res.json()
      setVoiceMessages(data.messages || [])
    } catch (e) {}
  }

  const ping = async () => {
    if (!session?.user?.email) return
    try { await fetch('/api/family', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'ping', email: session.user.email }) }) } catch (e) {}
  }

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder
      audioChunksRef.current = []
      mediaRecorder.ondataavailable = (e) => { if (e.data.size > 0) audioChunksRef.current.push(e.data) }
      mediaRecorder.onstop = async () => {
        const blob = new Blob(audioChunksRef.current, { type: 'audio/webm' })
        stream.getTracks().forEach(t => t.stop())
        await uploadVoice(blob)
      }
      mediaRecorder.start()
      setRecording(true)
      setRecordingTime(0)
      timerRef.current = setInterval(() => setRecordingTime(p => p + 1), 1000)
    } catch (e) { setError('Microphone permission denied.') }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && recording) {
      mediaRecorderRef.current.stop()
      setRecording(false)
      clearInterval(timerRef.current)
    }
  }

  const uploadVoice = async (blob: Blob) => {
    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('audio', blob, 'voice.webm')
      formData.append('senderName', session?.user?.name || 'Family Member')
      formData.append('familyCode', family?.code || '')
      formData.append('type', 'family')
      const res = await fetch('/api/voice', { method: 'POST', body: formData })
      if (res.ok) await fetchVoiceMessages()
    } catch (e) { setError('Failed to send') }
    setUploading(false)
  }

  const playVoice = (msg: any) => {
    if (playingId === msg._id) { audioRef.current?.pause(); setPlayingId(null); return }
    if (audioRef.current) audioRef.current.pause()
    const audio = new Audio(msg.audioUrl)
    audioRef.current = audio
    setPlayingId(msg._id)
    audio.play()
    audio.onended = () => setPlayingId(null)
  }

  const sendMaya = () => { setMayaSent(true); setShowMayaAnim(true); setTimeout(() => setShowMayaAnim(false), 2500) }

  const handleCreate = async () => {
    setSubmitting(true); setError('')
    try {
      const res = await fetch('/api/family', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'create', email: session?.user?.email, familyName }) })
      const data = await res.json()
      if (res.ok) { setFamily(data.family); setShowCreate(false) } else setError(data.error)
    } catch (e) { setError('Something went wrong') }
    setSubmitting(false)
  }

  const handleJoin = async () => {
    if (!joinCode.trim()) return
    setSubmitting(true); setError('')
    try {
      const res = await fetch('/api/family', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'join', email: session?.user?.email, code: joinCode }) })
      const data = await res.json()
      if (res.ok) { setFamily(data.family); setShowJoin(false) } else setError(data.error)
    } catch (e) { setError('Something went wrong') }
    setSubmitting(false)
  }

  const copyCode = () => { navigator.clipboard.writeText(family?.code || ''); setCopied(true); setTimeout(() => setCopied(false), 2000) }
  const isOnline = (date: string) => Math.floor((Date.now() - new Date(date).getTime()) / 1000) < 120
  const timeAgo = (date: string) => { const s = Math.floor((Date.now() - new Date(date).getTime()) / 1000); if (s < 60) return 'just now'; if (s < 3600) return `${Math.floor(s / 60)}m ago`; if (s < 86400) return `${Math.floor(s / 3600)}h ago`; return `${Math.floor(s / 86400)}d ago` }
  const initials = (name: string) => name?.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2) || 'U'
  const formatTime = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`

  const now = new Date()
  const kathmandu = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Kathmandu' }))
  const vancouver = new Date(now.toLocaleString('en-US', { timeZone: 'America/Vancouver' }))
  const nextFestival = FESTIVALS.map(f => ({ ...f, days: Math.ceil((f.date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)) })).filter(f => f.days > 0).sort((a, b) => a.days - b.days)[0]
  const todayWord = NEPALI_WORDS[now.getDate() % NEPALI_WORDS.length]
  const todayQuote = QUOTES[now.getDate() % QUOTES.length]

  if (loading) return (
    <div style={{minHeight: '100vh', background: '#06040C', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Inter, sans-serif'}}>
      <div style={{textAlign: 'center'}}>
        <div style={{width: '48px', height: '48px', borderRadius: '50%', background: DS.gradient.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', boxShadow: DS.shadow.primary}}>
          <FamilyIcon size={24} color="white" strokeWidth={1.8}/>
        </div>
        <p style={{fontSize: '13px', color: 'rgba(255,255,255,0.3)', fontWeight: 500}}>Opening Family Room…</p>
      </div>
    </div>
  )

  return (
    <div style={{minHeight: '100vh', background: '#06040C', fontFamily: 'Inter, -apple-system, sans-serif', paddingBottom: '100px'}}>
      <div style={{position: 'fixed', inset: 0, background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(139,0,30,0.25) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0}}/>

      {/* Maya animation */}
      {showMayaAnim && (
        <div style={{position: 'fixed', inset: 0, background: 'linear-gradient(135deg, #7B0021, #DC143C, #FF6B9D)', zIndex: 1000, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
          <div style={{animation: 'heartPulse 0.6s ease infinite'}}>
            <HeartIcon size={88} color="white" filled strokeWidth={0}/>
          </div>
          <h2 style={{fontSize: '36px', fontWeight: 800, color: 'white', marginTop: '24px', marginBottom: '10px', letterSpacing: '-1px'}}>माया पठाइयो!</h2>
          <p style={{fontSize: '18px', color: 'rgba(255,255,255,0.6)'}}>Love sent to your family</p>
        </div>
      )}

      {/* Header */}
      <div style={{background: 'rgba(6,4,12,0.95)', backdropFilter: 'blur(20px)', padding: '52px 20px 16px', borderBottom: '1px solid rgba(255,255,255,0.06)', position: 'sticky', top: 0, zIndex: 50}}>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: family ? '16px' : '0'}}>
          <div>
            <h1 style={{fontSize: '22px', fontWeight: 800, color: 'white', letterSpacing: '-0.5px'}}>Family Room</h1>
            <p style={{fontSize: '12px', color: 'rgba(255,255,255,0.3)', marginTop: '3px', fontWeight: 500}}>{family ? family.name : 'Your family · All in one place'}</p>
          </div>
          {family && (
            <button onClick={copyCode} style={{display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 14px', background: copied ? 'rgba(34,197,94,0.15)' : 'rgba(255,255,255,0.06)', border: `1px solid ${copied ? 'rgba(34,197,94,0.3)' : 'rgba(255,255,255,0.1)'}`, borderRadius: '20px', cursor: 'pointer', fontFamily: 'Inter, sans-serif', transition: 'all 0.2s ease'}}>
              {copied ? <CheckIcon size={12} color="#22C55E" strokeWidth={2.5}/> : <KeyIcon size={12} color="rgba(255,255,255,0.5)" strokeWidth={2}/>}
              <span style={{fontSize: '12px', fontWeight: 700, color: copied ? '#22C55E' : 'rgba(255,255,255,0.5)'}}>{copied ? 'Copied' : family.code}</span>
            </button>
          )}
        </div>

        {/* Time Bridge */}
        {family && (
          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px'}}>
            {[
              { label: 'Vancouver', flag: 'CA', time: vancouver },
              { label: 'Kathmandu', flag: 'NP', time: kathmandu },
            ].map((t, i) => (
              <div key={i} style={{background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '14px', padding: '10px 14px', display: 'flex', alignItems: 'center', gap: '10px'}}>
                <ClockIcon size={16} color="rgba(255,255,255,0.3)" strokeWidth={1.8}/>
                <div>
                  <p style={{fontSize: '10px', color: 'rgba(255,255,255,0.3)', fontWeight: 600, marginBottom: '2px'}}>{t.label}</p>
                  <p style={{fontSize: '16px', fontWeight: 800, color: 'white', letterSpacing: '-0.5px'}}>
                    {t.time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* No family */}
      {!family && (
        <div style={{padding: '24px 16px', display: 'flex', flexDirection: 'column', gap: '14px', position: 'relative', zIndex: 1}}>
          {error && <div style={{background: 'rgba(220,20,60,0.1)', border: '1px solid rgba(220,20,60,0.25)', borderRadius: '14px', padding: '13px 16px', fontSize: '13px', color: '#DC143C', fontWeight: 600}}>{error}</div>}
          <div style={{textAlign: 'center', padding: '48px 20px 32px'}}>
            <div style={{width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(220,20,60,0.1)', border: '1px solid rgba(220,20,60,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px'}}>
              <FamilyIcon size={40} color={DS.colors.primary} strokeWidth={1.5}/>
            </div>
            <h2 style={{fontSize: '24px', fontWeight: 800, color: 'white', marginBottom: '10px', letterSpacing: '-0.6px'}}>Create Your Family Room</h2>
            <p style={{fontSize: '15px', color: 'rgba(255,255,255,0.4)', lineHeight: 1.7, marginBottom: '32px', maxWidth: '280px', margin: '0 auto 32px'}}>One place for your whole family. Stay close no matter how far.</p>
            <div style={{display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '320px', margin: '0 auto'}}>
              <button onClick={() => { setShowCreate(true); setShowJoin(false) }}
                style={{width: '100%', padding: '16px', background: DS.gradient.primary, color: 'white', border: 'none', borderRadius: '16px', fontSize: '15px', fontWeight: 800, cursor: 'pointer', fontFamily: 'Inter, sans-serif', boxShadow: DS.shadow.primary}}>
                Create Family Room
              </button>
              <button onClick={() => { setShowJoin(true); setShowCreate(false) }}
                style={{width: '100%', padding: '16px', background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.7)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', fontSize: '15px', fontWeight: 700, cursor: 'pointer', fontFamily: 'Inter, sans-serif'}}>
                Join with a Code
              </button>
            </div>
          </div>

          {showCreate && (
            <div style={{background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '20px', padding: '20px', maxWidth: '400px', margin: '0 auto', width: '100%'}}>
              <p style={{fontSize: '15px', fontWeight: 800, color: 'white', marginBottom: '12px'}}>Name your Family Room</p>
              <input value={familyName} onChange={(e) => setFamilyName(e.target.value)} placeholder={`${session?.user?.name?.split(' ')[0]}'s Family`}
                style={{width: '100%', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '14px 16px', fontSize: '15px', color: 'white', outline: 'none', fontFamily: 'Inter, sans-serif', boxSizing: 'border-box', marginBottom: '12px'}}/>
              <button onClick={handleCreate} disabled={submitting}
                style={{width: '100%', padding: '14px', background: DS.gradient.primary, color: 'white', border: 'none', borderRadius: '12px', fontSize: '14px', fontWeight: 800, cursor: 'pointer', fontFamily: 'Inter, sans-serif', boxShadow: DS.shadow.primary}}>
                {submitting ? 'Creating…' : 'Create Room'}
              </button>
            </div>
          )}

          {showJoin && (
            <div style={{background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '20px', padding: '20px', maxWidth: '400px', margin: '0 auto', width: '100%'}}>
              <p style={{fontSize: '15px', fontWeight: 800, color: 'white', marginBottom: '12px'}}>Enter Family Code</p>
              <input value={joinCode} onChange={(e) => setJoinCode(e.target.value.toUpperCase())} placeholder="ABC123" maxLength={6}
                style={{width: '100%', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '14px', fontSize: '28px', color: 'white', outline: 'none', fontFamily: 'monospace', boxSizing: 'border-box', marginBottom: '12px', letterSpacing: '8px', textAlign: 'center', fontWeight: 800}}/>
              <button onClick={handleJoin} disabled={submitting || joinCode.length < 6}
                style={{width: '100%', padding: '14px', background: joinCode.length >= 6 ? DS.gradient.primary : 'rgba(220,20,60,0.3)', color: 'white', border: 'none', borderRadius: '12px', fontSize: '14px', fontWeight: 800, cursor: joinCode.length >= 6 ? 'pointer' : 'not-allowed', fontFamily: 'Inter, sans-serif'}}>
                {submitting ? 'Joining…' : 'Join Family Room'}
              </button>
            </div>
          )}
        </div>
      )}

      {/* Family content */}
      {family && (
        <div style={{position: 'relative', zIndex: 1}}>
          {/* Tabs */}
          <div style={{padding: '16px 16px 0'}}>
            <div style={{display: 'flex', background: 'rgba(255,255,255,0.05)', borderRadius: '16px', padding: '4px', border: '1px solid rgba(255,255,255,0.08)'}}>
              {[
                { id: 'home', label: 'Home', Icon: HomeIcon },
                { id: 'voices', label: 'Voices', Icon: MicIcon },
                { id: 'members', label: 'Family', Icon: FamilyIcon },
              ].map((tab) => (
                <button key={tab.id} onClick={() => setActiveTab(tab.id as any)}
                  style={{flex: 1, padding: '10px 4px', borderRadius: '12px', border: 'none', background: activeTab === tab.id ? DS.gradient.primary : 'transparent', cursor: 'pointer', fontFamily: 'Inter, sans-serif', boxShadow: activeTab === tab.id ? DS.shadow.primary : 'none', transition: 'all 0.2s ease', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px'}}>
                  <tab.Icon size={14} color={activeTab === tab.id ? 'white' : 'rgba(255,255,255,0.4)'} strokeWidth={2}/>
                  <span style={{fontSize: '12px', fontWeight: 700, color: activeTab === tab.id ? 'white' : 'rgba(255,255,255,0.4)'}}>
                    {tab.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div style={{padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: '12px'}}>

            {/* HOME TAB */}
            {activeTab === 'home' && (
              <>
                {/* Morning Lamp */}
                <div style={{background: lampLit ? 'linear-gradient(135deg, rgba(251,191,36,0.12), rgba(245,158,11,0.06))' : 'rgba(255,255,255,0.04)', border: `1px solid ${lampLit ? 'rgba(251,191,36,0.25)' : 'rgba(255,255,255,0.08)'}`, borderRadius: '20px', padding: '22px', textAlign: 'center', transition: 'all 0.4s ease'}}>
                  <p style={{fontSize: '10px', fontWeight: 700, color: lampLit ? 'rgba(251,191,36,0.7)' : 'rgba(255,255,255,0.25)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px'}}>Morning Lamp · बिहानको दियो</p>
                  <button onClick={() => setLampLit(!lampLit)}
                    style={{width: '72px', height: '72px', borderRadius: '50%', background: lampLit ? 'rgba(251,191,36,0.2)' : 'rgba(255,255,255,0.06)', border: `2px solid ${lampLit ? 'rgba(251,191,36,0.4)' : 'rgba(255,255,255,0.1)'}`, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', animation: lampLit ? 'lampGlow 2s ease infinite' : 'none', transition: 'all 0.3s ease'}}>
                    <LampIcon size={36} color={lampLit ? '#F59E0B' : 'rgba(255,255,255,0.3)'} strokeWidth={lampLit ? 2 : 1.5}/>
                  </button>
                  <p style={{fontSize: '15px', fontWeight: 700, color: lampLit ? 'rgba(251,191,36,0.9)' : 'rgba(255,255,255,0.5)', marginBottom: '4px'}}>{lampLit ? 'Your lamp is lit · सब ठीक छ' : 'Tap to light your lamp'}</p>
                  <p style={{fontSize: '12px', color: 'rgba(255,255,255,0.25)'}}>{lampLit ? 'Your family knows you are okay today' : 'Let your family know you are okay'}</p>
                  {family.members.length > 1 && (
                    <div style={{display: 'flex', justifyContent: 'center', gap: '16px', marginTop: '18px', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.06)'}}>
                      {family.members.slice(0, 5).map((m: any, i: number) => (
                        <div key={i} style={{textAlign: 'center'}}>
                          <div style={{width: '32px', height: '32px', borderRadius: '50%', background: isOnline(m.lastActive) ? 'rgba(251,191,36,0.15)' : 'rgba(255,255,255,0.05)', border: `1px solid ${isOnline(m.lastActive) ? 'rgba(251,191,36,0.3)' : 'rgba(255,255,255,0.08)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 4px'}}>
                            <LampIcon size={16} color={isOnline(m.lastActive) ? '#F59E0B' : 'rgba(255,255,255,0.2)'} strokeWidth={2}/>
                          </div>
                          <p style={{fontSize: '9px', color: 'rgba(255,255,255,0.3)', fontWeight: 600}}>{m.name.split(' ')[0]}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Feeling */}
                <div style={{background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '20px', padding: '20px'}}>
                  <p style={{fontSize: '10px', fontWeight: 700, color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '14px'}}>Today I am Feeling · आज म...</p>
                  <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px'}}>
                    {[
                      { Icon: FeelingHappyIcon, label: 'Happy', nepali: 'खुशी', color: '#22C55E', border: 'rgba(34,197,94,0.4)', bg: 'rgba(34,197,94,0.1)' },
                      { Icon: FeelingOkayIcon, label: 'Okay', nepali: 'ठीक छ', color: '#F59E0B', border: 'rgba(245,158,11,0.4)', bg: 'rgba(245,158,11,0.1)' },
                      { Icon: FeelingSadIcon, label: 'Need support', nepali: 'साथ चाहियो', color: '#60A5FA', border: 'rgba(96,165,250,0.4)', bg: 'rgba(96,165,250,0.1)' },
                    ].map((f) => (
                      <button key={f.label} onClick={() => setFeeling(f.label)}
                        style={{padding: '14px 6px', borderRadius: '16px', border: `1.5px solid ${feeling === f.label ? f.border : 'rgba(255,255,255,0.08)'}`, background: feeling === f.label ? f.bg : 'rgba(255,255,255,0.03)', cursor: 'pointer', textAlign: 'center', fontFamily: 'Inter, sans-serif', transition: 'all 0.2s ease'}}>
                        <div style={{display: 'flex', justifyContent: 'center', marginBottom: '8px'}}>
                          <f.Icon size={28} color={feeling === f.label ? f.color : 'rgba(255,255,255,0.3)'} strokeWidth={1.8}/>
                        </div>
                        <p style={{fontSize: '11px', fontWeight: 700, color: feeling === f.label ? f.color : 'rgba(255,255,255,0.4)'}}>{f.label}</p>
                        <p style={{fontSize: '10px', color: 'rgba(255,255,255,0.2)', marginTop: '2px'}}>{f.nepali}</p>
                      </button>
                    ))}
                  </div>
                  {feeling && <p style={{fontSize: '12px', color: 'rgba(255,255,255,0.35)', textAlign: 'center', marginTop: '14px', fontStyle: 'italic'}}>{feeling === 'Need support' ? 'Your family has been notified.' : `Your family knows you are feeling ${feeling.toLowerCase()} today.`}</p>}
                </div>

                {/* Send Maya */}
                <button onClick={sendMaya}
                  style={{width: '100%', padding: '20px', background: mayaSent ? 'linear-gradient(135deg, #7B0021, #DC143C)' : DS.gradient.primary, border: 'none', borderRadius: '20px', cursor: 'pointer', fontFamily: 'Inter, sans-serif', boxShadow: DS.shadow.primary, animation: 'mayaGlow 2.5s ease infinite', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px'}}>
                  <div style={{animation: mayaSent ? 'heartPulse 0.8s ease infinite' : 'none'}}>
                    <HeartIcon size={32} color="white" filled strokeWidth={0}/>
                  </div>
                  <div style={{textAlign: 'left'}}>
                    <p style={{fontSize: '17px', fontWeight: 800, color: 'white', letterSpacing: '-0.3px'}}>{mayaSent ? 'माया पठाइयो!' : 'Send Maya to Family'}</p>
                    <p style={{fontSize: '12px', color: 'rgba(255,255,255,0.55)', marginTop: '2px'}}>{mayaSent ? 'Your family felt your love' : 'One tap · Instant love · माया पठाउनुस्'}</p>
                  </div>
                </button>

                {/* Festival Countdown */}
                {nextFestival && (
                  <div style={{background: 'linear-gradient(135deg, rgba(220,20,60,0.1), rgba(139,0,30,0.06))', border: '1px solid rgba(220,20,60,0.18)', borderRadius: '20px', padding: '20px'}}>
                    <p style={{fontSize: '10px', fontWeight: 700, color: 'rgba(220,20,60,0.6)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '14px'}}>Coming Up · आउँदो चाड</p>
                    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                      <div style={{display: 'flex', alignItems: 'center', gap: '14px'}}>
                        <div style={{width: '56px', height: '56px', borderRadius: '16px', background: 'rgba(220,20,60,0.15)', border: '1px solid rgba(220,20,60,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                          <FestivalIcon size={28} color={DS.colors.primary} strokeWidth={1.8}/>
                        </div>
                        <div>
                          <p style={{fontSize: '20px', fontWeight: 800, color: 'white', letterSpacing: '-0.4px'}}>{nextFestival.name}</p>
                          <p style={{fontSize: '14px', color: 'rgba(255,255,255,0.4)', marginTop: '2px'}}>{nextFestival.nepali}</p>
                        </div>
                      </div>
                      <div style={{textAlign: 'right'}}>
                        <p style={{fontSize: '48px', fontWeight: 900, color: DS.colors.primary, letterSpacing: '-3px', lineHeight: 1}}>{nextFestival.days}</p>
                        <p style={{fontSize: '11px', color: 'rgba(255,255,255,0.3)', fontWeight: 600, marginTop: '4px'}}>days away</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Daily Word */}
                <div style={{background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '20px', padding: '20px'}}>
                  <div style={{display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px'}}>
                    <WordIcon size={14} color="rgba(255,255,255,0.25)" strokeWidth={2}/>
                    <p style={{fontSize: '10px', fontWeight: 700, color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase', letterSpacing: '1px'}}>Word of the Day · आजको शब्द</p>
                  </div>
                  <div style={{display: 'flex', alignItems: 'center', gap: '16px'}}>
                    <div style={{width: '64px', height: '64px', borderRadius: '18px', background: DS.colors.primaryLight, border: `1px solid ${DS.colors.primaryBorder}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>
                      <p style={{fontSize: '30px', fontWeight: 800, color: DS.colors.primary}}>{todayWord.word[0]}</p>
                    </div>
                    <div>
                      <p style={{fontSize: '28px', fontWeight: 800, color: 'white', letterSpacing: '-0.5px'}}>{todayWord.word}</p>
                      <p style={{fontSize: '13px', color: DS.colors.primary, fontWeight: 600, marginBottom: '3px'}}>{todayWord.roman}</p>
                      <p style={{fontSize: '12px', color: 'rgba(255,255,255,0.35)', lineHeight: 1.5}}>{todayWord.meaning}</p>
                    </div>
                  </div>
                </div>

                {/* Quote */}
                <div style={{background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '20px', padding: '20px'}}>
                  <div style={{display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px'}}>
                    <QuoteIcon size={14} color="rgba(220,20,60,0.5)" strokeWidth={2}/>
                    <p style={{fontSize: '10px', fontWeight: 700, color: 'rgba(220,20,60,0.6)', textTransform: 'uppercase', letterSpacing: '1px'}}>आजको सोच</p>
                  </div>
                  <p style={{fontSize: '16px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, fontStyle: 'italic', fontWeight: 400}}>{todayQuote}</p>
                </div>

                {/* Good Night */}
                <button onClick={() => setGoodnight(!goodnight)}
                  style={{width: '100%', padding: '18px', background: goodnight ? 'linear-gradient(135deg, #1a0533, #2D0A4E)' : 'rgba(255,255,255,0.04)', border: `1px solid ${goodnight ? 'rgba(93,45,145,0.4)' : 'rgba(255,255,255,0.08)'}`, borderRadius: '20px', cursor: 'pointer', fontFamily: 'Inter, sans-serif', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px', transition: 'all 0.3s ease'}}>
                  <div style={{width: '44px', height: '44px', borderRadius: '50%', background: goodnight ? 'rgba(93,45,145,0.3)' : 'rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <MoonIcon size={22} color={goodnight ? '#A78BFA' : 'rgba(255,255,255,0.3)'} strokeWidth={1.8}/>
                  </div>
                  <div style={{textAlign: 'left'}}>
                    <p style={{fontSize: '15px', fontWeight: 800, color: goodnight ? 'white' : 'rgba(255,255,255,0.6)'}}>{goodnight ? 'Goodnight sent · शुभरात्री!' : 'Say Goodnight to Family'}</p>
                    <p style={{fontSize: '12px', color: 'rgba(255,255,255,0.3)', marginTop: '2px'}}>{goodnight ? 'Your family knows you are resting' : 'Let everyone know you are sleeping'}</p>
                  </div>
                </button>
              </>
            )}

            {/* VOICES TAB */}
            {activeTab === 'voices' && (
              <>
                {error && <div style={{background: 'rgba(220,20,60,0.1)', border: '1px solid rgba(220,20,60,0.25)', borderRadius: '14px', padding: '12px 16px', fontSize: '13px', color: '#DC143C', fontWeight: 600}}>{error}</div>}

                <div style={{background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '24px', padding: '28px 20px', textAlign: 'center'}}>
                  <p style={{fontSize: '10px', fontWeight: 700, color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '20px'}}>
                    {recording ? `Recording ${formatTime(recordingTime)}` : uploading ? 'Sending to family…' : 'Leave a voice for your family'}
                  </p>
                  <div style={{display: 'flex', justifyContent: 'center', marginBottom: '14px'}}>
                    <button
                      onMouseDown={startRecording} onMouseUp={stopRecording}
                      onTouchStart={(e) => { e.preventDefault(); startRecording() }}
                      onTouchEnd={(e) => { e.preventDefault(); stopRecording() }}
                      disabled={uploading}
                      style={{width: '84px', height: '84px', borderRadius: '50%', background: recording ? DS.gradient.primary : uploading ? 'rgba(255,255,255,0.1)' : DS.gradient.primary, border: 'none', cursor: uploading ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: recording ? '0 0 0 16px rgba(220,20,60,0.15), 0 0 0 32px rgba(220,20,60,0.07)' : DS.shadow.primary, animation: recording ? 'recordPulse 1s ease infinite' : 'none', transition: 'all 0.2s ease'}}>
                      {uploading ?
                        <div style={{width: '24px', height: '24px', border: '3px solid rgba(255,255,255,0.3)', borderTop: '3px solid white', borderRadius: '50%', animation: 'spin 0.8s linear infinite'}}/> :
                        recording ?
                        <div style={{width: '22px', height: '22px', background: 'white', borderRadius: '5px'}}/> :
                        <MicIcon size={32} color="white" strokeWidth={2}/>}
                    </button>
                  </div>
                  {recording && (
                    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'}}>
                      <div style={{width: '8px', height: '8px', borderRadius: '50%', background: DS.colors.primary, animation: 'blink 1s ease infinite'}}/>
                      <span style={{fontSize: '18px', fontWeight: 700, color: DS.colors.primary, fontFamily: 'monospace'}}>{formatTime(recordingTime)}</span>
                    </div>
                  )}
                  {!recording && !uploading && <p style={{fontSize: '12px', color: 'rgba(255,255,255,0.2)', marginTop: '10px'}}>Hold to record · Release to send</p>}
                </div>

                <p style={{fontSize: '13px', fontWeight: 700, color: 'rgba(255,255,255,0.5)'}}>Family Voices {voiceMessages.length > 0 && `(${voiceMessages.length})`}</p>

                {voiceMessages.length === 0 && (
                  <div style={{background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '20px', padding: '40px 20px', textAlign: 'center'}}>
                    <div style={{width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px'}}>
                      <MicIcon size={28} color="rgba(255,255,255,0.2)" strokeWidth={1.5}/>
                    </div>
                    <p style={{fontSize: '15px', fontWeight: 700, color: 'rgba(255,255,255,0.5)', marginBottom: '6px'}}>No voices yet</p>
                    <p style={{fontSize: '13px', color: 'rgba(255,255,255,0.25)'}}>Be the first to leave a voice for your family.</p>
                  </div>
                )}

                <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
                  {voiceMessages.map((msg) => (
                    <div key={msg._id} style={{background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '18px', padding: '16px', display: 'flex', alignItems: 'center', gap: '12px'}}>
                      <div style={{width: '44px', height: '44px', borderRadius: '50%', background: DS.gradient.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800, fontSize: '14px', flexShrink: 0, boxShadow: DS.shadow.primary}}>
                        {initials(msg.senderName)}
                      </div>
                      <div style={{flex: 1}}>
                        <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '10px'}}>
                          <p style={{fontSize: '14px', fontWeight: 700, color: 'white'}}>{msg.senderName}</p>
                          <p style={{fontSize: '11px', color: 'rgba(255,255,255,0.25)'}}>{timeAgo(msg.createdAt)}</p>
                        </div>
                        <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                          <button onClick={() => playVoice(msg)}
                            style={{width: '36px', height: '36px', borderRadius: '50%', background: DS.gradient.primary, border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0, boxShadow: DS.shadow.primary}}>
                            {playingId === msg._id ?
                              <PauseIcon size={14} color="white" strokeWidth={0}/> :
                              <PlayIcon size={12} color="white" strokeWidth={0}/>}
                          </button>
                          <div style={{flex: 1, display: 'flex', alignItems: 'center', gap: '2px', height: '24px'}}>
                            {Array.from({length: 26}).map((_, i) => (
                              <div key={i} style={{width: '3px', height: `${Math.max(4, Math.sin(i * 0.9) * 8 + 10)}px`, background: playingId === msg._id ? DS.colors.primary : 'rgba(255,255,255,0.15)', borderRadius: '2px', transition: 'background 0.3s ease'}}/>
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
                <div style={{background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '20px', overflow: 'hidden'}}>
                  <div style={{padding: '16px 16px 12px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <p style={{fontSize: '15px', fontWeight: 800, color: 'white'}}>Family ({family.members.length})</p>
                    <div style={{display: 'flex', alignItems: 'center', gap: '6px'}}>
                      <div style={{width: '6px', height: '6px', borderRadius: '50%', background: '#22C55E', boxShadow: '0 0 6px rgba(34,197,94,0.6)'}}/>
                      <span style={{fontSize: '11px', fontWeight: 600, color: '#22C55E'}}>{family.members.filter((m: any) => isOnline(m.lastActive)).length} online</span>
                    </div>
                  </div>
                  {family.members.map((member: any, i: number) => (
                    <div key={i} style={{display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 16px', borderBottom: i < family.members.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none'}}>
                      <div style={{position: 'relative', flexShrink: 0}}>
                        {member.avatar ?
                          <img src={member.avatar} alt={member.name} style={{width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover'}}/> :
                          <div style={{width: '48px', height: '48px', borderRadius: '50%', background: DS.gradient.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800, fontSize: '16px', boxShadow: DS.shadow.primary}}>{initials(member.name)}</div>}
                        <div style={{position: 'absolute', bottom: '1px', right: '1px', width: '12px', height: '12px', borderRadius: '50%', background: isOnline(member.lastActive) ? '#22C55E' : 'rgba(255,255,255,0.2)', border: '2px solid #06040C', boxShadow: isOnline(member.lastActive) ? '0 0 6px rgba(34,197,94,0.6)' : 'none'}}/>
                      </div>
                      <div style={{flex: 1}}>
                        <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                          <p style={{fontSize: '15px', fontWeight: 700, color: 'white'}}>{member.name}</p>
                          {family.admin?.toString() === member.user?.toString() && <span style={{fontSize: '9px', fontWeight: 700, padding: '2px 7px', borderRadius: '20px', background: 'rgba(220,20,60,0.15)', color: DS.colors.primary, border: `1px solid ${DS.colors.primaryBorder}`}}>Admin</span>}
                        </div>
                        <p style={{fontSize: '12px', color: isOnline(member.lastActive) ? '#22C55E' : 'rgba(255,255,255,0.3)', marginTop: '2px', fontWeight: 500}}>
                          {isOnline(member.lastActive) ? '● Active now' : `Last seen ${timeAgo(member.lastActive)}`}
                        </p>
                      </div>
                      <div style={{padding: '4px 10px', borderRadius: '20px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)', fontSize: '10px', fontWeight: 700, color: 'rgba(255,255,255,0.35)'}}>{member.role}</div>
                    </div>
                  ))}
                </div>

                {/* Invite */}
                <div style={{background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '20px', padding: '20px'}}>
                  <p style={{fontSize: '15px', fontWeight: 800, color: 'white', marginBottom: '6px'}}>Invite Family Members</p>
                  <p style={{fontSize: '13px', color: 'rgba(255,255,255,0.3)', marginBottom: '16px', lineHeight: 1.5}}>Share this code with your family to join your room.</p>
                  <div style={{display: 'flex', alignItems: 'center', gap: '12px', background: 'rgba(255,255,255,0.06)', borderRadius: '16px', padding: '16px 18px'}}>
                    <div style={{flex: 1}}>
                      <p style={{fontSize: '10px', fontWeight: 700, color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '6px'}}>Family Code</p>
                      <p style={{fontSize: '30px', fontWeight: 800, color: 'white', letterSpacing: '8px', fontFamily: 'monospace'}}>{family.code}</p>
                    </div>
                    <button onClick={copyCode}
                      style={{padding: '11px 18px', background: copied ? 'rgba(34,197,94,0.15)' : DS.gradient.primary, color: copied ? '#22C55E' : 'white', border: copied ? '1px solid rgba(34,197,94,0.3)' : 'none', borderRadius: '12px', fontSize: '13px', fontWeight: 700, cursor: 'pointer', fontFamily: 'Inter, sans-serif', flexShrink: 0, boxShadow: copied ? 'none' : DS.shadow.primary, transition: 'all 0.2s ease', display: 'flex', alignItems: 'center', gap: '6px'}}>
                      {copied ? <CheckIcon size={14} color="#22C55E" strokeWidth={2.5}/> : <PlusIcon size={14} color="white" strokeWidth={2.5}/>}
                      {copied ? 'Copied' : 'Copy'}
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      <style>{`
        @keyframes heartPulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.15); } }
        @keyframes mayaGlow { 0%, 100% { box-shadow: 0 8px 32px rgba(220,20,60,0.35); } 50% { box-shadow: 0 8px 48px rgba(220,20,60,0.6); } }
        @keyframes lampGlow { 0%, 100% { box-shadow: 0 0 20px rgba(251,191,36,0.3); } 50% { box-shadow: 0 0 40px rgba(251,191,36,0.6); } }
        @keyframes recordPulse { 0%, 100% { box-shadow: 0 0 0 16px rgba(220,20,60,0.15), 0 0 0 32px rgba(220,20,60,0.07); } 50% { box-shadow: 0 0 0 20px rgba(220,20,60,0.2), 0 0 0 40px rgba(220,20,60,0.1); } }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
        @keyframes spin { to { transform: rotate(360deg); } }
        input::placeholder { color: rgba(255,255,255,0.2); }
        ::-webkit-scrollbar { display: none; }
      `}</style>

      <BottomNav />
    </div>
  )
}
