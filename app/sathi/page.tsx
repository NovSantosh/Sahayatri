'use client'
import { useState, useEffect, useRef } from 'react'
import { useSession } from 'next-auth/react'
import { useTheme } from '../context/ThemeContext'
import { brand } from '../design-system'
import { MicIcon, SendIcon, ArrowLeftIcon, SparkleIcon } from '../components/Icons'

interface Message {
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

const STARTERS = [
  'आमालाई के खाना मनपर्छ?',
  'I miss home. Talk to me.',
  'Tell me a Nepali story.',
  'How do I say I love you in Nepali?',
  'What festivals are coming up?',
  'I am feeling lonely today.',
]

export default function Sathi() {
  const { data: session } = useSession()
  const { t, theme } = useTheme()
  const isDark = theme === 'dark'
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [showWelcome, setShowWelcome] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return
    setShowWelcome(false)
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
        })
      })
      const data = await res.json()
      if (data.message) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.message, timestamp: new Date() }])
      }
    } catch (e) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, I had trouble connecting. Please try again.', timestamp: new Date() }])
    }
    setLoading(false)
  }

  const formatTime = (date: Date) =>
    date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })

  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'

  // Background adapts — dark always for Sathi
  const bg = 'linear-gradient(160deg, #06040C 0%, #0E0818 40%, #06040C 100%)'

  return (
    <div style={{minHeight: '100vh', background: bg, fontFamily: 'Inter, -apple-system, sans-serif', display: 'flex', flexDirection: 'column'}}>

      {/* Global glow */}
      <div style={{position: 'fixed', top: 0, left: 0, right: 0, height: '40vh', background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(139,0,30,0.18) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0}}/>

      {/* ── HEADER ── */}
      <div style={{background: 'rgba(6,4,12,0.95)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', padding: '52px 20px 16px', borderBottom: '1px solid rgba(255,255,255,0.06)', position: 'sticky', top: 0, zIndex: 50}}>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
            {/* Orb */}
            <div style={{width: '44px', height: '44px', borderRadius: '50%', background: 'linear-gradient(135deg, #DC143C, #A50E2D)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 20px rgba(220,20,60,0.4)', animation: 'breathe 3s ease infinite'}}>
              <MicIcon size={20} color="white" strokeWidth={2}/>
            </div>
            <div>
              <h1 style={{fontSize: '18px', fontWeight: 800, color: 'white', letterSpacing: '-0.4px'}}>Sathi AI</h1>
              <div style={{display: 'flex', alignItems: 'center', gap: '5px'}}>
                <div style={{width: '5px', height: '5px', borderRadius: '50%', background: '#22C55E', boxShadow: '0 0 5px rgba(34,197,94,0.8)', animation: 'pulse 2s ease infinite'}}/>
                <p style={{fontSize: '11px', color: 'rgba(255,255,255,0.4)', fontWeight: 500}}>Always here · Nepali & English</p>
              </div>
            </div>
          </div>
          {messages.length > 0 && (
            <button onClick={() => { setMessages([]); setShowWelcome(true) }}
              style={{padding: '7px 14px', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '9999px', color: 'rgba(255,255,255,0.5)', fontSize: '12px', fontWeight: 600, cursor: 'pointer', fontFamily: 'Inter, sans-serif'}}>
              New chat
            </button>
          )}
        </div>
      </div>

      {/* ── MESSAGES ── */}
      <div style={{flex: 1, overflowY: 'auto', padding: '20px 16px', display: 'flex', flexDirection: 'column', gap: '16px', paddingBottom: '40px', position: 'relative', zIndex: 1}}>

        {/* Welcome state */}
        {showWelcome && (
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '32px 0 24px'}}>
            {/* Big orb */}
            <div style={{width: '88px', height: '88px', borderRadius: '50%', background: 'linear-gradient(135deg, #DC143C, #A50E2D)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 48px rgba(220,20,60,0.35)', animation: 'breathe 3s ease infinite', marginBottom: '20px'}}>
              <MicIcon size={40} color="white" strokeWidth={1.8}/>
            </div>
            <h2 style={{fontSize: '22px', fontWeight: 800, color: 'white', marginBottom: '8px', letterSpacing: '-0.5px', textAlign: 'center'}}>
              {greeting}, {session?.user?.name?.split(' ')[0] || 'friend'}
            </h2>
            <p style={{fontSize: '14px', color: 'rgba(255,255,255,0.4)', textAlign: 'center', lineHeight: 1.6, maxWidth: '260px', marginBottom: '32px'}}>
              I am Sathi — your companion who speaks Nepali and English. Tell me anything.
            </p>

            {/* Starter prompts */}
            <div style={{width: '100%', display: 'flex', flexDirection: 'column', gap: '8px'}}>
              <p style={{fontSize: '10px', fontWeight: 700, color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase', letterSpacing: '1px', textAlign: 'center', marginBottom: '4px'}}>Try saying</p>
              {STARTERS.map((s, i) => (
                <button key={i} onClick={() => sendMessage(s)}
                  style={{width: '100%', padding: '13px 18px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '14px', color: 'rgba(255,255,255,0.7)', fontSize: '14px', fontWeight: 500, cursor: 'pointer', fontFamily: 'Inter, sans-serif', textAlign: 'left', transition: 'all 0.15s ease'}}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(220,20,60,0.1)'; e.currentTarget.style.borderColor = 'rgba(220,20,60,0.2)' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)' }}>
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Message bubbles */}
        {messages.map((msg, i) => (
          <div key={i} style={{display: 'flex', flexDirection: 'column', alignItems: msg.role === 'user' ? 'flex-end' : 'flex-start', gap: '4px'}}>
            {msg.role === 'assistant' && (
              <div style={{display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px'}}>
                <div style={{width: '24px', height: '24px', borderRadius: '50%', background: 'linear-gradient(135deg, #DC143C, #A50E2D)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>
                  <SparkleIcon size={12} color="white" strokeWidth={2}/>
                </div>
                <span style={{fontSize: '11px', color: 'rgba(255,255,255,0.3)', fontWeight: 600}}>Sathi</span>
              </div>
            )}
            <div style={{
              maxWidth: '80%',
              padding: '12px 16px',
              borderRadius: msg.role === 'user' ? '20px 20px 6px 20px' : '20px 20px 20px 6px',
              background: msg.role === 'user'
                ? 'linear-gradient(135deg, #DC143C, #A50E2D)'
                : 'rgba(255,255,255,0.07)',
              border: msg.role === 'user' ? 'none' : '1px solid rgba(255,255,255,0.08)',
              boxShadow: msg.role === 'user' ? '0 4px 16px rgba(220,20,60,0.3)' : 'none',
            }}>
              <p style={{fontSize: '15px', color: 'white', lineHeight: 1.6, margin: 0}}>{msg.content}</p>
            </div>
            <p style={{fontSize: '10px', color: 'rgba(255,255,255,0.2)', paddingLeft: msg.role === 'user' ? '0' : '32px', paddingRight: msg.role === 'user' ? '4px' : '0'}}>
              {formatTime(msg.timestamp)}
            </p>
          </div>
        ))}

        {/* Typing indicator */}
        {loading && (
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '4px'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px'}}>
              <div style={{width: '24px', height: '24px', borderRadius: '50%', background: 'linear-gradient(135deg, #DC143C, #A50E2D)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <SparkleIcon size={12} color="white" strokeWidth={2}/>
              </div>
              <span style={{fontSize: '11px', color: 'rgba(255,255,255,0.3)', fontWeight: 600}}>Sathi</span>
            </div>
            <div style={{padding: '14px 18px', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '20px 20px 20px 6px', display: 'flex', gap: '5px', alignItems: 'center'}}>
              {[0, 1, 2].map(i => (
                <div key={i} style={{width: '7px', height: '7px', borderRadius: '50%', background: 'rgba(255,255,255,0.4)', animation: `typingDot 1.2s ease ${i * 0.2}s infinite`}}/>
              ))}
            </div>
          </div>
        )}

        <div ref={messagesEndRef}/>
      </div>

      {/* ── INPUT ── */}
      <div style={{position: 'fixed', bottom: '80px', left: 0, right: 0, padding: '12px 16px', background: 'rgba(6,4,12,0.95)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', borderTop: '1px solid rgba(255,255,255,0.06)', zIndex: 50}}>
        <div style={{display: 'flex', gap: '10px', alignItems: 'center'}}>
          <div style={{flex: 1, background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '9999px', padding: '12px 20px', display: 'flex', alignItems: 'center'}}>
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && !e.shiftKey && sendMessage(input)}
              placeholder="Say anything in Nepali or English…"
              style={{flex: 1, background: 'transparent', border: 'none', outline: 'none', fontSize: '15px', color: 'white', fontFamily: 'Inter, sans-serif'}}
            />
          </div>
          <button
            onClick={() => sendMessage(input)}
            disabled={!input.trim() || loading}
            style={{width: '48px', height: '48px', borderRadius: '50%', background: input.trim() ? 'linear-gradient(135deg, #DC143C, #A50E2D)' : 'rgba(255,255,255,0.07)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: input.trim() ? 'pointer' : 'not-allowed', flexShrink: 0, boxShadow: input.trim() ? '0 4px 16px rgba(220,20,60,0.4)' : 'none', transition: 'all 0.2s ease'}}>
            <SendIcon size={18} color={input.trim() ? 'white' : 'rgba(255,255,255,0.25)'} strokeWidth={2}/>
          </button>
        </div>
      </div>

      <style>{`
        @keyframes breathe { 0%, 100% { transform: scale(1); box-shadow: 0 0 20px rgba(220,20,60,0.35); } 50% { transform: scale(1.04); box-shadow: 0 0 40px rgba(220,20,60,0.5); } }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
        @keyframes typingDot { 0%, 100% { transform: translateY(0); opacity: 0.4; } 50% { transform: translateY(-4px); opacity: 1; } }
        input::placeholder { color: rgba(255,255,255,0.25); }
        ::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  )
}
