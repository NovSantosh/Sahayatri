'use client'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { DS } from '../design-system'
import { SearchIcon, ProfileIcon, HeartIcon } from './Icons'

export default function InlineSearch() {
  const router = useRouter()
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
        setFocused(false)
        setResults(null)
        setQuery('')
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
      const data = await res.json()
      setResults(data)
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

  const timeAgo = (date: string) => {
    const s = Math.floor((Date.now() - new Date(date).getTime()) / 1000)
    if (s < 3600) return `${Math.floor(s / 60)}m ago`
    if (s < 86400) return `${Math.floor(s / 3600)}h ago`
    return `${Math.floor(s / 86400)}d ago`
  }

  const hasResults = results && (results.users?.length > 0 || results.posts?.length > 0)
  const showDropdown = focused && query.length > 0

  return (
    <div ref={containerRef} style={{position: 'relative', zIndex: 100}}>
      {/* Search Input */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        background: focused ? DS.colors.cardBg : DS.colors.pageBg,
        border: `1.5px solid ${focused ? DS.colors.primary : DS.colors.borderStrong}`,
        borderRadius: DS.radius.pill,
        padding: '11px 18px',
        transition: 'all 0.2s ease',
        boxShadow: focused ? `0 0 0 3px ${DS.colors.primaryLight}` : 'none',
      }}>
        <SearchIcon size={16} color={focused ? DS.colors.primary : DS.colors.text3} strokeWidth={2}/>
        <input
          ref={inputRef}
          value={query}
          onChange={handleChange}
          onFocus={() => setFocused(true)}
          placeholder="Search companions, moments, services…"
          style={{
            flex: 1,
            background: 'transparent',
            border: 'none',
            outline: 'none',
            fontSize: '14px',
            color: DS.colors.text1,
            fontFamily: 'Inter, sans-serif',
            fontWeight: 400,
          }}
        />
        {loading && (
          <div style={{width: '16px', height: '16px', border: `2px solid ${DS.colors.borderStrong}`, borderTop: `2px solid ${DS.colors.primary}`, borderRadius: '50%', animation: 'spin 0.8s linear infinite', flexShrink: 0}}/>
        )}
        {query && !loading && (
          <button onClick={() => { setQuery(''); setResults(null); inputRef.current?.focus() }}
            style={{background: DS.colors.borderStrong, border: 'none', borderRadius: '50%', width: '18px', height: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0}}>
            <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke={DS.colors.text2} strokeWidth="3" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        )}
      </div>

      {/* Dropdown Results */}
      {showDropdown && (
        <div style={{
          position: 'absolute',
          top: 'calc(100% + 8px)',
          left: 0,
          right: 0,
          background: DS.colors.cardBg,
          borderRadius: '20px',
          border: `1px solid ${DS.colors.borderStrong}`,
          boxShadow: DS.shadow.elevated,
          overflow: 'hidden',
          animation: 'dropIn 0.2s ease',
        }}>
          {/* No results */}
          {!loading && results && !hasResults && (
            <div style={{padding: '32px 20px', textAlign: 'center'}}>
              <div style={{width: '48px', height: '48px', borderRadius: '50%', background: DS.colors.pageBg, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px'}}>
                <SearchIcon size={24} color={DS.colors.text3} strokeWidth={1.5}/>
              </div>
              <p style={{...DS.font.h4, color: DS.colors.text1, marginBottom: '4px'}}>No results for "{query}"</p>
              <p style={{...DS.font.caption, color: DS.colors.text3}}>Try a different search term</p>
            </div>
          )}

          {/* Loading skeleton */}
          {loading && (
            <div style={{padding: '16px'}}>
              {[1,2,3].map(i => (
                <div key={i} style={{display: 'flex', gap: '12px', alignItems: 'center', padding: '10px 0', borderBottom: i < 3 ? `1px solid ${DS.colors.border}` : 'none'}}>
                  <div style={{width: '40px', height: '40px', borderRadius: '50%', background: DS.colors.pageBg, animation: 'shimmer 1.5s ease infinite'}}/>
                  <div style={{flex: 1}}>
                    <div style={{width: '60%', height: '12px', background: DS.colors.pageBg, borderRadius: '6px', marginBottom: '6px', animation: 'shimmer 1.5s ease infinite'}}/>
                    <div style={{width: '40%', height: '10px', background: DS.colors.pageBg, borderRadius: '6px', animation: 'shimmer 1.5s ease infinite'}}/>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* People results */}
          {!loading && results?.users?.length > 0 && (
            <div>
              <div style={{padding: '12px 16px 6px', display: 'flex', alignItems: 'center', gap: '6px'}}>
                <ProfileIcon size={12} color={DS.colors.text3} strokeWidth={2}/>
                <p style={{...DS.font.label, color: DS.colors.text3, fontSize: '10px'}}>People</p>
              </div>
              {results.users.map((user: any, i: number) => (
                <div key={user._id}
                  onClick={() => { setFocused(false); setQuery(''); setResults(null) }}
                  style={{display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', borderTop: `1px solid ${DS.colors.border}`, cursor: 'pointer', transition: 'background 0.15s ease'}}
                  onMouseEnter={e => (e.currentTarget.style.background = DS.colors.pageBg)}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                  {user.avatar ?
                    <img src={user.avatar} alt={user.name} style={{width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0}}/> :
                    <div style={{width: '44px', height: '44px', borderRadius: '50%', background: DS.gradient.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800, fontSize: '15px', flexShrink: 0, boxShadow: DS.shadow.primary}}>
                      {initials(user.name)}
                    </div>}
                  <div style={{flex: 1}}>
                    <p style={{...DS.font.h4, color: DS.colors.text1}}>{user.name}</p>
                    <p style={{...DS.font.caption, color: DS.colors.text3, marginTop: '2px'}}>{user.role}{user.location ? ` · ${user.location}` : ''}</p>
                  </div>
                  <div style={{padding: '3px 10px', background: DS.colors.primaryLight, borderRadius: DS.radius.pill, border: `1px solid ${DS.colors.primaryBorder}`}}>
                    <span style={{fontSize: '10px', fontWeight: 700, color: DS.colors.primary}}>{user.role}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Moments results */}
          {!loading && results?.posts?.length > 0 && (
            <div>
              <div style={{padding: '12px 16px 6px', display: 'flex', alignItems: 'center', gap: '6px', borderTop: results?.users?.length > 0 ? `1px solid ${DS.colors.border}` : 'none'}}>
                <HeartIcon size={12} color={DS.colors.text3} strokeWidth={2}/>
                <p style={{...DS.font.label, color: DS.colors.text3, fontSize: '10px'}}>Moments</p>
              </div>
              {results.posts.slice(0, 3).map((post: any) => (
                <div key={post._id}
                  onClick={() => { router.push('/memory'); setFocused(false); setQuery(''); setResults(null) }}
                  style={{display: 'flex', gap: '12px', padding: '12px 16px', borderTop: `1px solid ${DS.colors.border}`, cursor: 'pointer', alignItems: 'flex-start', transition: 'background 0.15s ease'}}
                  onMouseEnter={e => (e.currentTarget.style.background = DS.colors.pageBg)}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                  <div style={{width: '36px', height: '36px', borderRadius: '50%', background: DS.gradient.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800, fontSize: '11px', flexShrink: 0}}>
                    {initials(post.authorName)}
                  </div>
                  <div style={{flex: 1}}>
                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px'}}>
                      <p style={{...DS.font.caption, color: DS.colors.text1, fontWeight: 700}}>{post.authorName}</p>
                      <p style={{fontSize: '10px', color: DS.colors.text3}}>{timeAgo(post.createdAt)}</p>
                    </div>
                    <p style={{...DS.font.caption, color: DS.colors.text2, lineHeight: 1.5, fontWeight: 400}}>{post.content?.slice(0, 80)}{post.content?.length > 80 ? '…' : ''}</p>
                  </div>
                  {post.images?.[0] && (
                    <img src={post.images[0]} alt="moment" style={{width: '48px', height: '48px', borderRadius: '10px', objectFit: 'cover', flexShrink: 0}}/>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Footer */}
          {hasResults && (
            <div onClick={() => { router.push(`/search?q=${encodeURIComponent(query)}`); setFocused(false) }}
              style={{padding: '12px 16px', borderTop: `1px solid ${DS.colors.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', cursor: 'pointer', background: DS.colors.pageBg}}>
              <SearchIcon size={13} color={DS.colors.primary} strokeWidth={2}/>
              <p style={{fontSize: '13px', fontWeight: 700, color: DS.colors.primary}}>See all results for "{query}"</p>
            </div>
          )}
        </div>
      )}

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes dropIn { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes shimmer { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
        input::placeholder { color: ${DS.colors.text3}; }
      `}</style>
    </div>
  )
}
