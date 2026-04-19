'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
import { useSession } from 'next-auth/react'
import { useTheme } from '../context/ThemeContext'
import { brand } from '../design-system'

interface Message {
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

export default function Sathi() {
  const { data: session } = useSession()
  const firstName = session?.user?.name?.split(' ')[0] || 'friend'
  const hour = new Date().getHours()

  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [hasGreeted, setHasGreeted] = useState(false)
  const [showInput, setShowInput] = useState(false)
  const [voiceSupported, setVoiceSupported] = useState(false)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const recognitionRef = useRef<any>(null)

  // Time-aware opening message
  const getOpeningMessage = () => {
    if (hour >= 22 || hour < 5) {
      return `${firstName}... यति राति जागिरहनु भएको। I am here with you. How are you doing?`
    }
    if (hour < 9) {
      return `शुभ प्रभात ${firstName}। Good morning. I hope you slept well. How are you feeling today?`
    }
    if (hour < 12) {
      return `Namaste ${firstName}। Good morning. I am here if you want to talk. How is your day starting?`
    }
    if (hour < 17) {
      return `Namaste ${firstName}। How is your afternoon going? If you have something on your mind, I am listening.`
    }
    if (hour < 20) {
      return `शुभ सन्ध्या ${firstName}। Good evening. The day is winding down. How was it for you?`
    }
    return `साँझ भयो ${firstName}। It is evening now. How are you? If something is on your mind, I am here.`
  }

  // Speak text
  const speak = useCallback((text: string, onEnd?: () => void) => {
    if (typeof window === 'undefined') return
    if (!window.speechSynthesis) return

    window.speechSynthesis.cancel()
    setIsSpeaking(true)

    // Clean text for speech — remove Nepali script for better TTS
    const cleanText = text.replace(/[\u0900-\u097F]+/g, '')
      .replace(/\s+/g, ' ').trim()

    const utterance = new SpeechSynthesisUtterance(cleanText)
    utterance.rate = 0.88
    utterance.pitch = 1.08
    utterance.volume = 1

    const voices = window.speechSynthesis.getVoices()
    const preferred = voices.find(v =>
      v.name.includes('Samantha') ||
      v.name.includes('Karen') ||
      v.name.includes('Moira') ||
      v.name.includes('Victoria') ||
      (v.lang.startsWith('en') && v.name.includes('Female'))
    ) || voices.find(v => v.lang.startsWith('en'))

    if (preferred) utterance.voice = preferred

    utterance.onend = () => {
      setIsSpeaking(false)
      onEnd?.()
    }
    utterance.onerror = () => {
      setIsSpeaking(false)
      onEnd?.()
    }

    window.speechSynthesis.speak(utterance)
  }, [])

  // Check voice support
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setVoiceSupported(
        'webkitSpeechRecognition' in window ||
        'SpeechRecognition' in window
      )
      // Load voices
      window.speechSynthesis?.getVoices()
      window.speechSynthesis?.addEventListener('voiceschanged', () => {
        window.speechSynthesis.getVoices()
      })
    }
  }, [])

  // Auto greet on mount
  useEffect(() => {
    if (hasGreeted) return
    const timer = setTimeout(() => {
      const opening = getOpeningMessage()
      const greetMsg: Message = {
        role: 'assistant',
        content: opening,
        timestamp: new Date(),
      }
      setMessages([greetMsg])
      setHasGreeted(true)

      // Speak the greeting after a small delay
      setTimeout(() => {
        speak(opening, () => {
          // After speaking, show the input options
          setShowInput(true)
        })
      }, 500)
    }, 800)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Start listening
  const startListening = () => {
    if (isSpeaking) window.speechSynthesis?.cancel()
    if (!voiceSupported) {
      setShowInput(true)
      return
    }

    const SpeechRecognition = (window as any).webkitSpeechRecognition ||
      (window as any).SpeechRecognition
    recognitionRef.current = new SpeechRecognition()
    recognitionRef.current.continuous = false
    recognitionRef.current.interimResults = false
    recognitionRef.current.lang = 'en-US'

    recognitionRef.current.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript
      setIsListening(false)
      if (transcript.trim()) sendMessage(transcript)
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

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return

    const userMsg: Message = { role: 'user', content: text, timestamp: new Date() }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setLoading(true)

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

      // Add a natural pause before responding
      await new Promise(r => setTimeout(r, 600))

      const assistantMsg: Message = {
        role: 'assistant',
        content: reply,
        timestamp: new Date(),
      }
      setMessages(prev => [...prev, assistantMsg])

      // Speak the reply
      speak(reply)

    } catch (e) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'म अहिले जोडिन सकिनँ। Please try again.',
        timestamp: new Date(),
      }])
    }
    setLoading(false)
  }

  const formatTime = (date: Date) =>
    date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })

  const warmBg = hour >= 20 || hour < 6
    ? 'linear-gradient(160deg, #06040C 0%, #0E0610 50%, #06040C 100%)'
    : 'linear-gradient(160deg, #06040C 0%, #0A0818 50%, #06040C 100%)'

  return (
    <div style={{ minHeight: '100vh', background: warmBg, fontFamily: 'Inter, -apple-system, sans-serif', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>

      {/* Ambient glow */}
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: '50vh', background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(139,0,30,0.12) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }}/>

      {/* ── HEADER ── */}
      <div style={{ background: 'rgba(6,4,12,0.9)', backdropFilter: 'blur(20px)', padding: '52px 20px 16px', borderBottom: '1px solid rgba(255,255,255,0.06)', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {/* Sathi orb */}
            <div style={{
              width: '44px', height: '44px', borderRadius: '50%',
              background: 'linear-gradient(135deg, #DC143C, #A50E2D)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: isSpeaking
                ? '0 0 0 8px rgba(220,20,60,0.15), 0 0 0 16px rgba(220,20,60,0.07)'
                : '0 0 20px rgba(220,20,60,0.35)',
              animation: isSpeaking ? 'speakPulse 1s ease infinite' : 'breathe 3s ease infinite',
              transition: 'box-shadow 0.3s ease',
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
            </div>
            <div>
              <h1 style={{ fontSize: '18px', fontWeight: 800, color: 'white', letterSpacing: '-0.4px' }}>Sathi</h1>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: isSpeaking ? '#F59E0B' : isListening ? '#10B981' : '#22C55E', animation: 'pulse 2s ease infinite' }}/>
                <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.35)', fontWeight: 500 }}>
                  {isSpeaking ? 'Speaking...' : isListening ? 'Listening...' : loading ? 'Thinking...' : 'साथी · Always here'}
                </p>
              </div>
            </div>
          </div>

          {messages.length > 1 && (
            <button onClick={() => { setMessages([]); setHasGreeted(false); setShowInput(false); window.speechSynthesis?.cancel() }}
              style={{ padding: '7px 14px', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '9999px', color: 'rgba(255,255,255,0.4)', fontSize: '12px', fontWeight: 600, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
              New
            </button>
          )}
        </div>
      </div>

      {/* ── MESSAGES ── */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '24px 16px', display: 'flex', flexDirection: 'column', gap: '20px', paddingBottom: '180px', position: 'relative', zIndex: 1 }}>

        {messages.map((msg, i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: msg.role === 'user' ? 'flex-end' : 'flex-start', gap: '4px', animation: 'fadeIn 400ms ease' }}>

            {msg.role === 'assistant' && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '7px', marginBottom: '4px' }}>
                <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'linear-gradient(135deg, #DC143C, #A50E2D)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="9" height="9" viewBox="0 0 24 24" fill="white" stroke="none">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                  </svg>
                </div>
                <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.25)', fontWeight: 600 }}>Sathi</span>
              </div>
            )}

            <div style={{
              maxWidth: '84%',
              padding: '14px 18px',
              borderRadius: msg.role === 'user' ? '20px 20px 6px 20px' : '6px 20px 20px 20px',
              background: msg.role === 'user'
                ? 'linear-gradient(135deg, #DC143C, #A50E2D)'
                : 'rgba(255,255,255,0.06)',
              border: msg.role === 'user' ? 'none' : '1px solid rgba(255,255,255,0.08)',
              boxShadow: msg.role === 'user' ? '0 4px 16px rgba(220,20,60,0.2)' : 'none',
            }}>
              <p style={{ fontSize: '15px', color: 'white', lineHeight: 1.8, margin: 0, whiteSpace: 'pre-wrap' }}>
                {msg.content}
              </p>
            </div>

            <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.15)', paddingLeft: msg.role === 'assistant' ? '28px' : '0' }}>
              {formatTime(msg.timestamp)}
            </p>
          </div>
        ))}

        {/* Loading — lamp flicker */}
        {loading && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '4px', animation: 'fadeIn 200ms ease' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '7px', marginBottom: '4px' }}>
              <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'linear-gradient(135deg, #DC143C, #A50E2D)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="9" height="9" viewBox="0 0 24 24" fill="white" stroke="none">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
              </div>
              <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.25)' }}>Sathi</span>
            </div>
            <div style={{ padding: '14px 18px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '6px 20px 20px 20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '16px', animation: 'lampFlicker 1.5s ease infinite' }}>🪔</span>
              <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.3)', fontStyle: 'italic' }}>
                {['thinking...', 'सोच्दैछु...', 'with you...'][Math.floor(Date.now() / 2000) % 3]}
              </span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef}/>
      </div>

      {/* ── BOTTOM — Mic + optional text input ── */}
      {showInput && (
        <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 50, padding: '20px 20px 36px', background: 'linear-gradient(0deg, rgba(6,4,12,1) 0%, rgba(6,4,12,0.95) 60%, transparent 100%)' }}>

          {/* Main mic button */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>

            {/* Instruction text */}
            <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)', textAlign: 'center', letterSpacing: '0.3px' }}>
              {isListening
                ? '�� Listening... release to send'
                : isSpeaking
                  ? '🔊 Sathi is speaking...'
                  : 'Hold to speak · or type below'}
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>

              {/* Text input toggle */}
              <button onClick={() => inputRef.current?.focus()}
                style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2" strokeLinecap="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                </svg>
              </button>

              {/* Main mic */}
              <button
                onTouchStart={startListening}
                onTouchEnd={stopListening}
                onMouseDown={startListening}
                onMouseUp={stopListening}
                style={{
                  width: '76px', height: '76px', borderRadius: '50%',
                  background: isListening
                    ? 'linear-gradient(135deg, #10B981, #059669)'
                    : 'linear-gradient(135deg, #DC143C, #A50E2D)',
                  border: 'none',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: isListening
                    ? '0 0 0 12px rgba(16,185,129,0.15), 0 0 0 24px rgba(16,185,129,0.07)'
                    : '0 0 0 8px rgba(220,20,60,0.12)',
                  animation: isListening ? 'speakPulse 1s ease infinite' : 'none',
                  transition: 'all 0.2s ease',
                }}>
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
                  {isListening
                    ? <><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></>
                    : <><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></>}
                </svg>
              </button>

              {/* Stop speaking */}
              <button
                onClick={() => window.speechSynthesis?.cancel()}
                style={{ width: '44px', height: '44px', borderRadius: '50%', background: isSpeaking ? 'rgba(245,158,11,0.15)' : 'rgba(255,255,255,0.07)', border: `1px solid ${isSpeaking ? 'rgba(245,158,11,0.3)' : 'rgba(255,255,255,0.1)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.2s ease' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={isSpeaking ? '#F59E0B' : 'rgba(255,255,255,0.3)'} strokeWidth="2" strokeLinecap="round">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                  {isSpeaking && <line x1="23" y1="9" x2="17" y2="15"/>}
                  {isSpeaking && <line x1="17" y1="9" x2="23" y2="15"/>}
                </svg>
              </button>
            </div>

            {/* Text input */}
            <div style={{ width: '100%', display: 'flex', gap: '10px', alignItems: 'center', maxWidth: '400px' }}>
              <div style={{ flex: 1, background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '9999px', padding: '11px 18px', display: 'flex', alignItems: 'center' }}>
                <input
                  ref={inputRef}
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && !e.shiftKey && sendMessage(input)}
                  placeholder="Or type here..."
                  style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', fontSize: '14px', color: 'white', fontFamily: 'Inter, sans-serif' }}
                />
              </div>
              {input.trim() && (
                <button onClick={() => sendMessage(input)}
                  style={{ width: '42px', height: '42px', borderRadius: '50%', background: 'linear-gradient(135deg, #DC143C, #A50E2D)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0, boxShadow: '0 4px 16px rgba(220,20,60,0.4)' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
                    <line x1="22" y1="2" x2="11" y2="13"/>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes breathe { 0%,100%{transform:scale(1);box-shadow:0 0 20px rgba(220,20,60,0.35)} 50%{transform:scale(1.05);box-shadow:0 0 40px rgba(220,20,60,0.5)} }
        @keyframes speakPulse { 0%,100%{box-shadow:0 0 0 8px rgba(220,20,60,0.15),0 0 0 16px rgba(220,20,60,0.07)} 50%{box-shadow:0 0 0 14px rgba(220,20,60,0.2),0 0 0 28px rgba(220,20,60,0.05)} }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }
        @keyframes fadeIn { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
        @keyframes lampFlicker { 0%,100%{opacity:1;transform:scale(1)} 40%{opacity:0.6;transform:scale(0.92)} 70%{opacity:0.85;transform:scale(0.97)} }
        input::placeholder { color: rgba(255,255,255,0.2); }
        ::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  )
}
