'use client'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useTheme } from '../context/ThemeContext'
import { brand } from '../design-system'
import { SearchIcon, ProfileIcon, HeartIcon } from './Icons'

export default function InlineSearch() {
  const router = useRouter()
  const { t } = useTheme()
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [focused, setFocused] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const timerRef = useRef<any>(null)

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setFocused(false); setResults(null); setQuery('')
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const search = async (q: string) => {
    if (!q.trim()) { setResults(null); setLoading(false); return }
    setLoading(true)
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`)
      setResults(await res.json())
    } catch (e) {}
    setLoading(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setQuery(val)
    clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => search(val), 350)
  }

  const initials = (name: string) => name?.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2) || 'U'
  const timeAgo = (date: string) => { const s = Math.floor((Date.now() - new Date(date).getTime()) / 1000); if (s < 3600) return `${Math.floor(s / 60)}m`; if (s < 86400) return `${Math.floor(s / 3600)}h`; return `${Math.floor(s / 86400)}d` }
  const hasResults = results && (results.users?.length > 0 || results.posts?.length > 0)
  const showDropdown = focused && query.length > 0

  return (
    <div ref={containerRef} style={{position: 'relative', zIndex: 100}}>
      <div style={{display: 'flex', alignItems: 'center', gap: '10px', background: focused ? t.cardBg : t.inputBg, border: `1.5px solid ${focused ? brand.primaryBorder : t.border}`, borderRadius: '9999px', padding: '11px 18px', transition: 'all 0.2s ease', boxShadow: focused ? `0 0 0 3px ${brand.primaryLight}` : 'none'}}>
        <SearchIcon size={16} color={focused ? brand.primary : t.text3} strokeWidth={2}/>
        <input ref={inputRef} value={query} onChange={handleChange} onFocus={() => setFocused(true)}
          placeholder="Search companions, moments, services…"
          style={{flex: 1, background: 'transparent', border: 'none', outline: 'none', fontSize: '14px', color: t.text1, fontFamily: 'Inter, sans-serif'}}/>
        {loading && <div style={{width: '16px', height: '16px', border: `2px solid ${t.border}`, borderTop: `2px solid ${brand.primary}`, borderRadius: '50%', animation: 'spin 0.8s linear infinite', flexShrink: 0}}/>}
        {query && !loading && (
          <button onClick={() => { setQuery(''); setResults(null); inputRef.current?.focus() }}
            style={{background: t.border, border: 'none', borderRadius: '50%', width: '18px', height: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0}}>
            <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke={t.text2} strokeWidth="3" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        )}
      </div>

      {showDropdown && (
        <div style={{position: 'absolute', top: 'calc(100% + 8px)', left: 0, right: 0, background: t.cardBg, borderRadius: '20px', border: `1px solid ${t.borderStrong}`, boxShadow: t.shadowElevated, overflow: 'hidden', animation: 'dropIn 0.2s ease'}}>

          {!loading && results && !hasResults && (
            <div style={{padding: '28px 20px', textAlign: 'center'}}>
              <div style={{width: '44px', height: '44px', borderRadius: '50%', background: brand.primaryLight, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px'}}>
                <SearchIcon size={22} color={brand.primary} strokeWidth={1.5}/>
              </div>
              <p style={{fontSize: '14px', fontWeight: 700, color: t.text1, marginBottom: '4px'}}>No results for "{query}"</p>
              <p style={{fontSize: '12px', color: t.text3}}>Try a different term</p>
            </div>
          )}

          {loading && (
            <div style={{padding: '16px', display: 'flex', flexDirection: 'column', gap: '2px'}}>
              {[1,2].map(i => (
                <div key={i} style={{display: 'flex', gap: '12px', alignItems: 'center', padding: '10px 0', borderBottom: i < 2 ? `1px solid ${t.border}` : 'none'}}>
                  <div style={{width: '38px', height: '38px', borderRadius: '50%', background: t.cardBg2, animation: 'shimmer 1.5s ease infinite'}}/>
                  <div style={{flex: 1}}>
                    <div style={{width: '55%', height: '11px', background: t.cardBg2, borderRadius: '6px', marginBottom: '6px', animation: 'shimmer 1.5s ease infinite'}}/>
                    <div style={{width: '35%', height: '9px', background: t.cardBg2, borderRadius: '6px', animation: 'shimmer 1.5s ease infinite'}}/>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loading && results?.users?.length > 0 && (
            <div>
              <div style={{padding: '12px 16px 4px', display: 'flex', alignItems: 'center', gap: '6px'}}>
                <ProfileIcon size={11} color={t.text3} strokeWidth={2}/>
                <p style={{fontSize: '10px', fontWeight: 700, color: t.text3, textTransform: 'uppercase', letterSpacing: '0.8px'}}>People</p>
              </div>
              {results.users.map((user: any) => (
                <div key={user._id} onClick={() => { setFocused(false); setQuery(''); setResults(null) }}
                  style={{display: 'flex', alignItems: 'center', gap: '12px', padding: '11px 16px', borderTop: `1px solid ${t.border}`, cursor: 'pointer'}}
                  onMouseEnter={e => (e.currentTarget.style.background = t.cardBg2)}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                  {user.avatar
                    ? <img src={user.avatar} alt={user.name} style={{width: '38px', height: '38px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0}}/>
                    : <div style={{width: '38px', height: '38px', borderRadius: '50%', background: 'linear-gradient(135deg, #DC143C, #A50E2D)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800, fontSize: '12px', flexShrink: 0}}>{initials(user.name)}</div>}
                  <div style={{flex: 1}}>
                    <p style={{fontSize: '14px', fontWeight: 700, color: t.text1}}>{user.name}</p>
                    <p style={{fontSize: '11px', color: t.text3, marginTop: '1px'}}>{user.role}{user.location ? ` · ${user.location}` : ''}</p>
                  </div>
                  <div style={{padding: '3px 10px', background: brand.primaryLight, borderRadius: '9999px', border: `1px solid ${brand.primaryBorder}`}}>
                    <span style={{fontSize: '10px', fontWeight: 700, color: brand.primary}}>{user.role}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loading && results?.posts?.length > 0 && (
            <div>
              <div style={{padding: '12px 16px 4px', display: 'flex', alignItems: 'center', gap: '6px', borderTop: results?.users?.length > 0 ? `1px solid ${t.border}` : 'none'}}>
                <HeartIcon size={11} color={t.text3} strokeWidth={2}/>
                <p style={{fontSize: '10px', fontWeight: 700, color: t.text3, textTransform: 'uppercase', letterSpacing: '0.8px'}}>Moments</p>
              </div>
              {results.posts.slice(0, 3).map((post: any) => (
                <div key={post._id} onClick={() => { router.push('/memory'); setFocused(false); setQuery(''); setResults(null) }}
                  style={{display: 'flex', gap: '12px', padding: '11px 16px', borderTop: `1px solid ${t.border}`, cursor: 'pointer', alignItems: 'flex-start'}}
                  onMouseEnter={e => (e.currentTarget.style.background = t.cardBg2)}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                  <div style={{width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(135deg, #DC143C, #A50E2D)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800, fontSize: '10px', flexShrink: 0}}>
                    {initials(post.authorName)}
                  </div>
                  <div style={{flex: 1}}>
                    <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '3px'}}>
                      <p style={{fontSize: '12px', fontWeight: 700, color: t.text1}}>{post.authorName}</p>
                      <p style={{fontSize: '10px', color: t.text3}}>{timeAgo(post.createdAt)}</p>
                    </div>
                    <p style={{fontSize: '12px', color: t.text2, lineHeight: 1.5}}>{post.content?.slice(0, 70)}{post.content?.length > 70 ? '…' : ''}</p>
                  </div>
                  {post.images?.[0] && <img src={post.images[0]} alt="moment" style={{width: '42px', height: '42px', borderRadius: '10px', objectFit: 'cover', flexShrink: 0}}/>}
                </div>
              ))}
            </div>
          )}

          {hasResults && (
            <div onClick={() => { router.push(`/search?q=${encodeURIComponent(query)}`); setFocused(false) }}
              style={{padding: '11px 16px', borderTop: `1px solid ${t.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', cursor: 'pointer', background: t.cardBg2}}>
              <SearchIcon size={12} color={brand.primary} strokeWidth={2}/>
              <p style={{fontSize: '13px', fontWeight: 700, color: brand.primary}}>See all results for "{query}"</p>
            </div>
          )}
        </div>
      )}

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes dropIn { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes shimmer { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
        input::placeholder { color: ${t.text3}; }
      `}</style>
    </div>
  )
}
