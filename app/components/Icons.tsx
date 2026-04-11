'use client'

interface IconProps {
  size?: number
  color?: string
  strokeWidth?: number
  filled?: boolean
}

export const HomeIcon = ({ size = 24, color = 'currentColor', strokeWidth = 2 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 9.5L12 3L21 9.5V20C21 20.5523 20.5523 21 20 21H15V15H9V21H4C3.44772 21 3 20.5523 3 20V9.5Z" stroke={color} strokeWidth={strokeWidth} strokeLinejoin="round"/>
  </svg>
)

export const FamilyIcon = ({ size = 24, color = 'currentColor', strokeWidth = 2 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="9" cy="6" r="3" stroke={color} strokeWidth={strokeWidth}/>
    <circle cx="17" cy="7" r="2.5" stroke={color} strokeWidth={strokeWidth}/>
    <path d="M2 20C2 16.134 5.13401 13 9 13C12.866 13 16 16.134 16 20" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"/>
    <path d="M17 12C19.2091 12 21 13.7909 21 16V20" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"/>
  </svg>
)

export const MicIcon = ({ size = 24, color = 'currentColor', strokeWidth = 2 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="9" y="2" width="6" height="11" rx="3" stroke={color} strokeWidth={strokeWidth}/>
    <path d="M5 10C5 10 5 15 12 15C19 15 19 10 19 10" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"/>
    <line x1="12" y1="15" x2="12" y2="19" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"/>
    <line x1="9" y1="19" x2="15" y2="19" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"/>
  </svg>
)

export const HeartIcon = ({ size = 24, color = 'currentColor', strokeWidth = 2, filled = false }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? color : 'none'} xmlns="http://www.w3.org/2000/svg">
    <path d="M20.84 4.61C20.3292 4.099 19.7228 3.694 19.0554 3.417C18.3879 3.141 17.6725 2.998 16.95 2.998C16.2275 2.998 15.5121 3.141 14.8446 3.417C14.1772 3.694 13.5708 4.099 13.06 4.61L12 5.67L10.94 4.61C9.9083 3.578 8.50903 2.999 7.05 2.999C5.59096 2.999 4.19169 3.578 3.16 4.61C2.1283 5.642 1.54871 7.041 1.54871 8.5C1.54871 9.959 2.1283 11.358 3.16 12.39L12 21.23L20.84 12.39C21.351 11.879 21.7563 11.273 22.0329 10.605C22.3095 9.938 22.4518 9.222 22.4518 8.5C22.4518 7.778 22.3095 7.062 22.0329 6.395C21.7563 5.727 21.351 5.121 20.84 4.61Z" stroke={color} strokeWidth={strokeWidth} strokeLinejoin="round"/>
  </svg>
)

export const ProfileIcon = ({ size = 24, color = 'currentColor', strokeWidth = 2 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="8" r="4" stroke={color} strokeWidth={strokeWidth}/>
    <path d="M4 20C4 16.134 7.58172 13 12 13C16.4183 13 20 16.134 20 20" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"/>
  </svg>
)

export const SearchIcon = ({ size = 24, color = 'currentColor', strokeWidth = 2 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="11" cy="11" r="7" stroke={color} strokeWidth={strokeWidth}/>
    <path d="M16.5 16.5L21 21" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"/>
  </svg>
)

export const BellIcon = ({ size = 24, color = 'currentColor', strokeWidth = 2 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"/>
    <path d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"/>
  </svg>
)

export const CalendarIcon = ({ size = 24, color = 'currentColor', strokeWidth = 2 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="4" width="18" height="18" rx="2" stroke={color} strokeWidth={strokeWidth}/>
    <line x1="3" y1="9" x2="21" y2="9" stroke={color} strokeWidth={strokeWidth}/>
    <line x1="8" y1="2" x2="8" y2="6" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"/>
    <line x1="16" y1="2" x2="16" y2="6" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"/>
    <circle cx="8" cy="14" r="1" fill={color}/>
    <circle cx="12" cy="14" r="1" fill={color}/>
    <circle cx="16" cy="14" r="1" fill={color}/>
  </svg>
)

export const WalletIcon = ({ size = 24, color = 'currentColor', strokeWidth = 2 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21 7H3C2.44772 7 2 7.44772 2 8V19C2 19.5523 2.44772 20 3 20H21C21.5523 20 22 19.5523 22 19V8C22 7.44772 21.5523 7 21 7Z" stroke={color} strokeWidth={strokeWidth}/>
    <path d="M16 7V5C16 4.44772 15.5523 4 15 4H5C4.44772 4 4 4.44772 4 5V7" stroke={color} strokeWidth={strokeWidth}/>
    <circle cx="17" cy="13.5" r="1.5" fill={color}/>
  </svg>
)

export const EditIcon = ({ size = 24, color = 'currentColor', strokeWidth = 2 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"/>
    <path d="M18.5 2.5C18.8978 2.10218 19.4374 1.87868 20 1.87868C20.5626 1.87868 21.1022 2.10218 21.5 2.5C21.8978 2.89782 22.1213 3.43739 22.1213 4C22.1213 4.56261 21.8978 5.10218 21.5 5.5L12 15L8 16L9 12L18.5 2.5Z" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"/>
  </svg>
)

export const CameraIcon = ({ size = 24, color = 'currentColor', strokeWidth = 2 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M23 19C23 19.5304 22.7893 20.0391 22.4142 20.4142C22.0391 20.7893 21.5304 21 21 21H3C2.46957 21 1.96086 20.7893 1.58579 20.4142C1.21071 20.0391 1 19.5304 1 19V8C1 7.46957 1.21071 6.96086 1.58579 6.58579C1.96086 6.21071 2.46957 6 3 6H7L9 3H15L17 6H21C21.5304 6 22.0391 6.21071 22.4142 6.58579C22.7893 6.96086 23 7.46957 23 8V19Z" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"/>
    <circle cx="12" cy="13" r="4" stroke={color} strokeWidth={strokeWidth}/>
  </svg>
)

export const GlobeIcon = ({ size = 24, color = 'currentColor', strokeWidth = 2 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" stroke={color} strokeWidth={strokeWidth}/>
    <line x1="2" y1="12" x2="22" y2="12" stroke={color} strokeWidth={strokeWidth}/>
    <path d="M12 2C12 2 8 7 8 12C8 17 12 22 12 22C12 22 16 17 16 12C16 7 12 2 12 2Z" stroke={color} strokeWidth={strokeWidth}/>
  </svg>
)

export const SparkleIcon = ({ size = 24, color = 'currentColor', strokeWidth = 2 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z" stroke={color} strokeWidth={strokeWidth} strokeLinejoin="round" fill={color} fillOpacity="0.15"/>
    <path d="M19 2L19.75 4.25L22 5L19.75 5.75L19 8L18.25 5.75L16 5L18.25 4.25L19 2Z" stroke={color} strokeWidth={1.5} strokeLinejoin="round" fill={color} fillOpacity="0.15"/>
  </svg>
)

export const PlusIcon = ({ size = 24, color = 'currentColor', strokeWidth = 2 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <line x1="12" y1="5" x2="12" y2="19" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"/>
    <line x1="5" y1="12" x2="19" y2="12" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"/>
  </svg>
)

export const ArrowLeftIcon = ({ size = 24, color = 'currentColor', strokeWidth = 2 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M19 12H5" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"/>
    <path d="M12 5L5 12L12 19" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

export const SendIcon = ({ size = 24, color = 'currentColor', strokeWidth = 2 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22 2L11 13" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"/>
    <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke={color} strokeWidth={strokeWidth} strokeLinejoin="round" fill={color} fillOpacity="0.1"/>
  </svg>
)

export const PlayIcon = ({ size = 24, color = 'currentColor', strokeWidth = 2 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <polygon points="5 3 19 12 5 21 5 3" fill={color} stroke={color} strokeWidth={strokeWidth} strokeLinejoin="round"/>
  </svg>
)

export const PauseIcon = ({ size = 24, color = 'currentColor', strokeWidth = 2 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="6" y="4" width="4" height="16" rx="1" fill={color}/>
    <rect x="14" y="4" width="4" height="16" rx="1" fill={color}/>
  </svg>
)

export const CheckIcon = ({ size = 24, color = 'currentColor', strokeWidth = 2 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <polyline points="20 6 9 17 4 12" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

export const TrashIcon = ({ size = 24, color = 'currentColor', strokeWidth = 2 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <polyline points="3 6 5 6 21 6" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"/>
    <path d="M19 6L18 20C18 20.5304 17.7893 21.0391 17.4142 21.4142C17.0391 21.7893 16.5304 22 16 22H8C7.46957 22 6.96086 21.7893 6.58579 21.4142C6.21071 21.0391 6 20.5304 6 20L5 6" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"/>
    <path d="M10 11V17M14 11V17M9 6V4H15V6" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"/>
  </svg>
)

export const ShareIcon = ({ size = 24, color = 'currentColor', strokeWidth = 2 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="18" cy="5" r="3" stroke={color} strokeWidth={strokeWidth}/>
    <circle cx="6" cy="12" r="3" stroke={color} strokeWidth={strokeWidth}/>
    <circle cx="18" cy="19" r="3" stroke={color} strokeWidth={strokeWidth}/>
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"/>
    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"/>
  </svg>
)

export const CommentIcon = ({ size = 24, color = 'currentColor', strokeWidth = 2 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"/>
  </svg>
)

export const LocationIcon = ({ size = 24, color = 'currentColor', strokeWidth = 2 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke={color} strokeWidth={strokeWidth}/>
    <circle cx="12" cy="10" r="3" stroke={color} strokeWidth={strokeWidth}/>
  </svg>
)

export const StarIcon = ({ size = 24, color = 'currentColor', strokeWidth = 2, filled = false }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? color : 'none'} xmlns="http://www.w3.org/2000/svg">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" stroke={color} strokeWidth={strokeWidth} strokeLinejoin="round"/>
  </svg>
)

export const EyeIcon = ({ size = 24, color = 'currentColor', strokeWidth = 2, closed = false }: IconProps & { closed?: boolean }) => closed ? (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.94 17.94C16.2306 19.243 14.1491 19.9649 12 20C5 20 1 12 1 12C2.24389 9.6712 3.96914 7.61263 6.06 6M9.9 4.24C10.5883 4.0789 11.2931 3.99836 12 4C19 4 23 12 23 12C22.393 13.1356 21.6691 14.2048 20.84 15.19M14.12 14.12C13.8454 14.4147 13.5141 14.6512 13.1462 14.8151C12.7782 14.9791 12.3809 15.0673 11.9781 15.0744C11.5753 15.0815 11.1752 15.0074 10.8016 14.8565C10.4281 14.7056 10.0887 14.481 9.80385 14.1962C9.51897 13.9113 9.29439 13.5719 9.14351 13.1984C8.99262 12.8248 8.91853 12.4247 8.92563 12.0219C8.93274 11.6191 9.02091 11.2218 9.18488 10.8538C9.34884 10.4859 9.58525 10.1546 9.88 9.88" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"/><line x1="1" y1="1" x2="23" y2="23" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"/>
  </svg>
) : (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" stroke={color} strokeWidth={strokeWidth}/>
    <circle cx="12" cy="12" r="3" stroke={color} strokeWidth={strokeWidth}/>
  </svg>
)

export const EmailIcon = ({ size = 24, color = 'currentColor', strokeWidth = 2 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke={color} strokeWidth={strokeWidth}/>
    <polyline points="22,6 12,13 2,6" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"/>
  </svg>
)

export const KeyIcon = ({ size = 24, color = 'currentColor', strokeWidth = 2 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="7.5" cy="15.5" r="5.5" stroke={color} strokeWidth={strokeWidth}/>
    <path d="M21 2L13 10" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"/>
    <path d="M19 4L21 6L17 10L15 8" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

export const ClockIcon = ({ size = 24, color = 'currentColor', strokeWidth = 2 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" stroke={color} strokeWidth={strokeWidth}/>
    <polyline points="12 6 12 12 16 14" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"/>
  </svg>
)

// Special Sahayatri branded icons

export const LampIcon = ({ size = 24, color = 'currentColor', strokeWidth = 2 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 3C12 3 7 6.5 7 11C7 13.761 9.239 16 12 16C14.761 16 17 13.761 17 11C17 6.5 12 3 12 3Z" stroke={color} strokeWidth={strokeWidth} strokeLinejoin="round" fill={color} fillOpacity="0.1"/>
    <path d="M9 16L8.5 19H15.5L15 16" stroke={color} strokeWidth={strokeWidth} strokeLinejoin="round"/>
    <line x1="8.5" y1="19" x2="15.5" y2="19" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"/>
    <line x1="9.5" y1="21" x2="14.5" y2="21" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"/>
    <line x1="12" y1="7" x2="12" y2="10" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" opacity="0.5"/>
    <path d="M10 9C10 9 10.5 10 12 10C13.5 10 14 9 14 9" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" opacity="0.5"/>
  </svg>
)

export const MoonIcon = ({ size = 24, color = 'currentColor', strokeWidth = 2 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21 12.79C20.8427 14.4922 20.2039 16.1144 19.1583 17.4668C18.1127 18.8192 16.7035 19.8458 15.0957 20.4265C13.4879 21.0073 11.748 21.1181 10.0795 20.7461C8.41109 20.3741 6.88302 19.5345 5.67425 18.3258C4.46548 17.117 3.62596 15.5889 3.25393 13.9205C2.8819 12.252 2.99274 10.5121 3.57348 8.9043C4.15422 7.29651 5.18083 5.88737 6.53324 4.84175C7.88565 3.79614 9.50779 3.15731 11.21 3C10.2134 4.34827 9.73385 6.00945 9.85853 7.68141C9.98322 9.35338 10.7039 10.9251 11.8894 12.1106C13.0749 13.2961 14.6466 14.0168 16.3186 14.1415C17.9906 14.2662 19.6517 13.7866 21 12.79Z" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" fill={color} fillOpacity="0.1"/>
  </svg>
)

export const FestivalIcon = ({ size = 24, color = 'currentColor', strokeWidth = 2 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L14.5 8.5H21L15.5 12.5L17.5 19L12 15L6.5 19L8.5 12.5L3 8.5H9.5L12 2Z" stroke={color} strokeWidth={strokeWidth} strokeLinejoin="round" fill={color} fillOpacity="0.1"/>
    <circle cx="12" cy="12" r="2" fill={color} fillOpacity="0.3"/>
  </svg>
)

export const QuoteIcon = ({ size = 24, color = 'currentColor', strokeWidth = 2 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 21C3 21 4 15 7 12C4 9 3 3 3 3H9C9 3 9 7 11 9C13 11 13 13 11 15C9 17 9 21 9 21H3Z" stroke={color} strokeWidth={strokeWidth} strokeLinejoin="round" fill={color} fillOpacity="0.08"/>
    <path d="M13 21C13 21 14 15 17 12C14 9 13 3 13 3H19C19 3 19 7 21 9C23 11 23 13 21 15C19 17 19 21 19 21H13Z" stroke={color} strokeWidth={strokeWidth} strokeLinejoin="round" fill={color} fillOpacity="0.08"/>
  </svg>
)

export const WordIcon = ({ size = 24, color = 'currentColor', strokeWidth = 2 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 4H20C21.1046 4 22 4.89543 22 6V18C22 19.1046 21.1046 20 20 20H4C2.89543 20 2 19.1046 2 18V6C2 4.89543 2.89543 4 4 4Z" stroke={color} strokeWidth={strokeWidth}/>
    <path d="M7 8L9 16L12 10L15 16L17 8" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

export const FeelingHappyIcon = ({ size = 24, color = 'currentColor', strokeWidth = 2 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" stroke={color} strokeWidth={strokeWidth}/>
    <path d="M8 14C8 14 9.5 16 12 16C14.5 16 16 14 16 14" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"/>
    <circle cx="9" cy="10" r="1" fill={color}/>
    <circle cx="15" cy="10" r="1" fill={color}/>
  </svg>
)

export const FeelingOkayIcon = ({ size = 24, color = 'currentColor', strokeWidth = 2 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" stroke={color} strokeWidth={strokeWidth}/>
    <line x1="8" y1="15" x2="16" y2="15" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"/>
    <circle cx="9" cy="10" r="1" fill={color}/>
    <circle cx="15" cy="10" r="1" fill={color}/>
  </svg>
)

export const FeelingSadIcon = ({ size = 24, color = 'currentColor', strokeWidth = 2 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" stroke={color} strokeWidth={strokeWidth}/>
    <path d="M8 16C8 16 9.5 14 12 14C14.5 14 16 16 16 16" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"/>
    <circle cx="9" cy="10" r="1" fill={color}/>
    <circle cx="15" cy="10" r="1" fill={color}/>
  </svg>
)

export const SahayatriLogo = ({ size = 32, color = 'white' }: { size?: number, color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 29C10 25 3 19 3 12C3 7.029 7.029 3 12 3C13.8 3 15.5 3.6 16 4.8C16.5 3.6 18.2 3 20 3C24.971 3 29 7.029 29 12C29 19 22 25 16 29Z" fill={color}/>
    <circle cx="16" cy="12" r="3" fill="rgba(0,0,0,0.2)"/>
    <path d="M13 12C13 10.343 14.343 9 16 9" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
)
