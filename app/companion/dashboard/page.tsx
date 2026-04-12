'use client'
import ModeSwitch from '../../components/ModeSwitch'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useTheme } from '../../context/ThemeContext'
import { brand } from '../../design-system'
import {
  CheckIcon, ClockIcon, LocationIcon, StarIcon,
  HeartIcon, BellIcon, CalendarIcon,
  CameraIcon, MicIcon, SparkleIcon, ArrowLeftIcon
} from '../../components/Icons'

const TODAY_JOBS = [
  {
    id: 'j1',
    clientName: 'Shanti Devi Adhikari',
    age: 74,
    address: 'Baluwatar, Kathmandu',
    time: '8:00 AM',
    duration: '30 min',
    type: 'Daily Check-in',
    notes: 'Has diabetes. Takes medicine at 8:30 AM. Son is in Vancouver — name is Rajesh. He speaks English and wants a photo update.',
    amount: 400,
    bookedBy: 'Rajesh Adhikari · Vancouver, Canada',
    color: brand.primary,
    bg: brand.primaryLight,
  },
  {
    id: 'j2',
    clientName: 'Hari Prasad Sharma',
    age: 68,
    address: 'Patan, Lalitpur',
    time: '11:00 AM',
    duration: '2 hours',
    type: 'Companionship',
    notes: 'Loves chess. Recently lost his wife. Needs someone to talk to. Speaks Nepali and some Hindi.',
    amount: 1500,
    bookedBy: 'Priya Sharma · London, UK',
    color: '#7C3AED',
    bg: 'rgba(124,58,237,0.08)',
  },
]

const UPCOMING = [
  { id: 'u1', clientName: 'Maya Gurung', time: 'Tomorrow · 9:00 AM', type: 'Medical Escort', amount: 2500, color: '#059669' },
  { id: 'u2', clientName: 'Bishnu Thapa', time: 'Thu · 8:00 AM', type: 'Daily Check-in', amount: 400, color: brand.primary },
  { id: 'u3', clientName: 'Ram Kaji Shrestha', time: 'Fri · 10:00 AM', type: 'Meal Service', amount: 1200, color: '#D97706' },
]

const TASKS = [
  'Arrived at the home safely',
  'Greeted and checked on client',
  'Verified medicine was taken',
  'Noted any health concerns',
  'Completed all assigned tasks',
  'Photo sent to family abroad',
]

type ActiveJob = typeof TODAY_JOBS[0] | null
type JobStep = 'idle' | 'checkedIn' | 'tasks' | 'update' | 'complete'

