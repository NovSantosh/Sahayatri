'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useTheme } from '../context/ThemeContext'
import { brand } from '../design-system'
import { SearchIcon, ArrowLeftIcon, HeartIcon, StarIcon } from '../components/Icons'

export default function Search() {
  const router = useRouter()
  const { t } = useTheme()
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<any>(null)
  const [loading, setLoading] = useState(false)

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

  const card = {
    background: t.cardBg,
    borderRadius: '16px',
    border: `1px solid ${t.border}`,
    boxShadow: t.shadow,
  }

  return (
    <div style={{ minHeight: '100vh', background: t.pageBg, fontFamily: 'Inter, sans-serif', paddingBottom: '100px', transition: 'background 0.3s ease' }}>

      {/* Header */}
      <div style={{ background: t.headerBg, backdropFilter: 'blur(20px)', padding: '52px 16px 16px', borderBottom: `1px solid ${t.border}`, position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button onClick={() => router.back()}
            style={{ width: '40px', height: '40px', borderRadius: '12px', background: t.inputBg, border: `1px solid ${t.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}>
            <ArrowLeftIcon size={18} color={t.text2} strokeWidth={2}/>
          </button>
          <div style={{ flex: 1, position: 'relative' }}>
            <div style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
              <SearchIcon size={16} color={t.text3} strokeWidth={2}/>
            </div>
            <input
              autoFocus
              value={query}
              onChange={e => { setQuery(e.target.value); search(e.target.value) }}
              placeholder="Search people, moments, services…"
              style={{ width: '100%', background: t.inputBg, border: `1px solid ${t.border}`, borderRadius: '12px', padding: '12px 16px 12px 42px', fontSize: '15px', color: t.text1, outline: 'none', fontFamily: 'Inter, sans-serif', boxSizing: 'border-box', transition: 'all 0.2s ease' }}/>
          </div>
        </div>
      </div>

      <div style={{ padding: '20px 16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>

        {/* Empty state */}
        {!query && !results && (
          <div style={{ textAlign: 'center', padding: '60px 24px' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '20px', background: brand.primaryLight, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
              <SearchIcon size={28} color={brand.primary} strokeWidth={1.8}/>
            </div>
            <p style={{ fontSize: '18px', fontWeight: 700, color: t.text1, marginBottom: '8px' }}>Search Sahayatri</p>
            <p style={{ fontSize: '14px', color: t.text3, lineHeight: 1.6 }}>Find family members, memories, companions and services</p>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[1,2,3].map(i => (
              <div key={i} style={{ ...card, padding: '16px', display: 'flex', gap: '12px', alignItems: 'center' }}>
                <div className="skeleton" style={{ width: '44px', height: '44px', borderRadius: '50%', flexShrink: 0 }}/>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div className="skeleton" style={{ height: '14px', width: '60%' }}/>
                  <div className="skeleton" style={{ height: '12px', width: '40%' }}/>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Results */}
        {!loading && results && (
          <>
            {results.people?.length > 0 && (
              <div>
                <p style={{ fontSize: '11px', fontWeight: 700, color: t.text3, textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '10px' }}>People</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {results.people.map((p: any) => (
                    <div key={p._id} style={{ ...card, padding: '14px', display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
                      <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: brand.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: '16px', flexShrink: 0 }}>
                        {p.name?.[0]?.toUpperCase() || '?'}
                      </div>
                      <div>
                        <p style={{ fontSize: '15px', fontWeight: 700, color: t.text1, marginBottom: '2px' }}>{p.name}</p>
                        <p style={{ fontSize: '12px', color: t.text3 }}>{p.email}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {results.posts?.length > 0 && (
              <div>
                <p style={{ fontSize: '11px', fontWeight: 700, color: t.text3, textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '10px' }}>Moments</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {results.posts.map((p: any) => (
                    <div key={p._id} style={{ ...card, padding: '14px', cursor: 'pointer' }}>
                      <p style={{ fontSize: '14px', color: t.text1, lineHeight: 1.5 }}>{p.content?.slice(0, 100)}…</p>
                      <p style={{ fontSize: '11px', color: t.text3, marginTop: '6px' }}>{new Date(p.createdAt).toLocaleDateString()}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {!results.people?.length && !results.posts?.length && (
              <div style={{ textAlign: 'center', padding: '48px 24px' }}>
                <p style={{ fontSize: '16px', fontWeight: 700, color: t.text1, marginBottom: '8px' }}>No results for "{query}"</p>
                <p style={{ fontSize: '14px', color: t.text3 }}>Try a different search term</p>
              </div>
            )}
          </>
        )}
      </div>
      <style>{`input::placeholder{color:${t.text3}}`}</style>
    </div>
  )
}
