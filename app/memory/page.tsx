'use client'
import { useState, useEffect, useRef } from 'react'
import { useSession } from 'next-auth/react'
import BottomNav from '../components/BottomNav'
import { DS } from '../design-system'
import { HeartIcon, CommentIcon, ShareIcon, TrashIcon, CameraIcon, SendIcon, PlusIcon } from '../components/Icons'

export default function Memory() {
  const { data: session } = useSession()
  const [posts, setPosts] = useState<any[]>([])
  const [filteredPosts, setFilteredPosts] = useState<any[]>([])
  const [activeTab, setActiveTab] = useState('All')
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
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null)
  const [deletingIds, setDeletingIds] = useState<string[]>([])

  useEffect(() => { fetchPosts() }, [])

  useEffect(() => {
    const map: any = { 'All': null, 'Care': 'Care moment', 'Services': 'Service story', 'Community': 'Community' }
    const cat = map[activeTab]
    setFilteredPosts(cat ? posts.filter(p => p.category === cat) : posts)
  }, [activeTab, posts])

  const fetchPosts = async () => {
    try {
      const res = await fetch('/api/posts')
      const data = await res.json()
      setPosts(data.posts || [])
    } catch (e) { console.error(e) }
    setLoading(false)
  }

  const handleLike = async (postId: string) => {
    if (!session?.user?.email || likingIds.includes(postId)) return
    setLikingIds(prev => [...prev, postId])
    try {
      const res = await fetch('/api/posts/like', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ postId, userEmail: session.user.email }) })
      const data = await res.json()
      if (res.ok) setPosts(prev => prev.map(p => p._id === postId ? { ...p, likes: data.likes, liked: data.liked } : p))
    } catch (e) {}
    setLikingIds(prev => prev.filter(id => id !== postId))
  }

  const handleDelete = async (postId: string) => {
    setDeletingIds(prev => [...prev, postId])
    try {
      const res = await fetch('/api/posts/delete', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ postId, userEmail: session?.user?.email }) })
      if (res.ok) { setPosts(prev => prev.filter(p => p._id !== postId)); setConfirmDelete(null) }
    } catch (e) {}
    setDeletingIds(prev => prev.filter(id => id !== postId))
  }

  const handleComment = async (postId: string) => {
    const text = commentText[postId]?.trim()
    if (!text || !session?.user?.email) return
    setSubmittingComment(prev => [...prev, postId])
    try {
      const res = await fetch('/api/posts/comment', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ postId, userEmail: session.user.email, text }) })
      const data = await res.json()
      if (res.ok) {
        setCommentText(prev => ({ ...prev, [postId]: '' }))
        setPosts(prev => prev.map(p => p._id === postId ? { ...p, comments: [...(p.comments || []), data.comment] } : p))
      }
    } catch (e) {}
    setSubmittingComment(prev => prev.filter(id => id !== postId))
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (imagesRef.current.length + files.length > 4) { setError('Maximum 4 photos'); return }
    setUploading(true)
    for (const file of files) {
      const formData = new FormData()
      formData.append('file', file)
      try {
        const res = await fetch('/api/upload', { method: 'POST', body: formData })
        const data = await res.json()
        if (data.url) { imagesRef.current = [...imagesRef.current, data.url]; setImagePreview([...imagesRef.current]) }
      } catch (e) { setError('Failed to upload') }
    }
    setUploading(false)
  }

  const handlePost = async () => {
    if (!content.trim() || !session?.user) return
    setPosting(true); setError('')
    try {
      const res = await fetch('/api/posts', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ content, category, authorEmail: session.user.email, images: [...imagesRef.current] }) })
      if (res.ok) { setContent(''); imagesRef.current = []; setImagePreview([]); setShowForm(false); fetchPosts() }
      else { const d = await res.json(); setError(d.error || 'Failed') }
    } catch (e) { setError('Something went wrong') }
    setPosting(false)
  }

  const timeAgo = (date: string) => {
    const s = Math.floor((Date.now() - new Date(date).getTime()) / 1000)
    if (s < 60) return 'just now'
    if (s < 3600) return `${Math.floor(s / 60)}m`
    if (s < 86400) return `${Math.floor(s / 3600)}h`
    return `${Math.floor(s / 86400)}d`
  }

  const initials = (name: string) => name?.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2) || 'U'

  const categoryStyle: any = {
    'Care moment': { bg: '#ECFDF5', color: '#059669', label: 'Care' },
    'Service story': { bg: '#FFFBEB', color: '#D97706', label: 'Service' },
    'Community': { bg: '#EFF6FF', color: '#2563EB', label: 'Community' },
  }

  return (
    <div style={{minHeight: '100vh', background: DS.colors.pageBg, fontFamily: 'Inter, -apple-system, sans-serif', paddingBottom: '100px'}}>

      {/* Delete modal */}
      {confirmDelete && (
        <div style={{position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 200, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', padding: '24px', backdropFilter: 'blur(4px)'}}>
          <div style={{background: 'white', borderRadius: '24px', padding: '28px 24px', width: '100%', maxWidth: '380px'}}>
            <div style={{width: '52px', height: '52px', borderRadius: '50%', background: '#FEF2F2', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px'}}>
              <TrashIcon size={24} color={DS.colors.primary} strokeWidth={2}/>
            </div>
            <h3 style={{...DS.font.h3, color: DS.colors.text1, textAlign: 'center', marginBottom: '8px'}}>Delete this moment?</h3>
            <p style={{...DS.font.bodySm, color: DS.colors.text2, textAlign: 'center', marginBottom: '24px'}}>This cannot be undone.</p>
            <div style={{display: 'flex', gap: '10px'}}>
              <button onClick={() => setConfirmDelete(null)} style={{flex: 1, padding: '14px', background: DS.colors.pageBg, border: 'none', borderRadius: DS.radius.button, fontSize: '15px', fontWeight: 700, cursor: 'pointer', fontFamily: 'Inter, sans-serif', color: DS.colors.text2}}>Cancel</button>
              <button onClick={() => handleDelete(confirmDelete)} disabled={deletingIds.includes(confirmDelete)}
                style={{flex: 1, padding: '14px', background: DS.gradient.primary, border: 'none', borderRadius: DS.radius.button, fontSize: '15px', fontWeight: 700, cursor: 'pointer', fontFamily: 'Inter, sans-serif', color: 'white', boxShadow: DS.shadow.primary}}>
                {deletingIds.includes(confirmDelete) ? 'Deleting…' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div style={{background: DS.colors.cardBg, padding: '52px 20px 0', borderBottom: `1px solid ${DS.colors.border}`, position: 'sticky', top: 0, zIndex: 50, boxShadow: '0 1px 12px rgba(0,0,0,0.04)'}}>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px'}}>
          <div>
            <h1 style={{...DS.font.h2, color: DS.colors.text1}}>Memory</h1>
            <p style={{...DS.font.caption, color: DS.colors.text3, marginTop: '3px'}}>Real moments · Real people</p>
          </div>
          <button onClick={() => setShowForm(!showForm)}
            style={{display: 'flex', alignItems: 'center', gap: '6px', padding: '10px 18px', background: showForm ? DS.colors.pageBg : DS.gradient.primary, border: showForm ? `1px solid ${DS.colors.borderStrong}` : 'none', borderRadius: DS.radius.pill, color: showForm ? DS.colors.text2 : 'white', fontSize: '13px', fontWeight: 700, cursor: 'pointer', fontFamily: 'Inter, sans-serif', boxShadow: showForm ? 'none' : DS.shadow.primary}}>
            {showForm ?
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg> :
              <PlusIcon size={14} color="white" strokeWidth={2.5}/>}
            {showForm ? 'Cancel' : 'Share'}
          </button>
        </div>
        <div style={{display: 'flex', gap: '6px', paddingBottom: '14px', overflowX: 'auto', scrollbarWidth: 'none'}}>
          {['All', 'Care', 'Services', 'Community'].map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              style={{flexShrink: 0, padding: '7px 18px', borderRadius: DS.radius.pill, border: 'none', background: activeTab === tab ? DS.colors.primary : DS.colors.pageBg, color: activeTab === tab ? 'white' : DS.colors.text3, fontSize: '13px', fontWeight: 700, cursor: 'pointer', fontFamily: 'Inter, sans-serif', transition: 'all 0.2s ease'}}>
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Compose */}
      {showForm && (
        <div style={{margin: '16px 16px 0', background: DS.colors.cardBg, borderRadius: DS.radius.card, border: `1px solid ${DS.colors.borderStrong}`, padding: '20px', boxShadow: DS.shadow.card}}>
          {error && <div style={{background: DS.colors.primaryLight, border: `1px solid ${DS.colors.primaryBorder}`, borderRadius: DS.radius.sm, padding: '10px 14px', marginBottom: '12px', fontSize: '13px', color: DS.colors.primary, fontWeight: 600}}>{error}</div>}
          {session?.user && (
            <div style={{display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px'}}>
              <div style={{width: '36px', height: '36px', borderRadius: '50%', background: DS.gradient.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '13px', fontWeight: 800, flexShrink: 0}}>{initials(session.user.name || '')}</div>
              <div>
                <p style={{...DS.font.h4, color: DS.colors.text1}}>{session.user.name}</p>
                <p style={{...DS.font.caption, color: DS.colors.text3}}>Sharing a moment</p>
              </div>
            </div>
          )}
          <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="What happened today? Share a real moment…" rows={4}
            style={{width: '100%', background: DS.colors.pageBg, border: `1px solid ${DS.colors.borderStrong}`, borderRadius: DS.radius.sm, padding: '14px', fontSize: '15px', color: DS.colors.text1, outline: 'none', fontFamily: 'Inter, sans-serif', resize: 'none', boxSizing: 'border-box', lineHeight: 1.6}}/>
          {imagePreview.length > 0 && (
            <div style={{display: 'flex', gap: '8px', marginTop: '12px', flexWrap: 'wrap'}}>
              {imagePreview.map((url, i) => (
                <div key={i} style={{position: 'relative'}}>
                  <img src={url} style={{width: '80px', height: '80px', objectFit: 'cover', borderRadius: '12px'}} alt="upload"/>
                  <button onClick={() => { imagesRef.current = imagesRef.current.filter((_, j) => j !== i); setImagePreview([...imagesRef.current]) }}
                    style={{position: 'absolute', top: '-6px', right: '-6px', width: '22px', height: '22px', borderRadius: '50%', background: DS.colors.primary, border: 'none', color: 'white', fontSize: '13px', cursor: 'pointer', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>×</button>
                </div>
              ))}
            </div>
          )}
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '14px', flexWrap: 'wrap', gap: '10px'}}>
            <div style={{display: 'flex', gap: '6px', flexWrap: 'wrap'}}>
              {['Care moment', 'Service story', 'Community'].map((cat) => (
                <button key={cat} onClick={() => setCategory(cat)}
                  style={{padding: '5px 12px', borderRadius: DS.radius.pill, border: `1.5px solid ${category === cat ? DS.colors.primary : DS.colors.borderStrong}`, background: category === cat ? DS.colors.primaryLight : 'transparent', color: category === cat ? DS.colors.primary : DS.colors.text3, fontSize: '12px', fontWeight: 700, cursor: 'pointer', fontFamily: 'Inter, sans-serif'}}>
                  {cat}
                </button>
              ))}
            </div>
            <div style={{display: 'flex', gap: '8px', alignItems: 'center'}}>
              <input ref={fileInputRef} type="file" accept="image/*" multiple onChange={handleImageUpload} style={{display: 'none'}}/>
              <button onClick={() => fileInputRef.current?.click()} disabled={uploading || imagePreview.length >= 4}
                style={{padding: '8px 14px', background: DS.colors.pageBg, border: `1px solid ${DS.colors.borderStrong}`, borderRadius: DS.radius.button, fontSize: '12px', fontWeight: 600, color: DS.colors.text2, cursor: 'pointer', fontFamily: 'Inter, sans-serif', display: 'flex', alignItems: 'center', gap: '6px'}}>
                <CameraIcon size={14} color={DS.colors.text2} strokeWidth={2}/>
                {uploading ? 'Uploading…' : 'Photo'}
              </button>
              <button onClick={handlePost} disabled={posting || !content.trim()}
                style={{padding: '10px 20px', background: !content.trim() ? 'rgba(220,20,60,0.3)' : DS.gradient.primary, border: 'none', borderRadius: DS.radius.button, fontSize: '14px', fontWeight: 800, cursor: !content.trim() ? 'not-allowed' : 'pointer', fontFamily: 'Inter, sans-serif', color: 'white', boxShadow: content.trim() ? DS.shadow.primary : 'none', display: 'flex', alignItems: 'center', gap: '6px'}}>
                <SendIcon size={14} color="white" strokeWidth={2}/>
                {posting ? 'Posting…' : 'Post'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Feed */}
      <div style={{padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px'}}>
        {loading && (
          <div style={{textAlign: 'center', padding: '60px 20px'}}>
            <div style={{width: '36px', height: '36px', border: `3px solid ${DS.colors.borderStrong}`, borderTop: `3px solid ${DS.colors.primary}`, borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 16px'}}/>
            <p style={{...DS.font.bodySm, color: DS.colors.text3}}>Loading moments…</p>
          </div>
        )}

        {!loading && filteredPosts.length === 0 && (
          <div style={{background: DS.colors.cardBg, borderRadius: DS.radius.card, border: `1px solid ${DS.colors.borderStrong}`, padding: '48px 24px', textAlign: 'center', boxShadow: DS.shadow.card}}>
            <div style={{width: '64px', height: '64px', borderRadius: '50%', background: DS.colors.primaryLight, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px'}}>
              <HeartIcon size={32} color={DS.colors.primary} strokeWidth={1.5}/>
            </div>
            <h3 style={{...DS.font.h3, color: DS.colors.text1, marginBottom: '8px'}}>No moments yet</h3>
            <p style={{...DS.font.bodySm, color: DS.colors.text3, marginBottom: '20px'}}>Be the first to share something meaningful.</p>
            <button onClick={() => setShowForm(true)}
              style={{padding: '12px 24px', background: DS.gradient.primary, border: 'none', borderRadius: DS.radius.button, color: 'white', fontWeight: 700, fontSize: '14px', cursor: 'pointer', fontFamily: 'Inter, sans-serif', boxShadow: DS.shadow.primary}}>
              Share a Moment
            </button>
          </div>
        )}

        {filteredPosts.map((post) => {
          const catStyle = categoryStyle[post.category] || categoryStyle['Community']
          const isOwn = session?.user?.email === post.authorEmail || session?.user?.name === post.authorName
          const isCommenting = openComments.includes(post._id)

          return (
            <div key={post._id} style={{background: DS.colors.cardBg, borderRadius: DS.radius.card, border: `1px solid ${DS.colors.border}`, overflow: 'hidden', boxShadow: DS.shadow.card}}>
              <div style={{display: 'flex', alignItems: 'center', gap: '12px', padding: '16px 16px 12px'}}>
                <div style={{width: '44px', height: '44px', borderRadius: '50%', background: DS.gradient.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800, fontSize: '15px', flexShrink: 0, boxShadow: DS.shadow.primary}}>
                  {initials(post.authorName)}
                </div>
                <div style={{flex: 1}}>
                  <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                    <p style={{...DS.font.h4, color: DS.colors.text1}}>{post.authorName}</p>
                    <div style={{padding: '2px 8px', borderRadius: DS.radius.pill, background: catStyle.bg}}>
                      <span style={{fontSize: '10px', fontWeight: 700, color: catStyle.color}}>{catStyle.label}</span>
                    </div>
                  </div>
                  <p style={{...DS.font.caption, color: DS.colors.text3, marginTop: '2px'}}>{timeAgo(post.createdAt)} ago</p>
                </div>
                {isOwn && (
                  <button onClick={() => setConfirmDelete(post._id)}
                    style={{width: '32px', height: '32px', borderRadius: '10px', background: '#FEF2F2', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'}}>
                    <TrashIcon size={14} color={DS.colors.primary} strokeWidth={2}/>
                  </button>
                )}
              </div>

              {post.content && <p style={{...DS.font.bodyMd, color: DS.colors.text1, lineHeight: 1.7, padding: '0 16px 14px'}}>{post.content}</p>}

              {post.images && post.images.length > 0 && (
                <div style={{padding: '0 16px 14px', display: 'flex', flexDirection: 'column', gap: '6px'}}>
                  {post.images.slice(0, 4).map((url: string, i: number) => (
                    <img key={i} src={url} alt="moment" style={{width: '100%', borderRadius: '14px', display: 'block', maxHeight: '400px', objectFit: 'cover'}}/>
                  ))}
                </div>
              )}

              <div style={{display: 'flex', borderTop: `1px solid ${DS.colors.border}`, padding: '4px 8px'}}>
                <button onClick={() => handleLike(post._id)} disabled={likingIds.includes(post._id)}
                  style={{flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', padding: '10px', border: 'none', background: 'transparent', borderRadius: '12px', cursor: 'pointer', color: post.liked ? DS.colors.primary : DS.colors.text3, fontWeight: 700, fontSize: '13px', fontFamily: 'Inter, sans-serif', transition: 'all 0.15s ease'}}>
                  <HeartIcon size={18} color={post.liked ? DS.colors.primary : DS.colors.text3} strokeWidth={2} filled={post.liked}/>
                  {post.likes > 0 && <span style={{color: post.liked ? DS.colors.primary : DS.colors.text3}}>{post.likes}</span>}
                </button>
                <button onClick={() => setOpenComments(prev => prev.includes(post._id) ? prev.filter(id => id !== post._id) : [...prev, post._id])}
                  style={{flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', padding: '10px', border: 'none', background: 'transparent', borderRadius: '12px', cursor: 'pointer', fontWeight: 700, fontSize: '13px', fontFamily: 'Inter, sans-serif', transition: 'all 0.15s ease'}}>
                  <CommentIcon size={18} color={isCommenting ? DS.colors.primary : DS.colors.text3} strokeWidth={2}/>
                  {post.comments?.length > 0 && <span style={{color: isCommenting ? DS.colors.primary : DS.colors.text3}}>{post.comments.length}</span>}
                </button>
                <button style={{flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', padding: '10px', border: 'none', background: 'transparent', borderRadius: '12px', cursor: 'pointer', fontFamily: 'Inter, sans-serif'}}>
                  <ShareIcon size={18} color={DS.colors.text3} strokeWidth={2}/>
                </button>
              </div>

              {isCommenting && (
                <div style={{borderTop: `1px solid ${DS.colors.border}`, padding: '14px 16px', background: DS.colors.pageBg}}>
                  {post.comments?.length > 0 && (
                    <div style={{display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '14px'}}>
                      {post.comments.map((c: any, i: number) => (
                        <div key={i} style={{display: 'flex', gap: '10px'}}>
                          <div style={{width: '30px', height: '30px', borderRadius: '50%', background: DS.gradient.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '10px', fontWeight: 800, flexShrink: 0}}>{initials(c.authorName)}</div>
                          <div style={{flex: 1, background: DS.colors.cardBg, borderRadius: '12px', padding: '10px 12px', border: `1px solid ${DS.colors.border}`}}>
                            <p style={{...DS.font.caption, color: DS.colors.text1, fontWeight: 700, marginBottom: '3px'}}>{c.authorName}</p>
                            <p style={{...DS.font.bodySm, color: DS.colors.text2, lineHeight: 1.5}}>{c.text}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  {!post.comments?.length && <p style={{...DS.font.bodySm, color: DS.colors.text3, textAlign: 'center', marginBottom: '12px'}}>No comments yet. Be the first.</p>}
                  <div style={{display: 'flex', gap: '8px', alignItems: 'center'}}>
                    <div style={{width: '30px', height: '30px', borderRadius: '50%', background: DS.gradient.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '10px', fontWeight: 800, flexShrink: 0}}>{initials(session?.user?.name || '')}</div>
                    <input value={commentText[post._id] || ''} onChange={(e) => setCommentText(prev => ({ ...prev, [post._id]: e.target.value }))}
                      onKeyDown={(e) => e.key === 'Enter' && handleComment(post._id)}
                      placeholder="Write a comment…"
                      style={{flex: 1, background: DS.colors.cardBg, border: `1px solid ${DS.colors.borderStrong}`, borderRadius: DS.radius.pill, padding: '10px 16px', fontSize: '13px', color: DS.colors.text1, outline: 'none', fontFamily: 'Inter, sans-serif'}}
                    />
                    <button onClick={() => handleComment(post._id)} disabled={!commentText[post._id]?.trim() || submittingComment.includes(post._id)}
                      style={{width: '36px', height: '36px', borderRadius: '50%', background: commentText[post._id]?.trim() ? DS.gradient.primary : DS.colors.pageBg, border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: commentText[post._id]?.trim() ? 'pointer' : 'not-allowed', flexShrink: 0, boxShadow: commentText[post._id]?.trim() ? DS.shadow.primary : 'none'}}>
                      <SendIcon size={14} color={commentText[post._id]?.trim() ? 'white' : DS.colors.text3} strokeWidth={2}/>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )
        })}

        {!loading && filteredPosts.length > 0 && (
          <div style={{textAlign: 'center', padding: '24px 20px'}}>
            <p style={{...DS.font.h4, color: DS.colors.text1, marginBottom: '6px'}}>You are all caught up.</p>
            <p style={{...DS.font.bodySm, color: DS.colors.text3}}>Now go call someone you love.</p>
          </div>
        )}
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        ::-webkit-scrollbar { display: none; }
      `}</style>

      <BottomNav />
    </div>
  )
}
