import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import Booking from '@/models/Booking'
import User from '@/models/User'

function generateCode() {
  return 'SAH-' + Math.random().toString(36).substring(2, 8).toUpperCase()
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { clientEmail, companionName, companionRole, service, date, time, duration, rate, notes } = body

    if (!clientEmail || !companionName || !date || !time) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    await connectDB()
    const user = await User.findOne({ email: clientEmail })
    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 })

    const total = rate * duration
    const confirmationCode = generateCode()

    const booking = await Booking.create({
      client: user._id,
      clientName: user.name,
      clientEmail,
      companionName,
      companionRole,
      service,
      date,
      time,
      duration,
      rate,
      total,
      confirmationCode,
      notes,
    })

    return NextResponse.json({ success: true, booking, confirmationCode }, { status: 201 })
  } catch (error) {
    console.error('Booking error:', error)
    return NextResponse.json({ error: 'Failed to create booking' }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  try {
    const email = req.nextUrl.searchParams.get('email')
    if (!email) return NextResponse.json({ error: 'Email required' }, { status: 400 })
    await connectDB()
    const user = await User.findOne({ email })
    if (!user) return NextResponse.json({ bookings: [] })
    const bookings = await Booking.find({ client: user._id }).sort({ createdAt: -1 })
    return NextResponse.json({ bookings })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch bookings' }, { status: 500 })
  }
}
