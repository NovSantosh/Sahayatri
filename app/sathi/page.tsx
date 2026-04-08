'use client'
import { useState, useEffect, useRef } from 'react'
import { useSession } from 'next-auth/react'
import BottomNav from '../components/BottomNav'

export default function Sathi() {
  const { data: session } = useSession()
  const [messages, setMessages] = useState<{role: string, content: string}[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const userName = session?.user?.name || 'Friend'

  useEffect(() => {
    setMessages([{
      role: 'assistant',
      content: `Namaste ${userName}! Ma Sathi chu — tapailko saathi. I am here to listen, to talk, and to remind you that distance is just a number. How are you feeling today?`
    }])
  }, [userName])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = async () => {
    if (!input.trim() || loading) return
    const userMessage = { role: 'user', content: input.trim() }
    const newMessages = [...messages, userMessage]
    setMessages(newMessages)
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/api/sathi', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages, userName }),
      })
      const data = await res.json()
      if (data.reply) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.reply }])
      }
    } catch (e) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'I am having trouble connecting. Please try again.' }])
    }
    setLoading(false)
    inputRef.current?.focus()
  }

  const suggestions = [
    'I miss my family back home',
    'I feel lonely today',
    'Tell me something comforting',
    'malai aaja man chaina',
  ]

  return (
    <div style={{minHeight: '100vh', background: '#06060F', fontFamily: 'sans-serif', display: 'flex', flexDirection: 'column', paddingBottom: '80px'}}>

      <div style={{background: 'rgba(10,10,26,0.95)', padding: '52px 20px 16px', borderBottom: '1px solid rgba(255,255,255,0.06)', backdropFilter: 'blur(20px)', position: 'sticky', top: 0, zIndex: 50}}>
        <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
          <div style={{position: 'relative'}}>
            <div style={{width: '44px', height: '44px', borderRadius: '50%', background: 'linear-gradient(135deg, #DC143C, #A50E2D)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 20px rgba(220,20,60,0.4)'}}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="white"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>
            </div>
            <div style={{position: 'absolute', bottom: '1px', right: '1px', width: '10px', height: '10px', borderRadius: '50%', background: '#22C55E', border: '2px solid #06060F'}}/>
          </div>
          <div>
            <h1 style={{fontSize: '18px', fontWeight: 800, color: 'white', letterSpacing: '-0.3px'}}>Sathi AI</h1>
            <p style={{fontSize: '11px', color: '#22C55E', fontWeight: 600, marginTop: '1px'}}>Online · Always here for you</p>
          </div>
        </div>
      </div>

      <div style={{flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px'}}>
        {messages.map((msg, i) => (
          <div key={i} style={{display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start', alignItems: 'flex-end', gap: '8px'}}>
            {msg.role === 'assistant' && (
              <div style={{width: '28px', height: '28px', borderRadius: '50%', background: 'linear-gradient(135deg, #DC143C, #A50E2D)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 0 12px rgba(220,20,60,0.3)'}}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="white"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/></svg>
              </div>
            )}
            <div style={{
              maxWidth: '75%',
              padding: '12px 16px',
              borderRadius: msg.role === 'user' ? '20px 20px 4px 20px' : '20px 20px 20px 4px',
              background: msg.role === 'user' ? 'linear-gradient(135deg, #DC143C, #A50E2D)' : 'rgba(255,255,255,0.08)',
              border: msg.role === 'assistant' ? '1px solid rgba(255,255,255,0.08)' : 'none',
              fontSize: '14px',
              color: 'white',
              lineHeight: 1.6,
              boxShadow: msg.role === 'user' ? '0 2px 12px rgba(220,20,60,0.3)' : 'none',
            }}>
              {msg.content}
            </div>
            {msg.role === 'user' && (
              <div style={{width: '28px', height: '28px', borderRadius: '50%', background: 'linear-gradient(135deg, #374151, #1F2937)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '12px', fontWeight: 800, color: 'white'}}>
                {userName.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)}
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div style={{display: 'flex', alignItems: 'flex-end', gap: '8px'}}>
            <div style={{width: '28px', height: '28px', borderRadius: '50%', background: 'linear-gradient(135deg, #DC143C, #A50E2D)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="white"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/></svg>
            </div>
            <div style={{padding: '12px 16px', borderRadius: '20px 20px 20px 4px', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', gap: '4px', alignItems: 'center'}}>
              {[0,1,2].map(i => (
                <div key={i} style={{width: '6px', height: '6px', borderRadius: '50%', background: '#DC143C', opacity: 0.7}}/>
              ))}
            </div>
          </div>
        )}
        <div ref={bottomRef}/>
      </div>

      {messages.length <= 1 && (
        <div style={{padding: '0 16px 12px', display: 'flex', gap: '8px', overflowX: 'auto'}}>
          {suggestions.map((s, i) => (
            <button key={i} onClick={() => { setInput(s); inputRef.current?.focus() }}
              style={{flexShrink: 0, padding: '8px 14px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.7)', fontSize: '12px', fontWeight: 500, cursor: 'pointer', fontFamily: 'sans-serif', whiteSpace: 'nowrap'}}>
              {s}
            </button>
          ))}
        </div>
      )}

      <div style={{padding: '12px 16px', background: 'rgba(10,10,26,0.95)', borderTop: '1px solid rgba(255,255,255,0.06)', backdropFilter: 'blur(20px)'}}>
        <div style={{display: 'flex', gap: '10px', alignItems: 'center'}}>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Talk to Sathi..."
            style={{flex: 1, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '24px', padding: '12px 18px', fontSize: '14px', color: 'white', outline: 'none', fontFamily: 'sans-serif'}}
          />
          <button onClick={sendMessage} disabled={loading || !input.trim()}
            style={{width: '44px', height: '44px', borderRadius: '50%', background: input.trim() ? 'linear-gradient(135deg, #DC143C, #A50E2D)' : 'rgba(255,255,255,0.08)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: input.trim() ? 'pointer' : 'default', flexShrink: 0, boxShadow: input.trim() ? '0 2px 12px rgba(220,20,60,0.4)' : 'none'}}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
          </button>
        </div>
      </div>

      <BottomNav />
    </div>
  )
}
