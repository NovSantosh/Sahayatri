'use client'
import { useState, useEffect, useRef } from 'react'
import { useSession } from 'next-auth/react'
import BottomNav from '../components/BottomNav'

export default function Memory() {
  const { data: session } = useSession()
  const [posts, setPosts] = useState<any[]>([])
  const [filteredPosts, setFilteredPosts] = useState<any[]>([])
  const [activeTab, setActiveTab] = useState('All Moments')
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
  const [likingIds, setLikingIds] = useState<string[]>([])
  const [openComments, setOpenComments] = useState<string[]>([])
  const [commentText, setCommentText] = useState<{[key: string]: string}>({})
  const [submittingComment, setSubmittingComment] = useState<string[]>([])
  const [deletingIds, setDeletingIds] = useState<string[]>([])
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null)

  useEffect(() => { fetchPosts() }, [])

  useEffect(() => {
    if (activeTab === 'All Moments') {
      setFilteredPosts(posts)
    } else if (activeTab === 'Care Stories') {
      setFilteredPosts(posts.filter(p => p.category === 'Care moment'))
    } else if (activeTab === 'Services') {
      setFilteredPosts(posts.filter(p => p.category === 'Service story'))
    } else if (activeTab === 'Community') {
      setFilteredPosts(posts.filter(p => p.category === 'Community'))
    }
  }, [activeTab, posts])

  const fetchPosts = async () => {
    try {
      const res = await fetch('/api/posts')
      const data = await res.json()
      setPosts(data.posts || [])
      setFilteredPosts(data.posts || [])
    } catch (e) { console.error(e) }
    setLoading(false)
  }

  const handleLike = async (postId: string) => {
    if (!session?.user?.email) return
    if (likingIds.includes(postId)) return
    setLikingIds(prev => [...prev, postId])
    try {
      const res = await fetch('/api/posts/like', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postId, userEmail: session.user.email }),
      })
      const data = await res.json()
      if (res.ok) {
        setPosts(prev => prev.map(p => p._id === postId ? { ...p, likes: data.likes, liked: data.liked } : p))
      }
    } catch (e) { console.error(e) }
    setLikingIds(prev => prev.filter(id => id !== postId))
  }

  const handleDelete = async (postId: string) => {
    if (!session?.user?.email) return
    setDeletingIds(prev => [...prev, postId])
    try {
      const res = await fetch('/api/posts/delete', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postId, userEmail: session.user.email }),
      })
      if (res.ok) {
        setPosts(prev => prev.filter(p => p._id !== postId))
        setConfirmDelete(null)
      }
    } catch (e) { console.error(e) }
    setDeletingIds(prev => prev.filter(id => id !== postId))
  }

  const handleComment = async (postId: string) => {
    if (!session?.user?.email) return
    const text = commentText[postId]?.trim()
    if (!text) return
    setSubmittingComment(prev => [...prev, postId])
    try {
      const res = await fetch('/api/posts/comment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postId, userEmail: session.user.email, text }),
      })
      const data = await res.json()
      if (res.ok) {
        setCommentText(prev => ({ ...prev, [postId]: '' }))
        setPosts(prev => prev.map(p => p._id === postId ? { ...p, comments: [...(p.comments || []), data.comment] } : p))
      }
    } catch (e) { console.error(e) }
    setSubmittingComment(prev => prev.filter(id => id !== postId))
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (imagesRef.current.length + files.length > 4) { setError('Maximum 4 photos allowed'); return }
    setUploading(true)
    setError('')
    for (const file of files) {
      const formData = new FormData()
      formData.append('file', file)
      try {
        const res = await fetch('/api/upload', { method: 'POST', body: formData })
        const data = await res.json()
        if (data.url) { imagesRef.current = [...imagesRef.current, data.url]; setImagePreview([...imagesRef.current]) }
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
    if (!session?.user) { setError('Please log in'); return }
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
        setContent(''); imagesRef.current = []; setImagePreview([]); setShowForm(false); fetchPosts()
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

  const tabs = ['All Moments', 'Care Stories', 'Services', 'Community']

  return (
    <div style={{minHeight: '100vh', background: '#F5F6F8', fontFamily: 'sans-serif', paddingBottom: '80px'}}>

      {confirmDelete && (
        <div style={{position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px'}}>
          <div style={{background: 'white', borderRadius: '20px', padding: '24px', width: '100%', maxWidth: '320px'}}>
            <h3 style={{fontSize: '18px', fontWeight: 800, color: '#111318', marginBottom: '8px'}}>Delete moment?</h3>
            <p style={{fontSize: '14px', color: '#6B7280', marginBottom: '20px', lineHeight: 1.5}}>This cannot be undone.</p>
            <div style={{display: 'flex', gap: '10px'}}>
              <button onClick={() => setConfirmDelete(null)} style={{flex: 1, padding: '12px', background: '#F5F6F8', border: 'none', borderRadius: '12px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', fontFamily: 'sans-serif', color: '#6B7280'}}>Cancel</button>
              <button onClick={() => handleDelete(confirmDelete)} disabled={deletingIds.includes(confirmDelete)}
                style={{flex: 1, padding: '12px', background: '#DC143C', border: 'none', borderRadius: '12px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', fontFamily: 'sans-serif', color: 'white'}}>
                {deletingIds.includes(confirmDelete) ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}

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
          {tabs.map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              style={{flexShrink: 0, padding: '7px 15px', borderRadius: '20px', border: 'none', background: activeTab === tab ? '#DC143C' : '#F5F6F8', color: activeTab === tab ? 'white' : '#6B7280', fontSize: '12px', fontWeight: 700, cursor: 'pointer', fontFamily: 'sans-serif'}}>
              {tab}
            </button>
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
                  <img src={url} style={{width: '72px', height: '72px', objectFit: 'cover', borderRadius: '10px'}} alt="upload"/>
                  <button onClick={() => removeImage(i)} style={{position: 'absolute', top: '-6px', right: '-6px', width: '20px', height: '20px', borderRadius: '50%', background: '#DC143C', border: 'none', color: 'white', fontSize: '12px', cursor: 'pointer', fontWeight: 800}}>x</button>
                </div>
              ))}
            </div>
          )}
          {imagePreview.length < 4 && (
            <div style={{marginTop: '10px'}}>
              <input ref={fileInputRef} type="file" accept="image/*" multiple onChange={handleImageUpload} style={{display: 'none'}}/>
              <button onClick={() => fileInputRef.current?.click()} disabled={uploading}
                style={{display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 14px', background: '#F5F6F8', border: '1px dashed #D1D5DB', borderRadius: '10px', fontSize: '12px', fontWeight: 600, color: '#6B7280', cursor: 'pointer', fontFamily: 'sans-serif'}}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                {uploading ? 'Uploading...' : `Add Photos (${imagePreview.length}/4)`}
              </button>
            </div>
          )}
          <div style={{display: 'flex', gap: '8px', marginTop: '10px', marginBottom: '12px'}}>
            {['Care moment', 'Service story', 'Community'].map((cat) => (
              <button key={cat} onClick={() => setCategory(cat)}
                style={{padding: '5px 10px', borderRadius: '20px', border: `1.5px solid ${category === cat ? '#DC143C' : '#E9EAEC'}`, background: category === cat ? 'rgba(220,20,60,0.08)' : 'white', color: category === cat ? '#DC143C' : '#9CA3AF', fontSize: '11px', fontWeight: 700, cursor: 'pointer', fontFamily: 'sans-serif'}}>
                {cat}
              </button>
            ))}
          </div>
          <div style={{display: 'flex', gap: '8px'}}>
            <button onClick={() => { setShowForm(false); imagesRef.current = []; setImagePreview([]); setError('') }}
              style={{flex: 1, padding: '11px', background: '#F5F6F8', border: 'none', borderRadius: '12px', fontSize: '13px', fontWeight: 700, cursor: 'pointer', fontFamily: 'sans-serif', color: '#6B7280'}}>Cancel</button>
            <button onClick={handlePost} disabled={posting || !content.trim()}
              style={{flex: 2, padding: '11px', background: posting ? 'rgba(220,20,60,0.5)' : 'linear-gradient(135deg, #DC143C, #A50E2D)', border: 'none', borderRadius: '12px', fontSize: '13px', fontWeight: 800, cursor: 'pointer', fontFamily: 'sans-serif', color: 'white'}}>
              {posting ? 'Posting...' : 'Share Moment'}
            </button>
          </div>
        </div>
      )}

      <div style={{padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: '14px'}}>

        {/* Empty state for filtered tabs */}
        {!loading && filteredPosts.length === 0 && activeTab !== 'All Moments' && (
          <div style={{background: 'white', borderRadius: '20px', border: '1px solid #E9EAEC', padding: '40px 20px', textAlign: 'center'}}>
            <div style={{fontSize: '40px', marginBottom: '12px'}}>
              {activeTab === 'Care Stories' ? '❤️' : activeTab === 'Services' ? '🔧' : '🤝'}
            </div>
            <p style={{fontSize: '16px', fontWeight: 800, color: '#111318', marginBottom: '6px'}}>No {activeTab} yet</p>
            <p style={{fontSize: '13px', color: '#9CA3AF', marginBottom: '16px'}}>
              {activeTab === 'Care Stories' ? 'Share a care moment with your family.' : activeTab === 'Services' ? 'Share a service story.' : 'Share something with the community.'}
            </p>
            <button onClick={() => { setCategory(activeTab === 'Care Stories' ? 'Care moment' : activeTab === 'Services' ? 'Service story' : 'Community'); setShowForm(true) }}
              style={{padding: '10px 20px', background: 'linear-gradient(135deg, #DC143C, #A50E2D)', color: 'white', border: 'none', borderRadius: '12px', fontWeight: 700, fontSize: '13px', cursor: 'pointer', fontFamily: 'sans-serif'}}>
              + Share Now
            </button>
          </div>
        )}

        {loading && <div style={{textAlign: 'center', padding: '40px', color: '#9CA3AF', fontSize: '14px'}}>Loading moments...</div>}

        {!loading && posts.length === 0 && (
          <div style={{background: 'white', borderRadius: '20px', border: '1px solid #E9EAEC', padding: '40px 20px', textAlign: 'center'}}>
            <div style={{fontSize: '48px', marginBottom: '12px'}}>🌱</div>
            <p style={{fontSize: '16px', fontWeight: 800, color: '#111318', marginBottom: '6px'}}>No moments yet</p>
            <p style={{fontSize: '13px', color: '#9CA3AF'}}>Be the first to share a moment.</p>
          </div>
        )}

        {filteredPosts.map((post) => (
          <div key={post._id} style={{background: 'white', borderRadius: '20px', border: '1px solid #E9EAEC', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.06)'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: '10px', padding: '14px 16px 10px'}}>
              <div style={{width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, #DC143C, #A50E2D)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800, fontSize: '14px', flexShrink: 0}}>
                {initials(post.authorName)}
              </div>
              <div style={{flex: 1}}>
                <p style={{fontSize: '14px', fontWeight: 800, color: '#111318'}}>{post.authorName}</p>
                <p style={{fontSize: '11px', color: '#9CA3AF', marginTop: '1px', fontWeight: 500}}>{timeAgo(post.createdAt)}</p>
              </div>
              <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                <div style={{padding: '3px 9px', borderRadius: '20px', background: categoryColor[post.category]?.bg || '#F5F6F8', fontSize: '10px', fontWeight: 700, color: categoryColor[post.category]?.color || '#9CA3AF'}}>
                  {post.category}
                </div>
                {(session?.user?.email === post.authorEmail || session?.user?.name === post.authorName) && (
                  <button onClick={() => setConfirmDelete(post._id)}
                    style={{width: '28px', height: '28px', borderRadius: '8px', background: '#FEF2F2', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'}}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#DC143C" strokeWidth="2" strokeLinecap="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/></svg>
                  </button>
                )}
              </div>
            </div>
            {post.content && <div style={{padding: '0 16px 12px', fontSize: '14px', color: '#374151', lineHeight: 1.7}}>{post.content}</div>}
            {post.images && post.images.length > 0 && (
              <div style={{padding: '0 16px 12px', display: 'flex', flexDirection: 'column', gap: '6px'}}>
                {post.images.slice(0, 4).map((url: string, i: number) => (
                  <img key={i} src={url} alt="moment" style={{width: '100%', height: 'auto', borderRadius: '12px', display: 'block', maxHeight: '500px', objectFit: 'contain', background: '#F5F6F8'}}/>
                ))}
              </div>
            )}
            <div style={{display: 'flex', borderTop: '1px solid #F0F1F3'}}>
              <button onClick={() => handleLike(post._id)} disabled={likingIds.includes(post._id)}
                style={{flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px', padding: '11px', border: 'none', background: 'transparent', borderRight: '1px solid #F0F1F3', cursor: 'pointer', color: post.liked ? '#DC143C' : '#6B7280', fontWeight: 700, fontSize: '12px', fontFamily: 'sans-serif'}}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill={post.liked ? '#DC143C' : 'none'} stroke={post.liked ? '#DC143C' : '#6B7280'} strokeWidth="2" strokeLinecap="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                {post.likes || 0}
              </button>
              <button onClick={() => setOpenComments(prev => prev.includes(post._id) ? prev.filter(id => id !== post._id) : [...prev, post._id])}
                style={{flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px', padding: '11px', border: 'none', background: 'transparent', borderRight: '1px solid #F0F1F3', cursor: 'pointer', color: openComments.includes(post._id) ? '#DC143C' : '#6B7280', fontWeight: 700, fontSize: '12px', fontFamily: 'sans-serif'}}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                {post.comments?.length || 0}
              </button>
              <button style={{flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '11px', border: 'none', background: 'transparent', cursor: 'pointer', color: '#6B7280', fontWeight: 700, fontSize: '12px', fontFamily: 'sans-serif'}}>Share</button>
            </div>
            {openComments.includes(post._id) && (
              <div style={{borderTop: '1px solid #F0F1F3', padding: '12px 16px', background: '#FAFAFA'}}>
                {post.comments && post.comments.length > 0 && (
                  <div style={{display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '12px'}}>
                    {post.comments.map((comment: any, i: number) => (
                      <div key={i} style={{display: 'flex', gap: '8px'}}>
                        <div style={{width: '28px', height: '28px', borderRadius: '50%', background: 'linear-gradient(135deg, #DC143C, #A50E2D)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '10px', fontWeight: 800, flexShrink: 0}}>
                          {initials(comment.authorName)}
                        </div>
                        <div style={{flex: 1, background: 'white', borderRadius: '10px', padding: '8px 10px', border: '1px solid #E9EAEC'}}>
                          <p style={{fontSize: '12px', fontWeight: 700, color: '#111318', marginBottom: '2px'}}>{comment.authorName}</p>
                          <p style={{fontSize: '13px', color: '#374151', lineHeight: 1.5}}>{comment.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {!post.comments?.length && <p style={{fontSize: '13px', color: '#9CA3AF', marginBottom: '12px', textAlign: 'center'}}>No comments yet.</p>}
                <div style={{display: 'flex', gap: '8px', alignItems: 'center'}}>
                  <div style={{width: '28px', height: '28px', borderRadius: '50%', background: 'linear-gradient(135deg, #DC143C, #A50E2D)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '10px', fontWeight: 800, flexShrink: 0}}>
                    {initials(session?.user?.name || '')}
                  </div>
                  <input value={commentText[post._id] || ''} onChange={(e) => setCommentText(prev => ({ ...prev, [post._id]: e.target.value }))}
                    onKeyDown={(e) => e.key === 'Enter' && handleComment(post._id)}
                    placeholder="Write a comment..."
                    style={{flex: 1, background: 'white', border: '1px solid #E9EAEC', borderRadius: '20px', padding: '8px 14px', fontSize: '13px', color: '#374151', outline: 'none', fontFamily: 'sans-serif'}}
                  />
                  <button onClick={() => handleComment(post._id)} disabled={submittingComment.includes(post._id) || !commentText[post._id]?.trim()}
                    style={{width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(135deg, #DC143C, #A50E2D)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0}}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}

        {!loading && filteredPosts.length > 0 && (
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
