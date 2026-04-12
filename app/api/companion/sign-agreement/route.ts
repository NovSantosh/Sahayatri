import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import User from '@/models/User'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { fullName, citizenshipNo, email } = body

    if (!fullName || !citizenshipNo || !email) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    await connectDB()

    const updated = await User.findOneAndUpdate(
      { email },
      {
        agreementSigned: true,
        agreementSignedAt: new Date(),
        agreementName: fullName,
        agreementCitizenshipNo: citizenshipNo,
      },
      { new: true }
    )

    if (!updated) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Agreement sign error:', error)
    return NextResponse.json({ error: 'Failed to save' }, { status: 500 })
  }
}
