'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import BottomNav from '../components/BottomNav'
import { DS } from '../design-system'

export default function Search() {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const inputRef = useState<any>(null)

  const search = async (q: string) => {
    if (!q.trim()) { setResults(null); return }
    setLoading(true)
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`)
      const data = await res.json()
      setResults(data)
    } catch (e) {}
    setLoading(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
    const t = setTimeout(() => search(e.target.value), 400)
    return () => clearTimeout(t)
  }

  const initials = (name: string) => name?.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2) || 'U'

  const timeAgo = (date: string) => {
    const s = Math.floor((Date.now() - new Date(date).getTime()) / 1000)
    if (s < 3600) return `${Math.floor(s / 60)}m ago`
    if (s < 86400) return `${Math.floor(s / 3600)}h ago`
    return `${Math.floor(s / 86400)}d ago`
  }

  const suggestions = ['Elder Care', 'Yoga & Wellness', 'Cooking', 'Family Room', 'Memory', 'Sathi AI']

  return (
    <div style={{minHeight: '100vh', background: DS.colors.pageBg, fontFamily: 'Inter, -apple-system, sans-serif', paddingBottom: '100px'}}>

      {/* Header */}
      <div style={{background: DS.colors.cardBg, padding: '52px 20px 16px', borderBottom: `1px solid ${DS.colors.border}`, position: 'sticky', top: 0, zIndex: 50, boxShadow: '0 1px 12px rgba(0,0,0,0.04)'}}>
        <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
          <button onClick={() => router.back()} style={{width: '40px', height: '40px', borderRadius: DS.radius.icon, background: DS.colors.pageBg, border: `1px solid ${DS.colors.borderStrong}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0}}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={DS.colors.text2} strokeWidth="2.5" strokeLinecap="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
          </button>
          <div style={{flex: 1, position: 'relative'}}>
            <div style={{position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)'}}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={DS.colors.text3} strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            </div>
            <input autoFocus value={query} onChange={handleChange} placeholder="Search people, moments, services…"
              style={{width: '100%', background: DS.colors.pageBg, border: `1px solid ${DS.colors.borderStrong}`, borderRadius: DS.radius.pill, padding: '12px 16px 12px 44px', fontSize: '15px', color: DS.colors.text1, outline: 'none', fontFamily: 'Inter, sans-serif', boxSizing: 'border-box'}}
            />
            {loading && <div style={{position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', width: '16px', height: '16px', border: `2px solid ${DS.colors.borderStrong}`, borderTop: `2px solid ${DS.colors.primary}`, borderRadius: '50%', animation: 'spin 0.8s linear infinite'}}/>}
          </div>
        </div>
      </div>

      <div style={{padding: '16px', display: 'flex', flexDirection: 'column', gap: '20px'}}>

        {/* Suggestions */}
        {!query && (
          <div>
            <p style={{...DS.font.label, color: DS.colors.text3, marginBottom: '12px'}}>Popular Searches</p>
            <div style={{display: 'flex', flexWrap: 'wrap', gap: '8px'}}>
              {suggestions.map((s) => (
                <button key={s} onClick={() => { setQuery(s); search(s) }}
                  style={{padding: '8px 16px', background: DS.colors.cardBg, border: `1px solid ${DS.colors.borderStrong}`, borderRadius: DS.radius.pill, fontSize: '13px', fontWeight: 600, color: DS.colors.text2, cursor: 'pointer', fontFamily: 'Inter, sans-serif', boxShadow: DS.shadow.card}}>
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results */}
        {results && (
          <>
            {results.users?.length > 0 && (
              <div>
                <p style={{...DS.font.label, color: DS.colors.text3, marginBottom: '12px'}}>People</p>
                <div style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
                  {results.users.map((user: any) => (
                    <div key={user._id} style={{background: DS.colors.cardBg, borderRadius: '16px', border: `1px solid ${DS.colors.border}`, padding: '14px 16px', display: 'flex', alignItems: 'center', gap: '12px', boxShadow: DS.shadow.card}}>
                      {user.avatar ?
                        <img src={user.avatar} alt={user.name} style={{width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0}}/> :
                        <div style={{width: '48px', height: '48px', borderRadius: '50%', background: DS.gradient.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800, fontSize: '16px', flexShrink: 0, boxShadow: DS.shadow.primary}}>{initials(user.name)}</div>}
                      <div style={{flex: 1}}>
                        <p style={{...DS.font.h4, color: DS.colors.text1}}>{user.name}</p>
                        <p style={{...DS.font.caption, color: DS.colors.text3, marginTop: '2px'}}>{user.role} {user.location ? `· ${user.location}` : ''}</p>
                      </div>
                      <div style={{padding: '4px 12px', background: DS.colors.primaryLight, borderRadius: DS.radius.pill, border: `1px solid ${DS.colors.primaryBorder}`}}>
                        <span style={{fontSize: '11px', fontWeight: 700, color: DS.colors.primary}}>{user.role}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {results.posts?.length > 0 && (
              <div>
                <p style={{...DS.font.label, color: DS.colors.text3, marginBottom: '12px'}}>Moments</p>
                <div style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
                  {results.posts.map((post: any) => (
                    <div key={post._id} onClick={() => router.push('/memory')} style={{background: DS.colors.cardBg, borderRadius: '16px', border: `1px solid ${DS.colors.border}`, padding: '14px 16px', cursor: 'pointer', boxShadow: DS.shadow.card}}>
                      <div style={{display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px'}}>
                        <div style={{width: '32px', height: '32px', borderRadius: '50%', background: DS.gradient.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800, fontSize: '11px', flexShrink: 0}}>{initials(post.authorName)}</div>
                        <div style={{flex: 1}}>
                          <p style={{...DS.font.caption, color: DS.colors.text1, fontWeight: 700}}>{post.authorName}</p>
                          <p style={{fontSize: '10px', color: DS.colors.text3}}>{timeAgo(post.createdAt)}</p>
                        </div>
                      </div>
                      <p style={{...DS.font.bodySm, color: DS.colors.text2, lineHeight: 1.5}}>{post.content?.slice(0, 100)}{post.content?.length > 100 ? '…' : ''}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {results.users?.length === 0 && results.posts?.length === 0 && (
              <div style={{background: DS.colors.cardBg, borderRadius: DS.radius.card, border: `1px solid ${DS.colors.borderStrong}`, padding: '48px 24px', textAlign: 'center', boxShadow: DS.shadow.card}}>
                <div style={{fontSize: '40px', marginBottom: '12px'}}>🔍</div>
                <h3 style={{...DS.font.h3, color: DS.colors.text1, marginBottom: '8px'}}>No results for "{query}"</h3>
                <p style={{...DS.font.bodySm, color: DS.colors.text3}}>Try a different search term.</p>
              </div>
            )}
          </>
        )}
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <BottomNav />
    </div>
  )
}