export default function CompanionDashboard() {
  const { data: session } = useSession()
  const { t, theme } = useTheme()
  const router = useRouter()
  const [tab, setTab] = useState<'today' | 'upcoming' | 'earnings'>('today')
  const [activeJob, setActiveJob] = useState<ActiveJob>(null)
  const [jobStep, setJobStep] = useState<JobStep>('idle')
  const [doneTasks, setDoneTasks] = useState<string[]>([])
  const [visitNote, setVisitNote] = useState('')

  const name = session?.user?.name || 'Companion'
  const firstName = name.split(' ')[0]
  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'

  const card = {
    background: t.cardBg,
    borderRadius: '20px' as const,
    border: `1px solid ${t.border}`,
    boxShadow: t.shadow,
    transition: 'background 0.3s ease' as const,
  }

  const toggleTask = (task: string) => {
    setDoneTasks(prev => prev.includes(task) ? prev.filter(t => t !== task) : [...prev, task])
  }

  const resetJob = () => { setActiveJob(null); setJobStep('idle'); setDoneTasks([]); setVisitNote('') }

  // ── ACTIVE JOB FLOW ──
  if (activeJob) return (
    <div style={{minHeight: '100vh', background: t.pageBg, fontFamily: 'Inter, sans-serif', paddingBottom: '40px', transition: 'background 0.3s ease'}}>

      <div style={{background: 'linear-gradient(135deg, #0E0B18, #1A0A16)', padding: '52px 20px 20px', borderBottom: '1px solid rgba(255,255,255,0.08)'}}>
        <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px'}}>
          <button onClick={resetJob} style={{width: '38px', height: '38px', borderRadius: '12px', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'}}>
            <ArrowLeftIcon size={18} color="rgba(255,255,255,0.6)" strokeWidth={2}/>
          </button>
          <div>
            <h1 style={{fontSize: '18px', fontWeight: 800, color: 'white'}}>Active Visit</h1>
            <p style={{fontSize: '12px', color: 'rgba(255,255,255,0.35)'}}>{activeJob.type} · {activeJob.time}</p>
          </div>
        </div>

        {/* Progress */}
        <div style={{display: 'flex', gap: '6px'}}>
          {['Arrived', 'Tasks', 'Update', 'Done'].map((s, i) => {
            const steps: JobStep[] = ['checkedIn', 'tasks', 'update', 'complete']
            const done = steps.slice(0, i + 1).some(step =>
              ['checkedIn','tasks','update','complete'].indexOf(step) <= ['checkedIn','tasks','update','complete'].indexOf(jobStep)
            )
            return (
              <div key={s} style={{flex: 1}}>
                <div style={{height: '3px', background: done ? brand.primary : 'rgba(255,255,255,0.1)', borderRadius: '9999px', marginBottom: '4px', transition: 'background 0.3s ease'}}/>
                <p style={{fontSize: '9px', fontWeight: 600, color: done ? brand.primary : 'rgba(255,255,255,0.3)', textAlign: 'center'}}>{s}</p>
              </div>
            )
          })}
        </div>
      </div>

      <div style={{padding: '20px 16px', display: 'flex', flexDirection: 'column', gap: '14px'}}>

        {/* Client card */}
        <div style={{...card, padding: '20px'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px'}}>
            <div style={{width: '56px', height: '56px', borderRadius: '50%', background: activeJob.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800, fontSize: '18px', flexShrink: 0}}>
              {activeJob.clientName.split(' ').map(n => n[0]).join('').slice(0, 2)}
            </div>
            <div>
              <p style={{fontSize: '18px', fontWeight: 800, color: t.text1, marginBottom: '3px'}}>{activeJob.clientName}</p>
              <p style={{fontSize: '13px', color: t.text3}}>{activeJob.age} years · {activeJob.type}</p>
            </div>
          </div>

          <div style={{background: activeJob.bg, border: `1px solid ${activeJob.color}20`, borderRadius: '12px', padding: '12px', marginBottom: '12px'}}>
            <p style={{fontSize: '11px', fontWeight: 700, color: activeJob.color, textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: '6px'}}>Notes from family</p>
            <p style={{fontSize: '13px', color: t.text2, lineHeight: 1.6}}>{activeJob.notes}</p>
          </div>

          <div style={{display: 'flex', gap: '8px'}}>
            <div style={{flex: 1, background: t.inputBg, borderRadius: '10px', padding: '10px', display: 'flex', alignItems: 'center', gap: '6px'}}>
              <LocationIcon size={14} color={t.text3} strokeWidth={2}/>
              <p style={{fontSize: '12px', color: t.text2}}>{activeJob.address}</p>
            </div>
            <div style={{flex: 1, background: t.inputBg, borderRadius: '10px', padding: '10px', display: 'flex', alignItems: 'center', gap: '6px'}}>
              <ClockIcon size={14} color={t.text3} strokeWidth={2}/>
              <p style={{fontSize: '12px', color: t.text2}}>{activeJob.time}</p>
            </div>
          </div>
        </div>

        {/* Step 1 — Arrive */}
        {jobStep === 'idle' && (
          <button onClick={() => setJobStep('checkedIn')}
            style={{width: '100%', padding: '20px', background: 'linear-gradient(135deg, #DC143C, #A50E2D)', border: 'none', borderRadius: '20px', color: 'white', fontSize: '16px', fontWeight: 800, cursor: 'pointer', fontFamily: 'Inter, sans-serif', boxShadow: '0 6px 24px rgba(220,20,60,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px'}}>
            <LocationIcon size={22} color="white" strokeWidth={2}/>
            I Have Arrived — Check In
          </button>
        )}

        {/* Step 2 — Tasks */}
        {jobStep === 'checkedIn' && (
          <div style={{...card, padding: '20px'}}>
            <p style={{fontSize: '15px', fontWeight: 800, color: t.text1, marginBottom: '6px'}}>Complete your tasks</p>
            <p style={{fontSize: '13px', color: t.text3, marginBottom: '16px'}}>Tick each task as you complete it</p>
            <div style={{display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px'}}>
              {TASKS.map((task, i) => (
                <div key={i} onClick={() => toggleTask(task)}
                  style={{display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', borderRadius: '12px', background: doneTasks.includes(task) ? brand.primaryLight : t.inputBg, border: `1px solid ${doneTasks.includes(task) ? brand.primaryBorder : t.border}`, cursor: 'pointer', transition: 'all 0.2s ease'}}>
                  <div style={{width: '22px', height: '22px', borderRadius: '7px', border: `2px solid ${doneTasks.includes(task) ? brand.primary : t.border}`, background: doneTasks.includes(task) ? brand.primary : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all 0.2s ease'}}>
                    {doneTasks.includes(task) && <CheckIcon size={12} color="white" strokeWidth={2.5}/>}
                  </div>
                  <p style={{fontSize: '13px', color: doneTasks.includes(task) ? brand.primary : t.text2, fontWeight: doneTasks.includes(task) ? 700 : 400}}>{task}</p>
                </div>
              ))}
            </div>
            {doneTasks.length === TASKS.length && (
              <button onClick={() => setJobStep('tasks')}
                style={{width: '100%', padding: '14px', background: 'linear-gradient(135deg, #DC143C, #A50E2D)', border: 'none', borderRadius: '14px', color: 'white', fontSize: '14px', fontWeight: 800, cursor: 'pointer', fontFamily: 'Inter, sans-serif', boxShadow: '0 4px 16px rgba(220,20,60,0.35)'}}>
                All Tasks Done — Continue
              </button>
            )}
          </div>
        )}

        {/* Step 3 — Send update */}
        {jobStep === 'tasks' && (
          <div style={{...card, padding: '20px'}}>
            <p style={{fontSize: '15px', fontWeight: 800, color: t.text1, marginBottom: '6px'}}>Send update to family</p>
            <p style={{fontSize: '13px', color: t.text3, marginBottom: '16px'}}>
              {activeJob.bookedBy.split('·')[0].trim()} is waiting to know their loved one is okay.
            </p>
            <div style={{display: 'flex', gap: '10px', marginBottom: '16px'}}>
              {[
                { label: 'Take Photo', sub: 'Sent instantly', Icon: CameraIcon, color: brand.primary },
                { label: 'Voice Note', sub: '30 second update', Icon: MicIcon, color: '#7C3AED' },
              ].map((item, i) => (
                <button key={i} style={{flex: 1, padding: '16px', background: t.inputBg, border: `1px solid ${t.border}`, borderRadius: '14px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', cursor: 'pointer', fontFamily: 'Inter, sans-serif'}}>
                  <item.Icon size={24} color={item.color} strokeWidth={1.8}/>
                  <p style={{fontSize: '13px', fontWeight: 700, color: t.text1}}>{item.label}</p>
                  <p style={{fontSize: '11px', color: t.text3}}>{item.sub}</p>
                </button>
              ))}
            </div>
            <button onClick={() => setJobStep('update')}
              style={{width: '100%', padding: '14px', background: 'linear-gradient(135deg, #DC143C, #A50E2D)', border: 'none', borderRadius: '14px', color: 'white', fontSize: '14px', fontWeight: 800, cursor: 'pointer', fontFamily: 'Inter, sans-serif', boxShadow: '0 4px 16px rgba(220,20,60,0.35)'}}>
              Update Sent — Continue
            </button>
          </div>
        )}

        {/* Step 4 — Complete */}
        {jobStep === 'update' && (
          <div style={{...card, padding: '20px'}}>
            <p style={{fontSize: '15px', fontWeight: 800, color: t.text1, marginBottom: '6px'}}>Complete the visit</p>
            <p style={{fontSize: '13px', color: t.text3, marginBottom: '14px'}}>Leave final notes for the family about today's visit.</p>
            <textarea value={visitNote} onChange={e => setVisitNote(e.target.value)}
              placeholder="e.g. Shanti Devi was in good spirits today. She took her medicine on time. She mentioned her knee was a bit sore…"
              rows={4}
              style={{width: '100%', background: t.inputBg, border: `1px solid ${t.border}`, borderRadius: '12px', padding: '13px 16px', fontSize: '14px', color: t.text1, outline: 'none', fontFamily: 'Inter, sans-serif', boxSizing: 'border-box' as const, resize: 'none' as const, lineHeight: 1.6, marginBottom: '16px', transition: 'background 0.3s ease'}}/>
            <button onClick={() => setJobStep('complete')}
              style={{width: '100%', padding: '16px', background: 'linear-gradient(135deg, #059669, #047857)', border: 'none', borderRadius: '14px', color: 'white', fontSize: '15px', fontWeight: 800, cursor: 'pointer', fontFamily: 'Inter, sans-serif', boxShadow: '0 4px 16px rgba(5,150,105,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px'}}>
              <CheckIcon size={20} color="white" strokeWidth={2.5}/>
              Mark Visit Complete
            </button>
          </div>
        )}

        {/* Completed */}
        {jobStep === 'complete' && (
          <div style={{...card, padding: '32px', textAlign: 'center'}}>
            <div style={{width: '72px', height: '72px', borderRadius: '50%', background: 'linear-gradient(135deg, #059669, #047857)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', boxShadow: '0 6px 24px rgba(5,150,105,0.4)', animation: 'breathe 2s ease infinite'}}>
              <CheckIcon size={34} color="white" strokeWidth={2.5}/>
            </div>
            <p style={{fontSize: '22px', fontWeight: 800, color: t.text1, marginBottom: '6px'}}>Visit Complete!</p>
            <p style={{fontSize: '14px', color: t.text3, marginBottom: '6px'}}>Great work today.</p>
            <p style={{fontSize: '16px', fontWeight: 800, color: '#059669', marginBottom: '24px'}}>NPR {activeJob.amount.toLocaleString()} will be credited within 24 hours</p>
            <button onClick={resetJob}
              style={{padding: '12px 32px', background: 'linear-gradient(135deg, #DC143C, #A50E2D)', border: 'none', borderRadius: '14px', color: 'white', fontSize: '14px', fontWeight: 800, cursor: 'pointer', fontFamily: 'Inter, sans-serif', boxShadow: '0 4px 16px rgba(220,20,60,0.35)'}}>
              Back to Dashboard
            </button>
          </div>
        )}
      </div>
      <style>{`textarea::placeholder{color:${t.text3}}@keyframes breathe{0%,100%{transform:scale(1)}50%{transform:scale(1.05)}}::-webkit-scrollbar{display:none}`}</style>
    </div>
  )

  // ── MAIN DASHBOARD ──
  return (
    <div style={{minHeight: '100vh', background: t.pageBg, fontFamily: 'Inter, sans-serif', paddingBottom: '40px', transition: 'background 0.3s ease'}}>

      {/* Header */}
      <div style={{background: 'linear-gradient(135deg, #0E0B18 0%, #1A0A16 50%, #0A0E1A 100%)', padding: '52px 20px 24px', position: 'relative', overflow: 'hidden'}}>
        <div style={{position: 'absolute', top: '-50px', right: '-30px', width: '180px', height: '180px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(220,20,60,0.18), transparent 70%)', pointerEvents: 'none'}}/>
        <div style={{position: 'relative', zIndex: 1}}>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px'}}>
            <div>
              <p style={{fontSize: '11px', color: 'rgba(255,255,255,0.35)', fontWeight: 600, marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.5px'}}>Companion Dashboard</p>
              <h1 style={{fontSize: '24px', fontWeight: 900, color: 'white', letterSpacing: '-0.8px'}}>{greeting}, {firstName}</h1>
            </div>
            <div style={{display: 'flex', gap: '10px', alignItems: 'center'}}>
              <button style={{width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'}}>
                <BellIcon size={18} color="rgba(255,255,255,0.6)" strokeWidth={1.8}/>
              </button>
              <div style={{width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, #DC143C, #A50E2D)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800, fontSize: '14px', boxShadow: '0 4px 16px rgba(220,20,60,0.4)'}}>
                {name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)}
              </div>
            </div>
          </div>

          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px'}}>
            {[
              { label: "Today's visits", value: TODAY_JOBS.length.toString(), color: brand.primary },
              { label: 'This week', value: 'NPR 6,100', color: '#22C55E' },
              { label: 'Rating', value: '4.9 ★', color: '#F59E0B' },
            ].map((s, i) => (
              <div key={i} style={{background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '14px', padding: '12px 10px', textAlign: 'center'}}>
                <p style={{fontSize: '16px', fontWeight: 800, color: s.color, marginBottom: '3px'}}>{s.value}</p>
                <p style={{fontSize: '10px', color: 'rgba(255,255,255,0.35)', fontWeight: 600}}>{s.label}</p>
              </div>
            ))}
          </div>
          <div style={{marginTop: "14px"}}><ModeSwitch/></div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{background: t.headerBg, backdropFilter: 'blur(20px)', padding: '12px 16px', borderBottom: `1px solid ${t.border}`, position: 'sticky', top: 0, zIndex: 50}}>
        <div style={{display: 'flex', background: t.inputBg, borderRadius: '14px', padding: '4px', gap: '2px'}}>
          {(['today', 'upcoming', 'earnings'] as const).map((tabItem) => (
            <button key={tabItem} onClick={() => setTab(tabItem)}
              style={{flex: 1, padding: '10px 6px', borderRadius: '10px', border: 'none', background: tab === tabItem ? 'linear-gradient(135deg, #DC143C, #A50E2D)' : 'transparent', color: tab === tabItem ? 'white' : t.text3, fontSize: '13px', fontWeight: 700, cursor: 'pointer', fontFamily: 'Inter, sans-serif', transition: 'all 0.2s ease', boxShadow: tab === tabItem ? '0 2px 8px rgba(220,20,60,0.3)' : 'none'}}>
              {tabItem === 'today' ? "Today" : tabItem === 'upcoming' ? 'Upcoming' : 'Earnings'}
            </button>
          ))}
        </div>
      </div>

      <div style={{padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px'}}>

        {/* TODAY */}
        {tab === 'today' && (
          <>
            {TODAY_JOBS.length === 0 && (
              <div style={{...card, padding: '48px 24px', textAlign: 'center'}}>
                <div style={{width: '60px', height: '60px', borderRadius: '50%', background: brand.primaryLight, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px'}}>
                  <CalendarIcon size={28} color={brand.primary} strokeWidth={1.5}/>
                </div>
                <p style={{fontSize: '16px', fontWeight: 700, color: t.text1, marginBottom: '8px'}}>No visits today</p>
                <p style={{fontSize: '13px', color: t.text3}}>New bookings will appear here automatically.</p>
              </div>
            )}

            {TODAY_JOBS.map((job) => (
              <div key={job.id} style={{...card, overflow: 'hidden'}}>
                <div style={{height: '3px', background: `linear-gradient(90deg, ${job.color}, ${job.color}80)`}}/>
                <div style={{padding: '18px'}}>
                  <div style={{display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '14px'}}>
                    <div style={{display: 'flex', gap: '12px', alignItems: 'center'}}>
                      <div style={{width: '48px', height: '48px', borderRadius: '50%', background: job.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800, fontSize: '16px', flexShrink: 0}}>
                        {job.clientName.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </div>
                      <div>
                        <p style={{fontSize: '16px', fontWeight: 800, color: t.text1, marginBottom: '2px'}}>{job.clientName}</p>
                        <p style={{fontSize: '12px', color: t.text3}}>{job.age} years · {job.type}</p>
                      </div>
                    </div>
                    <div style={{textAlign: 'right', flexShrink: 0}}>
                      <p style={{fontSize: '16px', fontWeight: 800, color: job.color}}>NPR {job.amount.toLocaleString()}</p>
                    </div>
                  </div>

                  <div style={{display: 'flex', gap: '8px', marginBottom: '14px', flexWrap: 'wrap'}}>
                    <div style={{display: 'flex', alignItems: 'center', gap: '6px', background: t.inputBg, borderRadius: '9999px', padding: '5px 12px'}}>
                      <ClockIcon size={13} color={t.text3} strokeWidth={2}/>
                      <span style={{fontSize: '12px', color: t.text2, fontWeight: 500}}>{job.time} · {job.duration}</span>
                    </div>
                    <div style={{display: 'flex', alignItems: 'center', gap: '6px', background: t.inputBg, borderRadius: '9999px', padding: '5px 12px'}}>
                      <LocationIcon size={13} color={t.text3} strokeWidth={2}/>
                      <span style={{fontSize: '12px', color: t.text2, fontWeight: 500}}>{job.address.split(',')[0]}</span>
                    </div>
                  </div>

                  <div style={{background: job.bg, border: `1px solid ${job.color}20`, borderRadius: '12px', padding: '12px', marginBottom: '14px'}}>
                    <p style={{fontSize: '11px', fontWeight: 700, color: job.color, textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: '5px'}}>Notes from family abroad</p>
                    <p style={{fontSize: '12px', color: t.text2, lineHeight: 1.6}}>{job.notes}</p>
                    <p style={{fontSize: '11px', color: t.text3, marginTop: '8px', fontStyle: 'italic'}}>Booked by {job.bookedBy}</p>
                  </div>

                  <button onClick={() => setActiveJob(job)}
                    style={{width: '100%', padding: '14px', background: 'linear-gradient(135deg, #DC143C, #A50E2D)', border: 'none', borderRadius: '14px', color: 'white', fontSize: '14px', fontWeight: 800, cursor: 'pointer', fontFamily: 'Inter, sans-serif', boxShadow: '0 4px 16px rgba(220,20,60,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'}}>
                    <CheckIcon size={16} color="white" strokeWidth={2.5}/>
                    Start This Visit
                  </button>
                </div>
              </div>
            ))}
          </>
        )}

        {/* UPCOMING */}
        {tab === 'upcoming' && (
          <>
            <div style={{...card, padding: '16px', display: 'flex', alignItems: 'center', gap: '12px'}}>
              <div style={{width: '38px', height: '38px', borderRadius: '12px', background: brand.primaryLight, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>
                <CalendarIcon size={18} color={brand.primary} strokeWidth={1.8}/>
              </div>
              <div>
                <p style={{fontSize: '14px', fontWeight: 700, color: t.text1}}>{UPCOMING.length} upcoming visits</p>
                <p style={{fontSize: '12px', color: t.text3}}>Next 7 days · NPR {UPCOMING.reduce((s, j) => s + j.amount, 0).toLocaleString()} potential earnings</p>
              </div>
            </div>

            {UPCOMING.map((job) => (
              <div key={job.id} style={{...card, padding: '16px', display: 'flex', alignItems: 'center', gap: '14px'}}>
                <div style={{width: '46px', height: '46px', borderRadius: '14px', background: `${job.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>
                  <HeartIcon size={22} color={job.color} strokeWidth={1.8}/>
                </div>
                <div style={{flex: 1}}>
                  <p style={{fontSize: '15px', fontWeight: 700, color: t.text1, marginBottom: '3px'}}>{job.clientName}</p>
                  <p style={{fontSize: '12px', color: t.text3}}>{job.time} · {job.type}</p>
                </div>
                <p style={{fontSize: '14px', fontWeight: 800, color: job.color, flexShrink: 0}}>NPR {job.amount.toLocaleString()}</p>
              </div>
            ))}
          </>
        )}

        {/* EARNINGS */}
        {tab === 'earnings' && (
          <>
            <div style={{background: 'linear-gradient(135deg, #0E0B18, #1A0A16)', borderRadius: '20px', padding: '22px', border: '1px solid rgba(255,255,255,0.06)', boxShadow: '0 4px 20px rgba(0,0,0,0.2)'}}>
              <p style={{fontSize: '11px', fontWeight: 700, color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '10px'}}>This Week</p>
              <p style={{fontSize: '36px', fontWeight: 900, color: 'white', letterSpacing: '-2px', marginBottom: '4px'}}>NPR 6,100</p>
              <p style={{fontSize: '13px', color: 'rgba(255,255,255,0.4)'}}>4 visits completed · Payout on Sunday</p>
              <div style={{marginTop: '16px', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', gap: '24px'}}>
                {[{ label: 'This month', value: 'NPR 22,400' }, { label: 'Total earned', value: 'NPR 1,24,800' }].map((s, i) => (
                  <div key={i}>
                    <p style={{fontSize: '10px', color: 'rgba(255,255,255,0.3)', marginBottom: '3px'}}>{s.label}</p>
                    <p style={{fontSize: '16px', fontWeight: 800, color: 'white'}}>{s.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div style={{...card, overflow: 'hidden'}}>
              <div style={{padding: '16px 16px 8px'}}>
                <p style={{fontSize: '13px', fontWeight: 700, color: t.text3, textTransform: 'uppercase', letterSpacing: '0.8px'}}>Recent Payouts</p>
              </div>
              {[
                { date: 'Sun 12 Jan', amount: 6100, visits: 4 },
                { date: 'Sun 5 Jan', amount: 5600, visits: 3 },
                { date: 'Sun 29 Dec', amount: 7200, visits: 5 },
              ].map((p, i) => (
                <div key={i} style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', borderTop: `1px solid ${t.border}`}}>
                  <div>
                    <p style={{fontSize: '14px', fontWeight: 700, color: t.text1, marginBottom: '2px'}}>{p.date}</p>
                    <p style={{fontSize: '12px', color: t.text3}}>{p.visits} visits</p>
                  </div>
                  <div style={{textAlign: 'right'}}>
                    <p style={{fontSize: '15px', fontWeight: 800, color: '#059669'}}>NPR {p.amount.toLocaleString()}</p>
                    <div style={{display: 'inline-flex', alignItems: 'center', gap: '4px', background: 'rgba(5,150,105,0.08)', borderRadius: '9999px', padding: '2px 8px'}}>
                      <CheckIcon size={10} color="#059669" strokeWidth={2.5}/>
                      <span style={{fontSize: '10px', fontWeight: 700, color: '#059669'}}>Paid</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{...card, padding: '22px'}}>
              <p style={{fontSize: '15px', fontWeight: 800, color: t.text1, marginBottom: '16px'}}>My Performance</p>
              {[
                { label: 'Overall rating', value: '4.9', unit: '/ 5', color: '#F59E0B' },
                { label: 'Visits completed', value: '312', unit: 'total', color: brand.primary },
                { label: 'On-time rate', value: '98%', unit: '', color: '#059669' },
                { label: 'Response rate', value: '100%', unit: '', color: '#7C3AED' },
              ].map((m, i) => (
                <div key={i} style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderBottom: i < 3 ? `1px solid ${t.border}` : 'none'}}>
                  <p style={{fontSize: '14px', color: t.text2}}>{m.label}</p>
                  <div style={{display: 'flex', alignItems: 'baseline', gap: '4px'}}>
                    <p style={{fontSize: '18px', fontWeight: 900, color: m.color, letterSpacing: '-0.5px'}}>{m.value}</p>
                    {m.unit && <p style={{fontSize: '12px', color: t.text3}}>{m.unit}</p>}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      <style>{`::-webkit-scrollbar{display:none}textarea::placeholder{color:${t.text3}}`}</style>
    </div>
  )
}
