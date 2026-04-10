'use client'
import { useState, useEffect, useRef } from 'react'
import { useSession } from 'next-auth/react'
import BottomNav from '../components/BottomNav'
import { DS } from '../design-system'

export default function Sathi() {
  const { data: session } = useSession()
  const [messages, setMessages] = useState<any[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [started, setStarted] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const firstName = session?.user?.name?.split(' ')[0] || 'friend'
  const hour = new Date().getHours()

  const starters = [
    'आमालाई सम्झिरहेछु 💙',
    'How is my family doing?',
    'म एक्लो महसुस गर्दैछु',
    'Tell me something in Nepali',
    'I miss home today',
    'के छ Sathi? 😊',
  ]

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  const sendMessage = async (text?: string) => {
    const msg = text || input.trim()
    if (!msg || loading) return
    setInput('')
    setStarted(true)

    const userMsg = { role: 'user', content: msg, time: new Date() }
    setMessages(prev => [...prev, userMsg])
    setLoading(true)

    try {
      const res = await fetch('/api/sathi', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMsg].map(m => ({ role: m.role, content: m.content })),
          userName: session?.user?.name || 'friend',
        }),
      })
      const data = await res.json()
      if (data.message) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.message, time: new Date() }])
      }
    } catch (e) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Maaf garnus, kehi samasya bhayo. Pheri try garnuhos. 🙏', time: new Date() }])
    }
    setLoading(false)
  }

  const formatTime = (date: Date) => date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })

  return (
    <div style={{minHeight: '100vh', background: '#06040C', fontFamily: 'Inter, -apple-system, sans-serif', display: 'flex', flexDirection: 'column', paddingBottom: '80px'}}>

      {/* Background */}
      <div style={{position: 'fixed', inset: 0, background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(139,0,30,0.3) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0}}/>
      <div style={{position: 'fixed', bottom: 0, left: 0, right: 0, height: '40%', background: 'radial-gradient(ellipse 80% 100% at 50% 100%, rgba(30,0,60,0.4) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0}}/>

      {/* Header */}
      <div style={{background: 'rgba(6,4,12,0.9)', backdropFilter: 'blur(20px)', padding: '52px 20px 16px', borderBottom: '1px solid rgba(255,255,255,0.06)', position: 'sticky', top: 0, zIndex: 50}}>
        <div style={{display: 'flex', alignItems: 'center', gap: '14px'}}>
          {/* Sathi avatar */}
          <div style={{position: 'relative', flexShrink: 0}}>
            <div style={{width: '48px', height: '48px', borderRadius: '50%', background: 'linear-gradient(135deg, #DC143C, #A50E2D)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 20px rgba(220,20,60,0.4)'}}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round"/><line x1="12" y1="19" x2="12" y2="23" stroke="white" strokeWidth="2" strokeLinecap="round"/></svg>
            </div>
            <div style={{position: 'absolute', bottom: '1px', right: '1px', width: '12px', height: '12px', borderRadius: '50%', background: '#22C55E', border: '2px solid #06040C', boxShadow: '0 0 6px rgba(34,197,94,0.6)'}}/>
          </div>
          <div style={{flex: 1}}>
            <h1 style={{fontSize: '18px', fontWeight: 800, color: 'white', letterSpacing: '-0.4px'}}>Sathi AI</h1>
            <div style={{display: 'flex', alignItems: 'center', gap: '5px', marginTop: '2px'}}>
              <div style={{width: '5px', height: '5px', borderRadius: '50%', background: '#22C55E', boxShadow: '0 0 4px rgba(34,197,94,0.8)'}}/>
              <p style={{fontSize: '12px', color: 'rgba(255,255,255,0.4)', fontWeight: 500}}>Active · Speaks Nepali & English</p>
            </div>
          </div>
          {messages.length > 0 && (
            <button onClick={() => { setMessages([]); setStarted(false) }}
              style={{padding: '7px 14px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '20px', color: 'rgba(255,255,255,0.4)', fontSize: '12px', fontWeight: 600, cursor: 'pointer', fontFamily: 'Inter, sans-serif'}}>
              New chat
            </button>
          )}
        </div>
      </div>

      {/* Messages */}
      <div style={{flex: 1, overflowY: 'auto', padding: '20px 16px', position: 'relative', zIndex: 1}}>

        {/* Welcome state */}
        {!started && (
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '20px 0 32px'}}>
            {/* Big Sathi orb */}
            <div style={{width: '88px', height: '88px', borderRadius: '50%', background: 'linear-gradient(135deg, #DC143C, #A50E2D)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px', boxShadow: '0 0 40px rgba(220,20,60,0.4), 0 0 80px rgba(220,20,60,0.15)', animation: 'breathe 3s ease-in-out infinite'}}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="white"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round"/><line x1="12" y1="19" x2="12" y2="23" stroke="white" strokeWidth="2" strokeLinecap="round"/></svg>
            </div>

            <h2 style={{fontSize: '26px', fontWeight: 800, color: 'white', letterSpacing: '-0.8px', marginBottom: '10px', lineHeight: 1.2}}>
              {hour < 12 ? `Good morning,` : hour < 17 ? `Good afternoon,` : `Good evening,`}<br/>
              <span style={{background: 'linear-gradient(135deg, #FF4060, #DC143C)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'}}>{firstName}</span>
            </h2>
            <p style={{fontSize: '15px', color: 'rgba(255,255,255,0.4)', lineHeight: 1.7, maxWidth: '280px', marginBottom: '36px'}}>
              I am Sathi — your companion. Talk to me in Nepali, English, or both. I am always here.
            </p>

            {/* Starter prompts */}
            <div style={{display: 'flex', flexDirection: 'column', gap: '8px', width: '100%', maxWidth: '340px'}}>
              <p style={{fontSize: '11px', fontWeight: 700, color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px'}}>Start with</p>
              {starters.map((s, i) => (
                <button key={i} onClick={() => sendMessage(s)}
                  style={{padding: '13px 18px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '14px', color: 'rgba(255,255,255,0.7)', fontSize: '14px', fontWeight: 500, cursor: 'pointer', fontFamily: 'Inter, sans-serif', textAlign: 'left', transition: 'all 0.2s ease', lineHeight: 1.4}}>
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Message bubbles */}
        <div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
          {messages.map((msg, i) => (
            <div key={i} style={{display: 'flex', flexDirection: msg.role === 'user' ? 'row-reverse' : 'row', gap: '10px', alignItems: 'flex-end'}}>

              {/* Avatar */}
              {msg.role === 'assistant' && (
                <div style={{width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(135deg, #DC143C, #A50E2D)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 2px 8px rgba(220,20,60,0.3)'}}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/></svg>
                </div>
              )}

              <div style={{maxWidth: '78%', display: 'flex', flexDirection: 'column', gap: '4px', alignItems: msg.role === 'user' ? 'flex-end' : 'flex-start'}}>
                <div style={{
                  padding: '13px 16px',
                  borderRadius: msg.role === 'user' ? '20px 20px 4px 20px' : '20px 20px 20px 4px',
                  background: msg.role === 'user' ? 'linear-gradient(135deg, #DC143C, #A50E2D)' : 'rgba(255,255,255,0.08)',
                  border: msg.role === 'user' ? 'none' : '1px solid rgba(255,255,255,0.1)',
                  boxShadow: msg.role === 'user' ? DS.shadow.primary : 'none',
                }}>
                  <p style={{fontSize: '15px', color: msg.role === 'user' ? 'white' : 'rgba(255,255,255,0.85)', lineHeight: 1.65, fontWeight: 400, whiteSpace: 'pre-wrap'}}>{msg.content}</p>
                </div>
                <p style={{fontSize: '10px', color: 'rgba(255,255,255,0.2)', fontWeight: 500, padding: '0 4px'}}>{formatTime(msg.time)}</p>
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {loading && (
            <div style={{display: 'flex', gap: '10px', alignItems: 'flex-end'}}>
              <div style={{width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(135deg, #DC143C, #A50E2D)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/></svg>
              </div>
              <div style={{padding: '14px 18px', borderRadius: '20px 20px 20px 4px', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)'}}>
                <div style={{display: 'flex', gap: '5px', alignItems: 'center', height: '16px'}}>
                  {[0, 1, 2].map(i => (
                    <div key={i} style={{width: '6px', height: '6px', borderRadius: '50%', background: 'rgba(255,255,255,0.4)', animation: `typingDot 1.2s ease ${i * 0.2}s infinite`}}/>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
        <div ref={bottomRef}/>
      </div>

      {/* Input */}
      <div style={{position: 'fixed', bottom: '80px', left: 0, right: 0, padding: '12px 16px', background: 'rgba(6,4,12,0.9)', backdropFilter: 'blur(20px)', borderTop: '1px solid rgba(255,255,255,0.06)', zIndex: 50}}>
        <div style={{display: 'flex', gap: '10px', alignItems: 'center', maxWidth: '600px', margin: '0 auto'}}>
          <div style={{flex: 1, position: 'relative'}}>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage()}
              placeholder="Message Sathi… Nepali or English"
              style={{width: '100%', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '24px', padding: '14px 20px', fontSize: '15px', color: 'white', outline: 'none', fontFamily: 'Inter, sans-serif', boxSizing: 'border-box', transition: 'border-color 0.2s ease'}}
              onFocus={(e) => e.target.style.borderColor = 'rgba(220,20,60,0.5)'}
              onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
            />
          </div>
          <button onClick={() => sendMessage()} disabled={!input.trim() || loading}
            style={{width: '48px', height: '48px', borderRadius: '50%', background: input.trim() && !loading ? DS.gradient.primary : 'rgba(255,255,255,0.06)', border: input.trim() && !loading ? 'none' : '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: input.trim() && !loading ? 'pointer' : 'not-allowed', flexShrink: 0, boxShadow: input.trim() && !loading ? DS.shadow.primary : 'none', transition: 'all 0.2s ease'}}>
            {loading ? (
              <div style={{width: '18px', height: '18px', border: '2px solid rgba(255,255,255,0.3)', borderTop: '2px solid white', borderRadius: '50%', animation: 'spin 0.8s linear infinite'}}/>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={input.trim() ? 'white' : 'rgba(255,255,255,0.3)'} strokeWidth="2.5" strokeLinecap="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
            )}
          </button>
        </div>
      </div>

      <style>{`
        @keyframes breathe {
          0%, 100% { transform: scale(1); box-shadow: 0 0 40px rgba(220,20,60,0.4), 0 0 80px rgba(220,20,60,0.15); }
          50% { transform: scale(1.05); box-shadow: 0 0 60px rgba(220,20,60,0.6), 0 0 100px rgba(220,20,60,0.25); }
        }
        @keyframes typingDot {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
          30% { transform: translateY(-6px); opacity: 1; }
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        input::placeholder { color: rgba(255,255,255,0.2); }
        ::-webkit-scrollbar { display: none; }
      `}</style>

      <BottomNav />
    </div>
  )
}
