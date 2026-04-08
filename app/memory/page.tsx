'use client'
import { useState, useEffect, useRef } from 'react'
import { useSession } from 'next-auth/react'
import BottomNav from '../components/BottomNav'

export default function Memory() {
  const { data: session } = useSession()
  const [posts, setPosts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [content, setContent] = useState('')
  const [category, setCategory] = useState('Care moment')
  const [posting, setPosting] = useState(false)
  const [error, setError] = useState('')
  const [uploading, setUploading] = useState(false)
  const imagesRef = useRef<string[]>([])
  const [imagePreview, setImagePreview] = useState<string[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => { fetchPosts() }, [])

  const fetchPosts = async () => {
    try {
      const res = await fetch('/api/posts')
      const data = await res.json()
      setPosts(data.posts || [])
    } catch (e) { console.error(e) }
    setLoading(false)
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (imagesRef.current.length + files.length > 4) {
      setError('Maximum 4 photos allowed')
      return
    }
    setUploading(true)
    setError('')
    for (const file of files) {
      const formData = new FormData()
      formData.append('file', file)
      try {
        const res = await fetch('/api/upload', { method: 'POST', body: formData })
        const data = await res.json()
        if (data.url) {
          imagesRef.current = [...imagesRef.current, data.url]
          setImagePreview([...imagesRef.current])
        }
      } catch (e) { setError('Failed to upload image') }
    }
    setUploading(false)
  }

  const removeImage = (index: number) => {
    imagesRef.current = imagesRef.current.filter((_, i) => i !== index)
    setImagePreview([...imagesRef.current])
  }

  const handlePost = async () => {
    if (!content.trim()) return
    if (!session?.user) { setError('Please log in to share a moment'); return }
    setPosting(true)
    setError('')
    try {
      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content, category, authorEmail: session.user.email, images: [...imagesRef.current] }),
      })
      const data = await res.json()
      if (res.ok) {
        setContent('')
        imagesRef.current = []
        setImagePreview([])
        setShowForm(false)
        fetchPosts()
      } else { setError(data.error || 'Failed to post') }
    } catch (e) { setError('Something went wrong') }
    setPosting(false)
  }

  const timeAgo = (date: string) => {
    const s = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000)
    if (s < 60) return 'just now'
    if (s < 3600) return `${Math.floor(s / 60)}m ago`
    if (s < 86400) return `${Math.floor(s / 3600)}h ago`
    return `${Math.floor(s / 86400)}d ago`
  }

  const initials = (name: string) => name?.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2) || 'U'

  const categoryColor: any = {
    'Care moment': { bg: '#ECFDF5', color: '#059669' },
    'Service story': { bg: '#FFFBEB', color: '#D97706' },
    'Community': { bg: '#EFF6FF', color: '#2563EB' },
  }

  const renderImages = (images: string[]) => {
    if (!images || images.length === 0) return null
    return (
      <div style={{padding: '0 16px 12px', display: 'flex', flexDirection: 'column', gap: '6px'}}>
        {images.slice(0, 4).map((url, i) => (
          <img
            key={i}
            src={url}
            alt="moment"
            style={{
              width: '100%',
              height: 'auto',
              borderRadius: '12px',
              display: 'block',
              maxHeight: '500px',
              objectFit: 'contain',
              background: '#F5F6F8',
            }}
          />
        ))}
      </div>
    )
  }

  return (
    <div style={{minHeight: '100vh', background: '#F5F6F8', fontFamily: 'sans-serif', paddingBottom: '80px'}}>

      <div style={{background: 'white', padding: '52px 20px 0', borderBottom: '1px solid #F0F1F3', position: 'sticky', top: 0, zIndex: 50}}>
        <div style={{display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '12px'}}>
          <div>
            <h1 style={{fontSize: '26px', fontWeight: 800, color: '#111318', letterSpacing: '-0.5px'}}>Memory</h1>
            <p style={{fontSize: '12px', color: '#9CA3AF', marginTop: '2px', fontWeight: 500}}>Real moments · Real people</p>
          </div>
          <button onClick={() => setShowForm(!showForm)} style={{padding: '8px 14px', background: 'linear-gradient(135deg, #DC143C, #A50E2D)', border: 'none', borderRadius: '20px', color: 'white', fontSize: '12px', fontWeight: 700, cursor: 'pointer', fontFamily: 'sans-serif'}}>
            + Share
          </button>
        </div>
        <div style={{display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '12px'}}>
          {['All Moments', 'Care Stories', 'Services', 'Community'].map((tab, i) => (
            <button key={tab} style={{flexShrink: 0, padding: '7px 15px', borderRadius: '20px', border: 'none', background: i === 0 ? '#DC143C' : '#F5F6F8', color: i === 0 ? 'white' : '#6B7280', fontSize: '12px', fontWeight: 700, cursor: 'pointer', fontFamily: 'sans-serif'}}>{tab}</button>
          ))}
        </div>
      </div>

      {showForm && (
        <div style={{margin: '14px 16px 0', background: 'white', borderRadius: '20px', border: '1px solid #E9EAEC', padding: '16px'}}>
          {error && <div style={{background: '#FEF2F2', border: '1px solid rgba(220,20,60,0.2)', borderRadius: '10px', padding: '10px 14px', marginBottom: '10px', fontSize: '13px', color: '#DC143C', fontWeight: 600}}>{error}</div>}
          {session?.user && (
            <div style={{display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px'}}>
              <div style={{width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(135deg, #DC143C, #A50E2D)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '12px', fontWeight: 800}}>{initials(session.user.name || '')}</div>
              <span style={{fontSize: '14px', fontWeight: 700, color: '#111318'}}>{session.user.name}</span>
            </div>
          )}
          <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="What happened today? Share a real moment..." rows={3}
            style={{width: '100%', background: '#F5F6F8', border: '1px solid #E9EAEC', borderRadius: '12px', padding: '12px', fontSize: '14px', color: '#374151', outline: 'none', fontFamily: 'sans-serif', resize: 'none', boxSizing: 'border-box', lineHeight: 1.6}}
          />
          {imagePreview.length > 0 && (
            <div style={{display: 'flex', gap: '8px', marginTop: '10px', flexWrap: 'wrap'}}>
              {imagePreview.map((url, i) => (
                <div key={i} style={{position: 'relative', width: '72px', height: '72px'}}>
                  <img src={url} style={{width: '72px', height: '72px', objectFit: 'cover', borderRadius: '10px', border: '1px solid #E9EAEC'}} alt="upload"/>
                  <button onClick={() => removeImage(i)} style={{position: 'absolute', top: '-6px', right: '-6px', width: '20px', height: '20px', borderRadius: '50%', background: '#DC143C', border: 'none', color: 'white', fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800}}>×</button>
                </div>
              ))}
            </div>
          )}
          {imagePreview.length < 4 && (
            <div style={{marginTop: '10px'}}>
              <input ref={fileInputRef} type="file" accept="image/*" multiple onChange={handleImageUpload} style={{display: 'none'}}/>
              <button onClick={() => fileInputRef.current?.click()} disabled={uploading} style={{display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 14px', background: '#F5F6F8', border: '1px dashed #D1D5DB', borderRadius: '10px', fontSize: '12px', fontWeight: 600, color: '#6B7280', cursor: 'pointer', fontFamily: 'sans-serif'}}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                {uploading ? 'Uploading…' : `Add Photos (${imagePreview.length}/4)`}
              </button>
            </div>
          )}
          <div style={{display: 'flex', gap: '8px', marginTop: '10px', marginBottom: '12px'}}>
            {['Care moment', 'Service story', 'Community'].map((cat) => (
              <button key={cat} onClick={() => setCategory(cat)} style={{padding: '5px 10px', borderRadius: '20px', border: `1.5px solid ${category === cat ? '#DC143C' : '#E9EAEC'}`, background: category === cat ? 'rgba(220,20,60,0.08)' : 'white', color: category === cat ? '#DC143C' : '#9CA3AF', fontSize: '11px', fontWeight: 700, cursor: 'pointer', fontFamily: 'sans-serif'}}>{cat}</button>
            ))}
          </div>
          <div style={{display: 'flex', gap: '8px'}}>
            <button onClick={() => { setShowForm(false); imagesRef.current = []; setImagePreview([]); setError('') }} style={{flex: 1, padding: '11px', background: '#F5F6F8', border: 'none', borderRadius: '12px', fontSize: '13px', fontWeight: 700, cursor: 'pointer', fontFamily: 'sans-serif', color: '#6B7280'}}>Cancel</button>
            <button onClick={handlePost} disabled={posting || !content.trim()} style={{flex: 2, padding: '11px', background: posting ? 'rgba(220,20,60,0.5)' : 'linear-gradient(135deg, #DC143C, #A50E2D)', border: 'none', borderRadius: '12px', fontSize: '13px', fontWeight: 800, cursor: 'pointer', fontFamily: 'sans-serif', color: 'white'}}>
              {posting ? 'Posting…' : 'Share Moment'}
            </button>
          </div>
        </div>
      )}

      <div style={{padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: '14px'}}>
        {loading && <div style={{textAlign: 'center', padding: '40px', color: '#9CA3AF', fontSize: '14px'}}>Loading moments…</div>}
        {!loading && posts.length === 0 && (
          <div style={{background: 'white', borderRadius: '20px', border: '1px solid #E9EAEC', padding: '40px 20px', textAlign: 'center'}}>
            <div style={{fontSize: '48px', marginBottom: '12px'}}>🌱</div>
            <p style={{fontSize: '16px', fontWeight: 800, color: '#111318', marginBottom: '6px'}}>No moments yet</p>
            <p style={{fontSize: '13px', color: '#9CA3AF'}}>Be the first to share a moment.</p>
          </div>
        )}
        {posts.map((post) => (
          <div key={post._id} style={{background: 'white', borderRadius: '20px', border: '1px solid #E9EAEC', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.06)'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: '10px', padding: '14px 16px 10px'}}>
              <div style={{width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, #DC143C, #A50E2D)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800, fontSize: '14px', flexShrink: 0}}>
                {initials(post.authorName)}
              </div>
              <div style={{flex: 1}}>
                <p style={{fontSize: '14px', fontWeight: 800, color: '#111318'}}>{post.authorName}</p>
                <p style={{fontSize: '11px', color: '#9CA3AF', marginTop: '1px', fontWeight: 500}}>{timeAgo(post.createdAt)}</p>
              </div>
              <div style={{padding: '3px 9px', borderRadius: '20px', background: categoryColor[post.category]?.bg || '#F5F6F8', fontSize: '10px', fontWeight: 700, color: categoryColor[post.category]?.color || '#9CA3AF'}}>
                {post.category}
              </div>
            </div>
            {post.content && (
              <div style={{padding: '0 16px 12px', fontSize: '14px', color: '#374151', lineHeight: 1.7}}>{post.content}</div>
            )}
            {renderImages(post.images)}
            <div style={{display: 'flex', borderTop: '1px solid #F0F1F3'}}>
              <button style={{flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px', padding: '11px', border: 'none', background: 'transparent', borderRight: '1px solid #F0F1F3', cursor: 'pointer', color: '#6B7280', fontWeight: 700, fontSize: '12px', fontFamily: 'sans-serif'}}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                {post.likes || 0}
              </button>
              <button style={{flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '11px', border: 'none', background: 'transparent', cursor: 'pointer', color: '#6B7280', fontWeight: 700, fontSize: '12px', fontFamily: 'sans-serif'}}>Share</button>
            </div>
          </div>
        ))}
        {!loading && posts.length > 0 && (
          <div style={{background: 'white', borderRadius: '20px', border: '1px solid #E9EAEC', padding: '24px 20px', textAlign: 'center'}}>
            <p style={{fontSize: '16px', fontWeight: 800, color: '#111318', marginBottom: '6px'}}>You are all caught up.</p>
            <p style={{fontSize: '13px', color: '#6B7280'}}>Now go call someone you love.</p>
          </div>
        )}
      </div>
      <BottomNav />
    </div>
  )
}
