'use client'
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useTheme } from '../context/ThemeContext'
import { brand } from '../design-system'
import BottomNav from '../components/BottomNav'
import { ArrowLeftIcon, HeartIcon, CheckIcon, StarIcon } from '../components/Icons'

const MOOD_CONFIG: any = {
  happy: { label: 'Happy', emoji: '😊', color: '#10B981', bg: 'rgba(16,185,129,0.1)' },
  okay: { label: 'Okay', emoji: '😐', color: '#F59E0B', bg: 'rgba(245,158,11,0.1)' },
  concerned: { label: 'Concerned', emoji: '😟', color: '#EF4444', bg: 'rgba(239,68,68,0.1)' },
}

const CONDITION_CONFIG: any = {
  good: { label: 'Good condition', color: '#10B981' },
  some_concern: { label: 'Some concern', color: '#F59E0B' },
  needs_attention: { label: 'Needs attention', color: '#EF4444' },
}

export default function CareReports() {
  const { data: session } = useSession()
  const { t } = useTheme()
  const router = useRouter()
  const [reports, setReports] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<any>(null)
  const [rating, setRating] = useState(0)
  const [ratingNote, setRatingNote] = useState('')
  const [rated, setRated] = useState(false)

  useEffect(() => {
    if (session?.user?.email) fetchReports()
  }, [session])

  const fetchReports = async () => {
    try {
      const res = await fetch(`/api/care-report?email=${session?.user?.email}&role=family`)
      const data = await res.json()
      setReports(data.reports || [])
    } catch (e) {}
    setLoading(false)
  }

  const submitRating = async () => {
    if (!selected || !rating) return
    try {
      await fetch('/api/care-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...selected,
          rating,
          familyRatingNote: ratingNote,
        })
      })
      setRated(true)
    } catch (e) {}
  }

  const card = {
    background: t.cardBg,
    borderRadius: '20px',
    border: `1px solid ${t.border}`,
    boxShadow: t.shadow,
  }

  // Detail view
  if (selected) return (
    <div style={{ minHeight: '100vh', background: t.pageBg, fontFamily: 'Inter, sans-serif', paddingBottom: '100px', transition: 'background 0.3s ease' }}>
      <div style={{ background: t.headerBg, backdropFilter: 'blur(20px)', padding: '52px 20px 16px', borderBottom: `1px solid ${t.border}`, position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button onClick={() => { setSelected(null); setRating(0); setRated(false) }}
            style={{ width: '38px', height: '38px', borderRadius: '12px', background: t.inputBg, border: `1px solid ${t.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <ArrowLeftIcon size={18} color={t.text2} strokeWidth={2}/>
          </button>
          <div>
            <h1 style={{ fontSize: '18px', fontWeight: 800, color: t.text1 }}>Care Report</h1>
            <p style={{ fontSize: '12px', color: t.text3 }}>
              {new Date(selected.visitDate).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })}
            </p>
          </div>
        </div>
      </div>

      <div style={{ padding: '20px 16px', display: 'flex', flexDirection: 'column', gap: '14px' }}>

        {/* Mood hero */}
        <div style={{ ...card, padding: '24px', textAlign: 'center', background: MOOD_CONFIG[selected.mood]?.bg || t.cardBg, border: `1.5px solid ${MOOD_CONFIG[selected.mood]?.color || t.border}30` }}>
          <span style={{ fontSize: '56px', display: 'block', marginBottom: '12px' }}>
            {MOOD_CONFIG[selected.mood]?.emoji || '😐'}
          </span>
          <p style={{ fontSize: '22px', fontWeight: 900, color: MOOD_CONFIG[selected.mood]?.color || t.text1, marginBottom: '6px' }}>
            {selected.clientName} was {MOOD_CONFIG[selected.mood]?.label?.toLowerCase() || 'okay'} today
          </p>
          <p style={{ fontSize: '13px', color: t.text3 }}>
            Visit by {selected.companionName} · {selected.arrivalTime} – {selected.departureTime}
          </p>
        </div>

        {/* Quick stats */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
          {[
            { label: 'Medicine', value: selected.medicineTaken === 'yes' ? '✓ Taken' : selected.medicineTaken === 'no' ? '✗ Missed' : selected.medicineTaken === 'partial' ? '~ Partial' : 'N/A',
              color: selected.medicineTaken === 'yes' ? '#10B981' : selected.medicineTaken === 'no' ? '#EF4444' : '#F59E0B' },
            { label: 'Meal', value: selected.mealEaten === 'yes' ? '✓ Ate well' : selected.mealEaten === 'no' ? '✗ Did not eat' : selected.mealEaten === 'partial' ? '~ Partial' : 'N/A',
              color: selected.mealEaten === 'yes' ? '#10B981' : selected.mealEaten === 'no' ? '#EF4444' : '#F59E0B' },
            { label: 'Condition', value: CONDITION_CONFIG[selected.physicalCondition]?.label || 'Good',
              color: CONDITION_CONFIG[selected.physicalCondition]?.color || '#10B981' },
          ].map((item, i) => (
            <div key={i} style={{ ...card, padding: '14px 10px', textAlign: 'center' }}>
              <p style={{ fontSize: '11px', color: t.text3, marginBottom: '6px', fontWeight: 600 }}>{item.label}</p>
              <p style={{ fontSize: '12px', fontWeight: 700, color: item.color, lineHeight: 1.3 }}>{item.value}</p>
            </div>
          ))}
        </div>

        {/* Notes */}
        {selected.notes && (
          <div style={{ ...card, padding: '20px' }}>
            <p style={{ fontSize: '13px', fontWeight: 700, color: t.text3, textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '12px' }}>
              Notes from {selected.companionName?.split(' ')[0]}
            </p>
            <p style={{ fontSize: '14px', color: t.text1, lineHeight: 1.8, fontStyle: 'italic' }}>
              "{selected.notes}"
            </p>
          </div>
        )}

        {/* Rate this visit */}
        {!rated && !selected.rating && (
          <div style={{ ...card, padding: '20px' }}>
            <p style={{ fontSize: '15px', fontWeight: 800, color: t.text1, marginBottom: '6px' }}>Rate this visit</p>
            <p style={{ fontSize: '13px', color: t.text3, marginBottom: '16px' }}>
              Your rating helps {selected.companionName?.split(' ')[0]} improve and builds their reputation
            </p>
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '16px' }}>
              {[1, 2, 3, 4, 5].map(s => (
                <button key={s} onClick={() => setRating(s)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}>
                  <StarIcon size={36} color={s <= rating ? brand.warning : t.border} filled={s <= rating} strokeWidth={s <= rating ? 0 : 1.5}/>
                </button>
              ))}
            </div>
            {rating > 0 && (
              <>
                <textarea value={ratingNote} onChange={e => setRatingNote(e.target.value)}
                  placeholder="Optional — what did you appreciate about this visit?"
                  rows={3}
                  style={{ width: '100%', background: t.inputBg, border: `1px solid ${t.border}`, borderRadius: '12px', padding: '13px 16px', fontSize: '14px', color: t.text1, outline: 'none', fontFamily: 'Inter, sans-serif', boxSizing: 'border-box', resize: 'none', lineHeight: 1.6, marginBottom: '12px' }}/>
                <button onClick={submitRating}
                  style={{ width: '100%', padding: '14px', background: 'linear-gradient(135deg, #DC143C, #A50E2D)', border: 'none', borderRadius: '14px', color: 'white', fontSize: '14px', fontWeight: 800, cursor: 'pointer', fontFamily: 'Inter, sans-serif', boxShadow: '0 4px 16px rgba(220,20,60,0.35)' }}>
                  Submit Rating
                </button>
              </>
            )}
          </div>
        )}

        {(rated || selected.rating) && (
          <div style={{ ...card, padding: '16px', display: 'flex', alignItems: 'center', gap: '12px', background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.2)' }}>
            <CheckIcon size={20} color="#10B981" strokeWidth={2.5}/>
            <p style={{ fontSize: '14px', fontWeight: 600, color: '#10B981' }}>
              You rated this visit {rating || selected.rating} star{(rating || selected.rating) !== 1 ? 's' : ''}
            </p>
          </div>
        )}
      </div>
      <BottomNav/>
      <style>{`textarea::placeholder{color:${t.text3}}`}</style>
    </div>
  )

  // List view
  return (
    <div style={{ minHeight: '100vh', background: t.pageBg, fontFamily: 'Inter, sans-serif', paddingBottom: '100px', transition: 'background 0.3s ease' }}>
      <div style={{ background: t.headerBg, backdropFilter: 'blur(20px)', padding: '52px 20px 16px', borderBottom: `1px solid ${t.border}`, position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button onClick={() => router.back()}
            style={{ width: '38px', height: '38px', borderRadius: '12px', background: t.inputBg, border: `1px solid ${t.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <ArrowLeftIcon size={18} color={t.text2} strokeWidth={2}/>
          </button>
          <div>
            <h1 style={{ fontSize: '20px', fontWeight: 800, color: t.text1, letterSpacing: '-0.4px' }}>Care Reports</h1>
            <p style={{ fontSize: '12px', color: t.text3 }}>Daily updates from your companion</p>
          </div>
        </div>
      </div>

      <div style={{ padding: '20px 16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>

        {loading && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[1, 2, 3].map(i => (
              <div key={i} style={{ ...card, padding: '20px', display: 'flex', gap: '14px' }}>
                <div className="skeleton" style={{ width: '48px', height: '48px', borderRadius: '50%', flexShrink: 0 }}/>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div className="skeleton" style={{ height: '14px', width: '70%' }}/>
                  <div className="skeleton" style={{ height: '12px', width: '50%' }}/>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && reports.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px 24px' }}>
            <div style={{ width: '72px', height: '72px', borderRadius: '20px', background: brand.primaryLight, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
              <HeartIcon size={32} color={brand.primary} filled strokeWidth={0}/>
            </div>
            <p style={{ fontSize: '18px', fontWeight: 700, color: t.text1, marginBottom: '8px' }}>No reports yet</p>
            <p style={{ fontSize: '14px', color: t.text3, lineHeight: 1.6, maxWidth: '240px', margin: '0 auto' }}>
              After your first companion visit, daily care reports will appear here.
            </p>
          </div>
        )}

        {!loading && reports.map((report) => {
          const mood = MOOD_CONFIG[report.mood] || MOOD_CONFIG.okay
          return (
            <div key={report._id} onClick={() => setSelected(report)}
              style={{ ...card, padding: '18px', cursor: 'pointer', transition: 'all 0.2s ease' }}
              className="pressable">
              <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                <div style={{ width: '52px', height: '52px', borderRadius: '16px', background: mood.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '26px' }}>
                  {mood.emoji}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
                    <p style={{ fontSize: '15px', fontWeight: 700, color: t.text1 }}>{report.clientName}</p>
                    <p style={{ fontSize: '11px', color: t.text3 }}>
                      {new Date(report.visitDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                    </p>
                  </div>
                  <p style={{ fontSize: '13px', color: mood.color, fontWeight: 600, marginBottom: '6px' }}>
                    {mood.label} · {report.arrivalTime} – {report.departureTime}
                  </p>
                  {report.notes && (
                    <p style={{ fontSize: '13px', color: t.text3, lineHeight: 1.5 }}>
                      {report.notes.slice(0, 80)}{report.notes.length > 80 ? '…' : ''}
                    </p>
                  )}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '8px', marginTop: '14px', paddingTop: '12px', borderTop: `1px solid ${t.border}` }}>
                {[
                  { label: 'Medicine', val: report.medicineTaken },
                  { label: 'Meal', val: report.mealEaten },
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '5px', background: t.inputBg, borderRadius: '9999px', padding: '4px 10px' }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: item.val === 'yes' ? '#10B981' : item.val === 'no' ? '#EF4444' : '#F59E0B' }}/>
                    <p style={{ fontSize: '11px', color: t.text2, fontWeight: 500 }}>{item.label}: {item.val === 'na' ? 'N/A' : item.val}</p>
                  </div>
                ))}
                {report.rating && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'rgba(245,158,11,0.08)', borderRadius: '9999px', padding: '4px 10px', marginLeft: 'auto' }}>
                    <StarIcon size={12} color={brand.warning} filled strokeWidth={0}/>
                    <p style={{ fontSize: '11px', color: brand.warning, fontWeight: 700 }}>{report.rating}</p>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
      <BottomNav/>
    </div>
  )
}
