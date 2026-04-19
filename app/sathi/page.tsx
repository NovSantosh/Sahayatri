'use client'
import { useState, useEffect, useRef } from 'react'
import { useSession } from 'next-auth/react'
import { useTheme } from '../context/ThemeContext'
import { brand } from '../design-system'

interface Message {
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  isVoice?: boolean
}

type Mode = 'arrival' | 'choose' | 'chat' | 'talk'

export default function Sathi() {
  const { data: session } = useSession()
  const { t } = useTheme()
  const firstName = session?.user?.name?.split(' ')[0] || 'friend'
  const hour = new Date().getHours()

  const [mode, setMode] = useState<Mode>('arrival')
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [hasSpoken, setHasSpoken] = useState(false)
  const [showChooseModal, setShowChooseModal] = useState(false)
  const [sathiTyping, setSathiTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const recognitionRef = useRef<any>(null)
  const synthRef = useRef<SpeechSynthesis | null>(null)

  // Time-aware greeting
  const getGreeting = () => {
    if (hour >= 22 || hour < 5) return { en: `Still up, ${firstName}?`, np: 'अझै जागिरहनु भएको?' }
    if (hour < 9) return { en: `Good morning, ${firstName}`, np: `शुभ प्रभात, ${firstName}` }
    if (hour < 12) return { en: `Good morning, ${firstName}`, np: `नमस्ते, ${firstName}` }
    if (hour < 17) return { en: `Good afternoon, ${firstName}`, np: `नमस्ते, ${firstName}` }
    if (hour < 20) return { en: `Good evening, ${firstName}`, np: `शुभ सन्ध्या, ${firstName}` }
    return { en: `Evening, ${firstName}`, np: `साँझ भयो, ${firstName}` }
  }

  const getOpeningMessage = () => {
    if (hour >= 22 || hour < 5) {
      return `${firstName}... यति राति जागिरहनु भएको। Are you okay? I am here with you.`
    }
    if (hour < 9) {
      return `शुभ प्रभात ${firstName}। A new day. How are you feeling today? If you have something on your mind — I am listening.`
    }
    if (hour >= 20) {
      return `साँझ भयो ${firstName}। The day is ending. How was it? If there is something you want to share — good or hard — I am here.`
    }
    return `नमस्ते ${firstName}। I am glad you are here. If you have something on your mind, I am listening. No rush.`
  }

  // Speak with voice
  const speak = (text: string) => {
    if (typeof window === 'undefined') return
    if (!window.speechSynthesis) return
    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.rate = 0.9
    utterance.pitch = 1.05
    utterance.volume = 1
    // Try to find a warm voice
    const voices = window.speechSynthesis.getVoices()
    const preferredVoice = voices.find(v =>
      v.name.includes('Samantha') ||
      v.name.includes('Karen') ||
      v.name.includes('Moira') ||
      v.name.includes('Female') ||
      v.lang.startsWith('en')
    )
    if (preferredVoice) utterance.voice = preferredVoice
    window.speechSynthesis.speak(utterance)
  }

  // Auto greet on arrival
  useEffect(() => {
    if (mode === 'arrival' && !hasSpoken) {
      const timer = setTimeout(() => {
        const greeting = getGreeting()
        speak(`${greeting.en}. ${getOpeningMessage()}`)
        setHasSpoken(true)
      }, 800)
      return () => clearTimeout(timer)
    }
  }, [mode])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Show choose modal after arrival
  useEffect(() => {
    if (mode === 'arrival') {
      const timer = setTimeout(() => {
        setShowChooseModal(true)
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [mode])

  const startListening = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Voice not supported on this browser. Please use Chrome.')
      return
    }
    const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition
    recognitionRef.current = new SpeechRecognition()
    recognitionRef.current.continuous = false
    recognitionRef.current.interimResults = false
    recognitionRef.current.lang = 'en-US'

    recognitionRef.current.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript
      setIsListening(false)
      sendMessage(transcript, true)
    }
    recognitionRef.current.onerror = () => setIsListening(false)
    recognitionRef.current.onend = () => setIsListening(false)

    recognitionRef.current.start()
    setIsListening(true)
  }

  const stopListening = () => {
    recognitionRef.current?.stop()
    setIsListening(false)
  }

  const sendMessage = async (text: string, isVoice = false) => {
    if (!text.trim() || loading) return
    setShowChooseModal(false)

    const userMsg: Message = { role: 'user', content: text, timestamp: new Date(), isVoice }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setLoading(true)
    setSathiTyping(true)

    try {
      const res = await fetch('/api/sathi', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMsg].map(m => ({ role: m.role, content: m.content })),
          userEmail: session?.user?.email,
          userName: session?.user?.name,
          hour,
        })
      })
      const data = await res.json()
      const reply = data.message || 'म यहाँ छु।'

      setTimeout(() => {
        setSathiTyping(false)
        setMessages(prev => [...prev, { role: 'assistant', content: reply, timestamp: new Date() }])
        // If in talk mode, speak the reply
        if (mode === 'talk') speak(reply)
      }, 800)

    } catch (e) {
      setSathiTyping(false)
      setMessages(prev => [...prev, { role: 'assistant', content: 'म अहिले जोडिन सकिनँ। Try again.', timestamp: new Date() }])
    }
    setLoading(false)
  }

  const formatTime = (date: Date) =>
    date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })

  const greeting = getGreeting()

  // Warm background based on time
  const warmBg = hour >= 20 || hour < 6
    ? 'linear-gradient(160deg, #06040C 0%, #0E0610 40%, #06040C 100%)'
    : 'linear-gradient(160deg, #06040C 0%, #0A0818 40%, #06040C 100%)'

  const warmGlow = hour >= 20 || hour < 6
    ? 'rgba(139,0,30,0.15)'
    : 'rgba(99,60,180,0.1)'

  return (
    <div style={{ minHeight: '100vh', background: warmBg, fontFamily: 'Inter, -apple-system, sans-serif', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>

      {/* Ambient glow */}
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: '50vh', background: `radial-gradient(ellipse 80% 60% at 50% 0%, ${warmGlow} 0%, transparent 70%)`, pointerEvents: 'none', zIndex: 0, transition: 'background 2s ease' }}/>

      {/* Choose modal — Talk or Chat */}
      {showChooseModal && messages.length === 0 && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 200, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', padding: '24px', backdropFilter: 'blur(12px)', animation: 'fadeIn 400ms ease' }}>
          <div style={{ width: '100%', maxWidth: '400px', marginBottom: '20px', animation: 'slideUp 400ms cubic-bezier(0.34,1.56,0.64,1)' }}>

            {/* Sathi orb */}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
              <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'linear-gradient(135deg, #DC143C, #A50E2D)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 48px rgba(220,20,60,0.4)', animation: 'breathe 3s ease infinite' }}>
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round">
                  <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"/>
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
                  <line x1="12" y1="19" x2="12" y2="23"/>
                  <line x1="8" y1="23" x2="16" y2="23"/>
                </svg>
              </div>
            </div>

            <p style={{ fontSize: '22px', fontWeight: 800, color: 'white', textAlign: 'center', letterSpacing: '-0.5px', marginBottom: '8px' }}>
              {greeting.np}
            </p>
            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', textAlign: 'center', lineHeight: 1.7, marginBottom: '32px', maxWidth: '280px', margin: '0 auto 28px' }}>
              {getOpeningMessage()}
            </p>

            {/* Choose */}
            <p style={{ fontSize: '11px', fontWeight: 700, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '1px', textAlign: 'center', marginBottom: '14px' }}>
              How would you like to connect?
            </p>

            <div style={{ display: 'flex', gap: '12px' }}>
              {/* Talk */}
              <button onClick={() => { setMode('talk'); setShowChooseModal(false) }}
                style={{ flex: 1, padding: '20px 16px', background: 'rgba(220,20,60,0.12)', border: '1.5px solid rgba(220,20,60,0.3)', borderRadius: '20px', cursor: 'pointer', fontFamily: 'Inter, sans-serif', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', transition: 'all 0.2s ease' }}>
                <div style={{ width: '52px', height: '52px', borderRadius: '50%', background: 'linear-gradient(135deg, #DC143C, #A50E2D)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 16px rgba(220,20,60,0.4)' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
                    <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"/>
                    <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
                  </svg>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <p style={{ fontSize: '15px', fontWeight: 800, color: 'white', marginBottom: '3px' }}>Talk</p>
                  <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', lineHeight: 1.4 }}>Speak freely. I will listen and respond with my voice.</p>
                </div>
              </button>

              {/* Chat */}
              <button onClick={() => { setMode('chat'); setShowChooseModal(false) }}
                style={{ flex: 1, padding: '20px 16px', background: 'rgba(255,255,255,0.05)', border: '1.5px solid rgba(255,255,255,0.1)', borderRadius: '20px', cursor: 'pointer', fontFamily: 'Inter, sans-serif', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', transition: 'all 0.2s ease' }}>
                <div style={{ width: '52px', height: '52px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(255,255,255,0.15)' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2" strokeLinecap="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                  </svg>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <p style={{ fontSize: '15px', fontWeight: 800, color: 'white', marginBottom: '3px' }}>Chat</p>
                  <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', lineHeight: 1.4 }}>Type your thoughts. Take your time.</p>
                </div>
              </button>
            </div>

            <button onClick={() => setShowChooseModal(false)}
              style={{ width: '100%', padding: '14px', background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.25)', fontSize: '13px', cursor: 'pointer', fontFamily: 'Inter, sans-serif', marginTop: '12px' }}>
              Maybe later
            </button>
          </div>
        </div>
      )}

      {/* ── HEADER ── */}
      <div style={{ background: 'rgba(6,4,12,0.9)', backdropFilter: 'blur(20px)', padding: '52px 20px 16px', borderBottom: '1px solid rgba(255,255,255,0.06)', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: 'linear-gradient(135deg, #DC143C, #A50E2D)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 20px rgba(220,20,60,0.35)', animation: 'breathe 3s ease infinite' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
            </div>
            <div>
              <h1 style={{ fontSize: '18px', fontWeight: 800, color: 'white', letterSpacing: '-0.4px' }}>Sathi</h1>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#22C55E', animation: 'pulse 2s ease infinite' }}/>
                <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.35)', fontWeight: 500 }}>
                  {mode === 'talk' ? 'Listening mode' : mode === 'chat' ? 'Chat mode' : 'Your companion'}
                </p>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            {/* Switch mode */}
            {(mode === 'chat' || mode === 'talk') && (
              <button onClick={() => setShowChooseModal(true)}
                style={{ padding: '7px 14px', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '9999px', color: 'rgba(255,255,255,0.5)', fontSize: '12px', fontWeight: 600, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
                {mode === 'talk' ? '💬 Chat' : '🎙 Talk'}
              </button>
            )}
            {messages.length > 0 && (
              <button onClick={() => { setMessages([]); setMode('arrival'); setHasSpoken(false); setShowChooseModal(false) }}
                style={{ padding: '7px 14px', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '9999px', color: 'rgba(255,255,255,0.5)', fontSize: '12px', fontWeight: 600, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
                New
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── MESSAGES ── */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '20px 16px', display: 'flex', flexDirection: 'column', gap: '20px', paddingBottom: '120px', position: 'relative', zIndex: 1 }}>

        {/* Arrival state */}
        {mode === 'arrival' && messages.length === 0 && !showChooseModal && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '60px 24px', textAlign: 'center', animation: 'fadeIn 600ms ease' }}>
            <div style={{ width: '96px', height: '96px', borderRadius: '50%', background: 'linear-gradient(135deg, #DC143C, #A50E2D)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 60px rgba(220,20,60,0.3)', animation: 'breathe 3s ease infinite', marginBottom: '24px' }}>
              <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
            </div>
            <h2 style={{ fontSize: '26px', fontWeight: 900, color: 'white', letterSpacing: '-0.8px', marginBottom: '10px' }}>
              {greeting.np}
            </h2>
            <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.8, maxWidth: '260px' }}>
              {getOpeningMessage()}
            </p>
          </div>
        )}

        {/* Chat messages */}
        {messages.map((msg, i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: msg.role === 'user' ? 'flex-end' : 'flex-start', gap: '4px', animation: 'fadeIn 300ms ease' }}>
            {msg.role === 'assistant' && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: 'linear-gradient(135deg, #DC143C, #A50E2D)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="white" stroke="none">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                  </svg>
                </div>
                <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', fontWeight: 600 }}>Sathi</span>
              </div>
            )}

            {msg.isVoice && msg.role === 'user' && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '2px', justifyContent: 'flex-end' }}>
                <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)' }}>🎙 Voice</span>
              </div>
            )}

            <div style={{
              maxWidth: '82%',
              padding: msg.role === 'assistant' ? '14px 18px' : '12px 18px',
              borderRadius: msg.role === 'user' ? '20px 20px 6px 20px' : '20px 20px 20px 6px',
              background: msg.role === 'user'
                ? 'linear-gradient(135deg, #DC143C, #A50E2D)'
                : 'rgba(255,255,255,0.06)',
              border: msg.role === 'user' ? 'none' : '1px solid rgba(255,255,255,0.08)',
              boxShadow: msg.role === 'user' ? '0 4px 20px rgba(220,20,60,0.25)' : 'none',
            }}>
              <p style={{ fontSize: '15px', color: 'white', lineHeight: 1.75, margin: 0, whiteSpace: 'pre-wrap' }}>
                {msg.content}
              </p>
            </div>

            <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.18)', paddingLeft: msg.role === 'user' ? '0' : '30px' }}>
              {formatTime(msg.timestamp)}
            </p>
          </div>
        ))}

        {/* Sathi typing */}
        {sathiTyping && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '4px', animation: 'fadeIn 200ms ease' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
              <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: 'linear-gradient(135deg, #DC143C, #A50E2D)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="white" stroke="none">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
              </div>
              <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)' }}>Sathi</span>
            </div>
            {/* Lamp flickering instead of dots */}
            <div style={{ padding: '14px 20px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '20px 20px 20px 6px', display: 'flex', gap: '6px', alignItems: 'center' }}>
              <span style={{ fontSize: '14px', animation: 'lampFlicker 1.5s ease infinite' }}>🪔</span>
              <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)', fontStyle: 'italic' }}>thinking...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef}/>
      </div>

      {/* ── TALK MODE — Big mic button ── */}
      {mode === 'talk' && (
        <div style={{ position: 'fixed', bottom: '40px', left: 0, right: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px', zIndex: 50, padding: '0 24px' }}>
          <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', textAlign: 'center' }}>
            {isListening ? 'I am listening… speak freely' : 'Tap and hold to speak'}
          </p>
          <button
            onTouchStart={startListening}
            onTouchEnd={stopListening}
            onMouseDown={startListening}
            onMouseUp={stopListening}
            style={{
              width: '84px', height: '84px',
              borderRadius: '50%',
              background: isListening
                ? 'linear-gradient(135deg, #10B981, #059669)'
                : 'linear-gradient(135deg, #DC143C, #A50E2D)',
              border: 'none',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: isListening
                ? '0 0 0 16px rgba(16,185,129,0.15), 0 0 0 32px rgba(16,185,129,0.07)'
                : '0 0 0 12px rgba(220,20,60,0.12)',
              animation: isListening ? 'breathe 1s ease infinite' : 'none',
              transition: 'all 0.3s ease',
            }}>
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
              {isListening
                ? <><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></>
                : <><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></>}
            </svg>
          </button>
        </div>
      )}

      {/* ── CHAT MODE — Input ── */}
      {(mode === 'chat' || (mode === 'arrival' && !showChooseModal)) && (
        <div style={{ position: 'fixed', bottom: '20px', left: 0, right: 0, padding: '12px 16px', background: 'rgba(6,4,12,0.92)', backdropFilter: 'blur(20px)', borderTop: '1px solid rgba(255,255,255,0.06)', zIndex: 50 }}>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            {/* Mic button in chat mode */}
            <button
              onTouchStart={startListening}
              onTouchEnd={stopListening}
              onMouseDown={startListening}
              onMouseUp={stopListening}
              style={{ width: '44px', height: '44px', borderRadius: '50%', background: isListening ? 'rgba(16,185,129,0.2)' : 'rgba(255,255,255,0.07)', border: `1px solid ${isListening ? 'rgba(16,185,129,0.4)' : 'rgba(255,255,255,0.1)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0, transition: 'all 0.2s ease' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={isListening ? '#10B981' : 'rgba(255,255,255,0.4)'} strokeWidth="2" strokeLinecap="round">
                <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"/>
                <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
              </svg>
            </button>

            <div style={{ flex: 1, background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '9999px', padding: '12px 20px', display: 'flex', alignItems: 'center' }}>
              <input
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && !e.shiftKey && sendMessage(input)}
                onFocus={() => setShowChooseModal(false)}
                placeholder={hour >= 20 || hour < 6 ? 'What is on your mind tonight...' : 'Say anything, in any language...'}
                style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', fontSize: '15px', color: 'white', fontFamily: 'Inter, sans-serif' }}
              />
            </div>

            <button
              onClick={() => sendMessage(input)}
              disabled={!input.trim() || loading}
              style={{ width: '44px', height: '44px', borderRadius: '50%', background: input.trim() ? 'linear-gradient(135deg, #DC143C, #A50E2D)' : 'rgba(255,255,255,0.07)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: input.trim() ? 'pointer' : 'not-allowed', flexShrink: 0, boxShadow: input.trim() ? '0 4px 16px rgba(220,20,60,0.4)' : 'none', transition: 'all 0.2s ease' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={input.trim() ? 'white' : 'rgba(255,255,255,0.25)'} strokeWidth="2" strokeLinecap="round">
                <line x1="22" y1="2" x2="11" y2="13"/>
                <polygon points="22 2 15 22 11 13 2 9 22 2"/>
              </svg>
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes breathe { 0%,100%{transform:scale(1);box-shadow:0 0 20px rgba(220,20,60,0.35)} 50%{transform:scale(1.04);box-shadow:0 0 40px rgba(220,20,60,0.5)} }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }
        @keyframes fadeIn { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
        @keyframes slideUp { from{opacity:0;transform:translateY(40px)} to{opacity:1;transform:translateY(0)} }
        @keyframes lampFlicker { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.6;transform:scale(0.95)} }
        input::placeholder { color: rgba(255,255,255,0.25); }
        ::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  )
}
