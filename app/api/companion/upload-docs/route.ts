import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import User from '@/models/User'

export async function POST(req: NextRequest) {
  try {
    const { email, docs } = await req.json()
    if (!email) return NextResponse.json({ error: 'Email required' }, { status: 400 })

    await connectDB()

    await User.findOneAndUpdate(
      { email },
      {
        docsUploaded: true,
        docsUploadedAt: new Date(),
        uploadedDocs: docs || [],
        verificationStatus: 'pending',
      }
    )

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to save' }, { status: 500 })
  }
}
