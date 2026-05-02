import React from 'react'

// ── SHARED TYPES ──
interface IconProps {
  size?: number
  color?: string
  strokeWidth?: number
}

// ── APP LOGO ──
export const SahayatriLogo = ({ size = 32, color = 'white' }: { size?: number, color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 22L5 12L8 17L14 7L20 17L23 12L28 22Z" fill={color} opacity="0.1"/>
    <path d="M14 26C14 26 4 19 4 11C4 7 6.8 4 10.5 4C12.2 4 13.5 5 14 6.5C14.5 5 15.8 4 17.5 4C21.2 4 24 7 24 11C24 19 14 26 14 26Z" fill={color}/>
    <path d="M11 6C12 3.5 14 2 14 2C14 2 16 3.5 17 6C16 4.5 14 3.8 14 3.8C14 3.8 12 4.5 11 6Z" fill={color} opacity="0.35"/>
    <path d="M9 11.5C9 9.5 10.5 8 12 8" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.35"/>
  </svg>
)

// ── NAV ICONS — ACTIVE (filled) ──
export const HomeIconActive = ({ size = 28 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 4L3 13.5L5 13.5L5 24C5 24.6 5.4 25 6 25L11 25L11 18L17 18L17 25L22 25C22.6 25 23 24.6 23 24L23 13.5L25 13.5Z" fill="#DC143C"/>
    <path d="M11.5 25L11.5 20C11.5 18 16.5 18 16.5 20L16.5 25" fill="rgba(255,255,255,0.25)"/>
    <circle cx="14" cy="4" r="1.2" fill="#DC143C" stroke="rgba(255,255,255,0.4)" strokeWidth="0.8"/>
  </svg>
)

// ── NAV ICONS — INACTIVE (outlined) ──
export const HomeIconInactive = ({ size = 28, color = 'rgba(255,255,255,0.35)' }: { size?: number, color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 4L3 13.5L5 13.5L5 24C5 24.6 5.4 25 6 25L11 25L11 18L17 18L17 25L22 25C22.6 25 23 24.6 23 24L23 13.5L25 13.5Z" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    <path d="M11.5 25L11.5 20C11.5 18 16.5 18 16.5 20L16.5 25" stroke={color} strokeWidth="1.5" strokeLinecap="round" fill="none"/>
    <circle cx="14" cy="4" r="1" fill={color}/>
  </svg>
)

export const FamilyIconActive = ({ size = 28 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="7" cy="8" r="3.5" fill="#DC143C"/>
    <path d="M2 23C2 18.5 4.2 16 7 16C9.8 16 12 18.5 12 23Z" fill="#DC143C"/>
    <circle cx="21" cy="8" r="3.5" fill="#DC143C"/>
    <path d="M16 23C16 18.5 18.2 16 21 16C23.8 16 26 18.5 26 23Z" fill="#DC143C"/>
    <circle cx="14" cy="10" r="2.8" fill="#DC143C"/>
    <path d="M9.5 23C9.5 19.5 11.5 17.5 14 17.5C16.5 17.5 18.5 19.5 18.5 23Z" fill="#DC143C"/>
    <path d="M7 12C7 12 9 13.5 14 13.5C19 13.5 21 12 21 12" stroke="rgba(255,255,255,0.3)" strokeWidth="1.2" strokeLinecap="round" fill="none"/>
  </svg>
)

export const FamilyIconInactive = ({ size = 28, color = 'rgba(255,255,255,0.35)' }: { size?: number, color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="7" cy="8" r="3.5" stroke={color} strokeWidth="1.8" fill="none"/>
    <path d="M2 23C2 18.5 4.2 16 7 16C9.8 16 12 18.5 12 23" stroke={color} strokeWidth="1.8" strokeLinecap="round" fill="none"/>
    <circle cx="21" cy="8" r="3.5" stroke={color} strokeWidth="1.8" fill="none"/>
    <path d="M16 23C16 18.5 18.2 16 21 16C23.8 16 26 18.5 26 23" stroke={color} strokeWidth="1.8" strokeLinecap="round" fill="none"/>
    <circle cx="14" cy="10" r="2.8" stroke={color} strokeWidth="1.8" fill="none"/>
    <path d="M9.5 23C9.5 19.5 11.5 17.5 14 17.5C16.5 17.5 18.5 19.5 18.5 23" stroke={color} strokeWidth="1.8" strokeLinecap="round" fill="none"/>
  </svg>
)

export const MomentsIconActive = ({ size = 28 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="8" width="24" height="17" rx="3.5" fill="#DC143C"/>
    <path d="M10 8L10 6.5C10 5.7 10.7 5 11.5 5L16.5 5C17.3 5 18 5.7 18 6.5L18 8" fill="#DC143C" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5"/>
    <circle cx="14" cy="16.5" r="5.5" fill="rgba(0,0,0,0.2)"/>
    <circle cx="14" cy="16.5" r="3.8" fill="rgba(0,0,0,0.2)"/>
    <circle cx="14" cy="16.5" r="2" fill="#DC143C"/>
    <ellipse cx="12.5" cy="15" rx="1.2" ry="0.8" fill="rgba(255,255,255,0.5)" transform="rotate(-30 12.5 15)"/>
    <circle cx="21" cy="11" r="1.2" fill="rgba(255,255,255,0.5)"/>
  </svg>
)

export const MomentsIconInactive = ({ size = 28, color = 'rgba(255,255,255,0.35)' }: { size?: number, color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="8" width="24" height="17" rx="3.5" stroke={color} strokeWidth="1.8" fill="none"/>
    <path d="M10 8L10 6.5C10 5.7 10.7 5 11.5 5L16.5 5C17.3 5 18 5.7 18 6.5L18 8" stroke={color} strokeWidth="1.8" strokeLinecap="round" fill="none"/>
    <circle cx="14" cy="16.5" r="5.5" stroke={color} strokeWidth="1.5" fill="none"/>
    <circle cx="14" cy="16.5" r="2.5" stroke={color} strokeWidth="1.5" fill="none"/>
    <circle cx="21" cy="11" r="1" fill={color}/>
  </svg>
)

export const SathiIconActive = ({ size = 28 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="14" cy="23" rx="8" ry="2.5" fill="#DC143C" opacity="0.6"/>
    <path d="M8 23L10 17C10 15.5 11.5 14.5 14 14.5C16.5 14.5 18 15.5 18 17L20 23Z" fill="#DC143C" opacity="0.7"/>
    <ellipse cx="14" cy="15" rx="4" ry="1.5" fill="#DC143C"/>
    <path d="M14 14.5C14 14.5 9 10 10.5 5C11.5 2 14 0.5 14 0.5C14 0.5 16.5 2 17.5 5C19 10 14 14.5 14 14.5Z" fill="#DC143C"/>
    <path d="M14 13C14 13 11 10 11.8 6C12.3 4 14 3 14 3C14 3 15.7 4 16.2 6C17 10 14 13 14 13Z" fill="rgba(255,255,255,0.45)"/>
    <path d="M6 8C5 9.5 5 11.5 6 13" stroke="#DC143C" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
    <path d="M22 8C23 9.5 23 11.5 22 13" stroke="#DC143C" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
  </svg>
)

export const SathiIconInactive = ({ size = 28, color = 'rgba(255,255,255,0.35)' }: { size?: number, color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="14" cy="23" rx="8" ry="2.5" stroke={color} strokeWidth="1.2" fill="none"/>
    <path d="M8 23L10 17C10 15.5 11.5 14.5 14 14.5C16.5 14.5 18 15.5 18 17L20 23" stroke={color} strokeWidth="1.5" strokeLinecap="round" fill="none"/>
    <ellipse cx="14" cy="15" rx="4" ry="1.5" stroke={color} strokeWidth="1.2" fill="none"/>
    <path d="M14 14.5C14 14.5 9 10 10.5 5C11.5 2 14 0.5 14 0.5C14 0.5 16.5 2 17.5 5C19 10 14 14.5 14 14.5Z" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    <path d="M6 8C5 9.5 5 11.5 6 13" stroke={color} strokeWidth="1.3" strokeLinecap="round" fill="none"/>
    <path d="M22 8C23 9.5 23 11.5 22 13" stroke={color} strokeWidth="1.3" strokeLinecap="round" fill="none"/>
  </svg>
)

export const ProfileIconActive = ({ size = 28 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="14" cy="9" r="5" fill="#DC143C"/>
    <path d="M4 24C4 19 8.5 16 14 16C19.5 16 24 19 24 24Z" fill="#DC143C"/>
    <path d="M11 16L14 20L17 16" fill="rgba(255,255,255,0.15)"/>
  </svg>
)

export const ProfileIconInactive = ({ size = 28, color = 'rgba(255,255,255,0.35)' }: { size?: number, color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="14" cy="9" r="5" stroke={color} strokeWidth="1.8" fill="none"/>
    <path d="M4 24C4 19 8.5 16 14 16C19.5 16 24 19 24 24" stroke={color} strokeWidth="1.8" strokeLinecap="round" fill="none"/>
  </svg>
)

// ── FEATURE ICONS ──
export const ElderCareIcon = ({ size = 24, color = '#DC143C' }: { size?: number, color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 20C6 20 7 16 8 14C8.5 13 9.5 12.5 10.5 13L10.5 13C11 12 12 11.5 13 12C13 12 12 14 13 15C13.5 13 14.5 12.5 15.5 13C15.5 13 15 15.5 16 16C16.5 14.5 17.5 14 18.5 14.5L20 19" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    <path d="M5 20L21 20C21 22 19 23 14 23C9 23 5 22 5 20Z" fill={color} opacity="0.5"/>
    <path d="M14 14C14 14 10 11 10 8.5C10 7 11 6 12.5 6C13.2 6 13.7 6.4 14 7C14.3 6.4 14.8 6 15.5 6C17 6 18 7 18 8.5C18 11 14 14 14 14Z" fill={color}/>
    <path d="M11.5 7C12 6 13 5.5 13.5 6" stroke="rgba(255,255,255,0.5)" strokeWidth="1" strokeLinecap="round" fill="none"/>
  </svg>
)

export const SOSIcon = ({ size = 24, color = '#DC143C' }: { size?: number, color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 3L4 7L4 14C4 19.5 8.5 24 14 25C19.5 24 24 19.5 24 14L24 7Z" fill={color} opacity="0.12" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <line x1="14" y1="10" x2="14" y2="19" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
    <line x1="9.5" y1="14.5" x2="18.5" y2="14.5" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
  </svg>
)

export const CompanionIcon = ({ size = 24, color = '#10B981' }: { size?: number, color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="11" cy="8" r="4" stroke={color} strokeWidth="2" fill="none"/>
    <path d="M3 22C3 18 6.5 15 11 15C13 15 14.8 15.7 16.2 16.8" stroke={color} strokeWidth="2" strokeLinecap="round" fill="none"/>
    <circle cx="20" cy="20" r="6" fill="rgba(16,185,129,0.12)" stroke={color} strokeWidth="2"/>
    <path d="M16.5 20L19 22.5L23.5 17" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
  </svg>
)

export const BookingsIcon = ({ size = 24, color = '#3B82F6' }: { size?: number, color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="5" width="22" height="20" rx="3" stroke={color} strokeWidth="2" fill={`${color}10`}/>
    <rect x="3" y="5" width="22" height="7" rx="3" fill={`${color}30`} stroke="none"/>
    <rect x="3" y="9" width="22" height="3" fill={`${color}30`} stroke="none"/>
    <line x1="9" y1="3" x2="9" y2="7" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
    <line x1="19" y1="3" x2="19" y2="7" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
    <path d="M10 17L12.5 20L18 14" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
  </svg>
)

export const NotificationsIcon = ({ size = 24, color = '#F59E0B' }: { size?: number, color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 3C10 3 7 6 7 10L7 18L5 20L23 20L21 18L21 10C21 6 18 3 14 3Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill={`${color}12`}/>
    <path d="M11.5 20C11.5 21.4 12.6 22.5 14 22.5C15.4 22.5 16.5 21.4 16.5 20" stroke={color} strokeWidth="2" strokeLinecap="round" fill="none"/>
    <circle cx="20" cy="6" r="4.5" fill={color}/>
    <text x="20" y="7.8" textAnchor="middle" fontFamily="-apple-system,sans-serif" fontSize="4.5" fontWeight="700" fill="#0A0400">!</text>
  </svg>
)

export const CareReportIcon = ({ size = 24, color = '#7C3AED' }: { size?: number, color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="5" width="20" height="22" rx="3" stroke={color} strokeWidth="2" fill={`${color}08`}/>
    <path d="M10 5L10 3.5C10 2.7 11 2 12 2L16 2C17 2 18 2.7 18 3.5L18 5" stroke={color} strokeWidth="2" strokeLinecap="round" fill="none"/>
    <rect x="10" y="2" width="8" height="4" rx="2" fill={`${color}35`} stroke="none"/>
    <line x1="8" y1="12" x2="20" y2="12" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
    <line x1="8" y1="16" x2="20" y2="16" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
    <path d="M8 20L11 23L16 19" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
  </svg>
)

export const PaymentsIcon = ({ size = 24, color = '#10B981' }: { size?: number, color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="7" width="24" height="16" rx="3.5" stroke={color} strokeWidth="2" fill={`${color}08`}/>
    <rect x="2" y="11" width="24" height="4" fill={`${color}25`} stroke="none"/>
    <rect x="5" y="17" width="7" height="5" rx="1.5" stroke={color} strokeWidth="1.5" fill={`${color}12`}/>
    <line x1="8.5" y1="17" x2="8.5" y2="22" stroke={color} strokeWidth="0.8" opacity="0.5"/>
    <line x1="5" y1="19.5" x2="12" y2="19.5" stroke={color} strokeWidth="0.8" opacity="0.5"/>
    <path d="M18 17C18 17 19 18 19 19.5C19 21 18 22 18 22" stroke={color} strokeWidth="1.3" strokeLinecap="round" fill="none" opacity="0.6"/>
    <path d="M20 16C20 16 22 17.5 22 19.5C22 21.5 20 23 20 23" stroke={color} strokeWidth="1.3" strokeLinecap="round" fill="none" opacity="0.5"/>
  </svg>
)

export const SearchIcon = ({ size = 24, color = 'rgba(255,255,255,0.5)' }: { size?: number, color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="7.5" stroke={color} strokeWidth="2.2" fill="none"/>
    <line x1="17.5" y1="17.5" x2="24" y2="24" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
    <path d="M12 13.5C12 13.5 9.5 12 9.5 10.2C9.5 9.1 10.3 8.5 11.2 8.8C11.6 9 12 9.5 12 10C12 9.5 12.4 9 12.8 8.8C13.7 8.5 14.5 9.1 14.5 10.2C14.5 12 12 13.5 12 13.5Z" fill={color} opacity="0.5"/>
  </svg>
)

export const WalletIcon = ({ size = 24, color = '#F59E0B', strokeWidth = 2 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="7" width="24" height="17" rx="3" stroke={color} strokeWidth="2" fill={`${color}08`}/>
    <path d="M2 11L26 11" stroke={color} strokeWidth="1.5" opacity="0.5"/>
    <rect x="17" y="14" width="9" height="7" rx="2" fill={`${color}15`} stroke={color} strokeWidth="1.5"/>
    <circle cx="21.5" cy="17.5" r="2" fill={color} opacity="0.6"/>
  </svg>
)

export const HeartIcon = ({ size = 24, color = '#DC143C', filled = false, strokeWidth = 2 }: IconProps & { filled?: boolean }) => (
  <svg width={size} height={size} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 24C14 24 3 17 3 9.5C3 5.8 5.8 3 9 3C11 3 12.8 4 14 5.5C15.2 4 17 3 19 3C22.2 3 25 5.8 25 9.5C25 17 14 24 14 24Z"
      fill={filled ? color : 'none'}
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"/>
    {filled && <path d="M10 5C11 3.5 12.5 3 13.5 3.5" stroke="rgba(255,255,255,0.3)" strokeWidth="1.2" strokeLinecap="round"/>}
  </svg>
)

export const BellIcon = ({ size = 24, color = 'currentColor', strokeWidth = 2 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 3C10 3 7 6 7 10L7 18L5 20L23 20L21 18L21 10C21 6 18 3 14 3Z" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    <path d="M11.5 20C11.5 21.4 12.6 22.5 14 22.5C15.4 22.5 16.5 21.4 16.5 20" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" fill="none"/>
  </svg>
)

export const EditIcon = ({ size = 24, color = 'currentColor', strokeWidth = 2 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 4L24 8L10 22L4 24L6 18Z" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    <line x1="17" y1="7" x2="21" y2="11" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"/>
  </svg>
)

export const CheckIcon = ({ size = 24, color = 'currentColor', strokeWidth = 2 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 14L11 20L23 8" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" fill="none"/>
  </svg>
)

export const ArrowLeftIcon = ({ size = 24, color = 'currentColor', strokeWidth = 2 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22 14H6M13 7L6 14L13 21" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" fill="none"/>
  </svg>
)

export const SendIcon = ({ size = 24, color = 'currentColor', strokeWidth = 2 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M24 4L4 13L12 16M24 4L15 24L12 16M24 4L12 16" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" fill="none"/>
  </svg>
)

export const MicIcon = ({ size = 24, color = 'currentColor', strokeWidth = 2 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="9" y="3" width="10" height="14" rx="5" stroke={color} strokeWidth={strokeWidth} fill="none"/>
    <path d="M5 14C5 19 8.6 23 14 23C19.4 23 23 19 23 14" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" fill="none"/>
    <line x1="14" y1="23" x2="14" y2="26" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"/>
    <line x1="10" y1="26" x2="18" y2="26" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"/>
  </svg>
)

export const CameraIcon = ({ size = 24, color = 'currentColor', strokeWidth = 2 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="8" width="24" height="17" rx="3.5" stroke={color} strokeWidth={strokeWidth} fill="none"/>
    <path d="M10 8L10 6.5C10 5.7 10.7 5 11.5 5L16.5 5C17.3 5 18 5.7 18 6.5L18 8" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" fill="none"/>
    <circle cx="14" cy="16.5" r="4.5" stroke={color} strokeWidth={strokeWidth} fill="none"/>
    <circle cx="21" cy="11" r="1" fill={color}/>
  </svg>
)

export const PlusIcon = ({ size = 24, color = 'currentColor', strokeWidth = 2 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <line x1="14" y1="5" x2="14" y2="23" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"/>
    <line x1="5" y1="14" x2="23" y2="14" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"/>
  </svg>
)

export const GlobeIcon = ({ size = 24, color = 'currentColor', strokeWidth = 2 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="14" cy="14" r="11" stroke={color} strokeWidth={strokeWidth} fill="none"/>
    <path d="M14 3C14 3 10 8 10 14C10 20 14 25 14 25" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" fill="none"/>
    <path d="M14 3C14 3 18 8 18 14C18 20 14 25 14 25" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" fill="none"/>
    <line x1="3" y1="14" x2="25" y2="14" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"/>
    <path d="M5 9H23M5 19H23" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" opacity="0.5"/>
  </svg>
)

export const SparkleIcon = ({ size = 24, color = 'currentColor', strokeWidth = 2 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 3L15.8 11.2L24 14L15.8 16.8L14 25L12.2 16.8L4 14L12.2 11.2Z" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    <path d="M22 4L22.9 7.1L26 8L22.9 8.9L22 12L21.1 8.9L18 8L21.1 7.1Z" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" fill="none"/>
  </svg>
)

export const CalendarIcon = ({ size = 24, color = 'currentColor', strokeWidth = 2 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="5" width="22" height="20" rx="3" stroke={color} strokeWidth={strokeWidth} fill="none"/>
    <line x1="3" y1="11" x2="25" y2="11" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"/>
    <line x1="9" y1="3" x2="9" y2="7" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"/>
    <line x1="19" y1="3" x2="19" y2="7" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"/>
    <rect x="8" y="16" width="4" height="4" rx="1" fill={color} opacity="0.5"/>
    <rect x="16" y="16" width="4" height="4" rx="1" fill={color} opacity="0.5"/>
  </svg>
)

export const ClockIcon = ({ size = 24, color = 'currentColor', strokeWidth = 2 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="14" cy="14" r="11" stroke={color} strokeWidth={strokeWidth} fill="none"/>
    <path d="M14 8V14L18 17" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" fill="none"/>
  </svg>
)

export const FestivalIcon = ({ size = 24, color = 'currentColor', strokeWidth = 2 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 3L14 6" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"/>
    <path d="M14 6L6 25L14 22L22 25Z" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    <line x1="9" y1="15" x2="19" y2="15" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"/>
    <circle cx="14" cy="6" r="2" fill={color}/>
  </svg>
)

export const FamilyIcon = FamilyIconInactive
export const EyeIcon = ({ size = 24, color = 'currentColor', strokeWidth = 2, closed = false }: IconProps & { closed?: boolean }) => (
  <svg width={size} height={size} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    {closed ? (
      <>
        <path d="M4 14C4 14 8 8 14 8C20 8 24 14 24 14" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" fill="none"/>
        <line x1="4" y1="4" x2="24" y2="24" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"/>
      </>
    ) : (
      <>
        <path d="M4 14C4 14 8 8 14 8C20 8 24 14 24 14C24 14 20 20 14 20C8 20 4 14 4 14Z" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        <circle cx="14" cy="14" r="3.5" stroke={color} strokeWidth={strokeWidth} fill="none"/>
      </>
    )}
  </svg>
)

export const EmailIcon = ({ size = 24, color = 'currentColor', strokeWidth = 2 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="6" width="22" height="16" rx="3" stroke={color} strokeWidth={strokeWidth} fill="none"/>
    <path d="M3 9L14 16L25 9" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" fill="none"/>
  </svg>
)

export const KeyIcon = ({ size = 24, color = 'currentColor', strokeWidth = 2 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="10" cy="12" r="6" stroke={color} strokeWidth={strokeWidth} fill="none"/>
    <path d="M14.5 15.5L24 24" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" fill="none"/>
    <path d="M20 20L22 22" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"/>
    <path d="M17 19L19 21" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"/>
  </svg>
)

export const MoonIcon = ({ size = 24, color = 'currentColor', strokeWidth = 2 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M23 16C21.5 20 17.5 23 13 23C7.5 23 3 18.5 3 13C3 8.5 6 4.5 10 3C7 6 7 12 11 16C15 20 21 20 23 16Z" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" fill="none"/>
  </svg>
)

export const ShareIcon = ({ size = 24, color = 'currentColor', strokeWidth = 2 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="20" cy="6" r="3" stroke={color} strokeWidth={strokeWidth} fill="none"/>
    <circle cx="20" cy="22" r="3" stroke={color} strokeWidth={strokeWidth} fill="none"/>
    <circle cx="8" cy="14" r="3" stroke={color} strokeWidth={strokeWidth} fill="none"/>
    <line x1="10.5" y1="12.5" x2="17.5" y2="7.5" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"/>
    <line x1="10.5" y1="15.5" x2="17.5" y2="20.5" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"/>
  </svg>
)

export const TrashIcon = ({ size = 24, color = 'currentColor', strokeWidth = 2 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <line x1="4" y1="7" x2="24" y2="7" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"/>
    <path d="M10 7V5C10 4.4 10.4 4 11 4H17C17.6 4 18 4.4 18 5V7" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" fill="none"/>
    <path d="M6 7L7 23C7 23.6 7.4 24 8 24H20C20.6 24 21 23.6 21 23L22 7" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    <line x1="11" y1="12" x2="11" y2="19" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"/>
    <line x1="17" y1="12" x2="17" y2="19" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"/>
  </svg>
)

export const CommentIcon = ({ size = 24, color = 'currentColor', strokeWidth = 2 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 4H24C24.6 4 25 4.4 25 5V19C25 19.6 24.6 20 24 20H8L3 25V5C3 4.4 3.4 4 4 4Z" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" fill="none"/>
  </svg>
)





// ── ADDITIONAL ICONS ──
export const LampIcon = ({ size = 24, color = 'currentColor', strokeWidth = 2 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="14" cy="23" rx="8" ry="2.5" stroke={color} strokeWidth={strokeWidth} fill="none"/>
    <path d="M8 23L10 17C10 15.5 11.5 14.5 14 14.5C16.5 14.5 18 15.5 18 17L20 23" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" fill="none"/>
    <ellipse cx="14" cy="15" rx="4" ry="1.5" stroke={color} strokeWidth={strokeWidth} fill="none"/>
    <path d="M14 14.5C14 14.5 9 10 10.5 5C11.5 2 14 0.5 14 0.5C14 0.5 16.5 2 17.5 5C19 10 14 14.5 14 14.5Z" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" fill="none"/>
  </svg>
)

export const QuoteIcon = ({ size = 24, color = 'currentColor', strokeWidth = 2 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 18C5 18 5 12 10 10L11 12C8 13 8 15 8 15H11V20H5V18Z" fill={color} opacity="0.7"/>
    <path d="M15 18C15 18 15 12 20 10L21 12C18 13 18 15 18 15H21V20H15V18Z" fill={color} opacity="0.7"/>
  </svg>
)

export const WordIcon = ({ size = 24, color = 'currentColor', strokeWidth = 2 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 6H24" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"/>
    <path d="M4 11H24" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"/>
    <path d="M4 16H16" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"/>
    <circle cx="22" cy="21" r="4" fill={color} opacity="0.5"/>
    <text x="22" y="23" textAnchor="middle" fontSize="5" fontWeight="700" fill="white" fontFamily="-apple-system,sans-serif">A</text>
  </svg>
)

export const FeelingHappyIcon = ({ size = 24, color = 'currentColor', strokeWidth = 2 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="14" cy="14" r="11" stroke={color} strokeWidth={strokeWidth} fill="none"/>
    <path d="M9 16C9 16 11 19 14 19C17 19 19 16 19 16" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" fill="none"/>
    <circle cx="10" cy="11" r="1.5" fill={color}/>
    <circle cx="18" cy="11" r="1.5" fill={color}/>
  </svg>
)

export const FeelingOkayIcon = ({ size = 24, color = 'currentColor', strokeWidth = 2 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="14" cy="14" r="11" stroke={color} strokeWidth={strokeWidth} fill="none"/>
    <line x1="9" y1="17" x2="19" y2="17" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"/>
    <circle cx="10" cy="11" r="1.5" fill={color}/>
    <circle cx="18" cy="11" r="1.5" fill={color}/>
  </svg>
)

export const FeelingSadIcon = ({ size = 24, color = 'currentColor', strokeWidth = 2 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="14" cy="14" r="11" stroke={color} strokeWidth={strokeWidth} fill="none"/>
    <path d="M9 19C9 19 11 16 14 16C17 16 19 19 19 19" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" fill="none"/>
    <circle cx="10" cy="11" r="1.5" fill={color}/>
    <circle cx="18" cy="11" r="1.5" fill={color}/>
  </svg>
)

export const PlayIcon = ({ size = 24, color = 'currentColor', strokeWidth = 2 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 5L22 14L6 23V5Z" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" fill="none"/>
  </svg>
)

export const PauseIcon = ({ size = 24, color = 'currentColor', strokeWidth = 2 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <line x1="9" y1="5" x2="9" y2="23" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"/>
    <line x1="19" y1="5" x2="19" y2="23" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"/>
  </svg>
)

export const HomeIcon = ({ size = 24, color = 'currentColor', strokeWidth = 2 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 4L3 13.5L5 13.5L5 24C5 24.6 5.4 25 6 25L11 25L11 18L17 18L17 25L22 25C22.6 25 23 24.6 23 24L23 13.5L25 13.5Z" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    <circle cx="14" cy="4" r="1" fill={color}/>
  </svg>
)

export const LocationIcon = ({ size = 24, color = 'currentColor', strokeWidth = 2 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 3C9.6 3 6 6.6 6 11C6 17 14 25 14 25C14 25 22 17 22 11C22 6.6 18.4 3 14 3Z" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    <circle cx="14" cy="11" r="3" stroke={color} strokeWidth={strokeWidth} fill="none"/>
  </svg>
)

export const StarIcon = ({ size = 24, color = 'currentColor', strokeWidth = 2 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 3L17 10L24 11L19 16L20.5 23L14 20L7.5 23L9 16L4 11L11 10Z" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" fill="none"/>
  </svg>
)

export const ProfileIcon = ({ size = 24, color = 'currentColor', strokeWidth = 2 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="14" cy="9" r="5" stroke={color} strokeWidth={strokeWidth} fill="none"/>
    <path d="M4 24C4 19 8.5 16 14 16C19.5 16 24 19 24 24" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" fill="none"/>
  </svg>
)
