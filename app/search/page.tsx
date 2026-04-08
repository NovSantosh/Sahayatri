'use client'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import BottomNav from '../components/BottomNav'

export default function Search() {
  const [query, setQuery] = useState('')
  const [users, setUsers] = useState<any[]>([])
  const [posts, setPosts] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  useEffect(() => {
    if (query.trim().length < 2) {
      setUsers([])
      setPosts([])
      setSearched(false)
      return
    }
    const timeout = setTimeout(() => doSearch(query), 400)
    return () => clearTimeout(timeout)
  }, [query])

  const doSearch = async (q: string) => {
    setLoading(true)
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`)
      const data = await res.json()
      setUsers(data.users || [])
      setPosts(data.posts || [])
      setSearched(true)
    } catch (e) { console.error(e) }
    setLoading(false)
  }

  const initials = (name: string) => name?.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2) || 'U'

  const timeAgo = (date: string) => {
    const s = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000)
    if (s < 60) return 'just now'
    if (s < 3600) return `${Math.floor(s / 60)}m ago`
    if (s < 86400) return `${Math.floor(s / 3600)}h ago`
    return `${Math.floor(s / 86400)}d ago`
  }

  const roleColor: any = {
    FAMILY: { bg: '#EFF6FF', color: '#2563EB' },
    COMPANION: { bg: '#ECFDF5', color: '#059669' },
    PROFESSIONAL: { bg: '#FFFBEB', color: '#D97706' },
  }

  return (
    <div style={{minHeight: '100vh', background: '#F5F6F8', fontFamily: 'sans-serif', paddingBottom: '80px'}}>

      {/* Search header */}
      <div style={{background: 'white', padding: '52px 16px 12px', borderBottom: '1px solid #F0F1F3', position: 'sticky', top: 0, zIndex: 50}}>
        <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
          <button onClick={() => router.back()} style={{width: '36px', height: '36px', borderRadius: '10px', background: '#F5F6F8', border: '1px solid #E9EAEC', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0}}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4A5060" strokeWidth="2.5" strokeLinecap="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
          </button>
          <div style={{flex: 1, display: 'flex', alignItems: 'center', gap: '10px', background: '#F5F6F8', border: '1px solid #E9EAEC', borderRadius: '14px', padding: '10px 14px'}}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search people, moments, roles…"
              style={{flex: 1, border: 'none', background: 'transparent', fontSize: '15px', color: '#111318', outline: 'none', fontFamily: 'sans-serif'}}
            />
            {query.length > 0 && (
              <button onClick={() => setQuery('')} style={{border: 'none', background: 'none', cursor: 'pointer', padding: '0', display: 'flex', alignItems: 'center'}}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            )}
          </div>
        </div>
      </div>

      <div style={{padding: '16px', display: 'flex', flexDirection: 'column', gap: '20px'}}>

        {/* Empty state */}
        {!searched && !loading && (
          <div style={{textAlign: 'center', padding: '60px 20px'}}>
            <div style={{fontSize: '48px', marginBottom: '16px'}}>��</div>
            <p style={{fontSize: '18px', fontWeight: 800, color: '#111318', marginBottom: '8px'}}>Find people and moments</p>
            <p style={{fontSize: '14px', color: '#9CA3AF', lineHeight: 1.6}}>Search for companions, family members, professionals, or memory posts.</p>
            <div style={{display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center', marginTop: '20px'}}>
              {['Elder Care', 'Yoga', 'Cook', 'Companion', 'Family'].map(tag => (
                <button key={tag} onClick={() => setQuery(tag)} style={{padding: '6px 14px', borderRadius: '20px', border: '1px solid #E9EAEC', background: 'white', fontSize: '12px', fontWeight: 600, color: '#374151', cursor: 'pointer', fontFamily: 'sans-serif'}}>
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div style={{textAlign: 'center', padding: '40px', color: '#9CA3AF', fontSize: '14px'}}>Searching…</div>
        )}

        {/* No results */}
        {searched && !loading && users.length === 0 && posts.length === 0 && (
          <div style={{textAlign: 'center', padding: '60px 20px'}}>
            <div style={{fontSize: '48px', marginBottom: '16px'}}>😔</div>
            <p style={{fontSize: '18px', fontWeight: 800, color: '#111318', marginBottom: '8px'}}>No results for "{query}"</p>
            <p style={{fontSize: '14px', color: '#9CA3AF'}}>Try a different search term.</p>
          </div>
        )}

        {/* People results */}
        {users.length > 0 && (
          <div>
            <p style={{fontSize: '13px', fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '10px'}}>People ({users.length})</p>
            <div style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
              {users.map((user) => (
                <div key={user._id} style={{background: 'white', borderRadius: '16px', border: '1px solid #E9EAEC', padding: '14px 16px', display: 'flex', alignItems: 'center', gap: '12px', boxShadow: '0 1px 2px rgba(0,0,0,0.04)'}}>
                  <div style={{width: '44px', height: '44px', borderRadius: '50%', background: 'linear-gradient(135deg, #DC143C, #A50E2D)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800, fontSize: '16px', flexShrink: 0}}>
                    {initials(user.name)}
                  </div>
                  <div style={{flex: 1}}>
                    <p style={{fontSize: '15px', fontWeight: 800, color: '#111318'}}>{user.name}</p>
                    {user.location && <p style={{fontSize: '12px', color: '#9CA3AF', marginTop: '2px'}}>{user.location}</p>}
                  </div>
                  <div style={{padding: '4px 10px', borderRadius: '20px', background: roleColor[user.role]?.bg || '#F5F6F8', fontSize: '10px', fontWeight: 700, color: roleColor[user.role]?.color || '#9CA3AF'}}>
                    {user.role}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Post results */}
        {posts.length > 0 && (
          <div>
            <p style={{fontSize: '13px', fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '10px'}}>Moments ({posts.length})</p>
            <div style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
              {posts.map((post) => (
                <div key={post._id} style={{background: 'white', borderRadius: '16px', border: '1px solid #E9EAEC', overflow: 'hidden', boxShadow: '0 1px 2px rgba(0,0,0,0.04)'}}>
                  <div style={{display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 14px 8px'}}>
                    <div style={{width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg, #DC143C, #A50E2D)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800, fontSize: '12px', flexShrink: 0}}>
                      {initials(post.authorName)}
                    </div>
                    <div style={{flex: 1}}>
                      <p style={{fontSize: '13px', fontWeight: 700, color: '#111318'}}>{post.authorName}</p>
                      <p style={{fontSize: '11px', color: '#9CA3AF'}}>{timeAgo(post.createdAt)}</p>
                    </div>
                  </div>
                  <div style={{padding: '0 14px 12px', fontSize: '14px', color: '#374151', lineHeight: 1.6}}>
                    {post.content.length > 120 ? post.content.slice(0, 120) + '…' : post.content}
                  </div>
                  {post.images && post.images.length > 0 && (
                    <img src={post.images[0]} alt="moment" style={{width: '100%', height: '160px', objectFit: 'cover'}}/>
                  )}
                  <div style={{padding: '8px 14px', borderTop: '1px solid #F0F1F3', display: 'flex', gap: '12px'}}>
                    <span style={{fontSize: '12px', color: '#9CA3AF', fontWeight: 500}}>❤️ {post.likes || 0}</span>
                    <span style={{fontSize: '12px', color: '#9CA3AF', fontWeight: 500}}>💬 {post.comments?.length || 0}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
      <BottomNav />
    </div>
  )
}
