import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { getServerSession } from 'next-auth'
import SessionProvider from './components/SessionProvider'
import { ThemeProvider } from './context/ThemeContext'
import ResponsiveWrapper from './components/ResponsiveWrapper'
import PWARegister from './components/PWARegister'
import ViewportMeta from './components/ViewportMeta'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Sahayatri — Feel Present. Always.',
  description: 'Care, connection and community for every Nepali family.',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Sahayatri',
  },
}

// This is the ONLY way to control viewport in Next.js 15/16
// Must be exported from layout.tsx as 'viewport'
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  minimumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
  themeColor: '#06040C',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession()
  return (
    <html lang="en">
      <body
        className={inter.className}
        style={{
          margin: 0,
          padding: 0,
          background: '#06040C',
          overflowX: 'hidden',
        }}>
        <PWARegister/>
        <ViewportMeta/>
        <SessionProvider session={session}>
          <ThemeProvider>
            <ResponsiveWrapper>
              {children}
            </ResponsiveWrapper>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
