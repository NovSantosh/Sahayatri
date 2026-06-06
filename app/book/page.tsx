'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

// Orphaned duplicate of /care — parked. Original saved as page.tsx.parked
export default function BookParked() {
  const router = useRouter()
  useEffect(() => { router.replace('/care') }, [router])
  return null
}
