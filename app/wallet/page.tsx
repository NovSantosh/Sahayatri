'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

// Wallet page is parked until after launch. Original saved as page.tsx.parked
// Real payment flow lives in /care + PaymentSheet.
export default function WalletParked() {
  const router = useRouter()
  useEffect(() => { router.replace('/bookings') }, [router])
  return null
}
