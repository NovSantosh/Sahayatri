import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import User from '@/models/User'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      email, role, experience, bio, phone,
      location, languages, agreementSigned,
      fullName, citizenshipNo, docs
    } = body

    if (!email) return NextResponse.json({ error: 'Email required' }, { status: 400 })

    await connectDB()

    await User.findOneAndUpdate(
      { email },
      {
        'companionProfile.enabled': true,
        'companionProfile.role': role,
        'companionProfile.experience': experience,
        'companionProfile.bio': bio,
        'companionProfile.location': location,
        'companionProfile.languages': languages,
        'companionProfile.agreementSigned': agreementSigned,
        'companionProfile.agreementSignedAt': agreementSigned ? new Date() : null,
        'companionProfile.agreementName': fullName,
        'companionProfile.agreementCitizenshipNo': citizenshipNo,
        'companionProfile.docsUploaded': docs && docs.length >= 3,
        'companionProfile.uploadedDocs': docs || [],
        'companionProfile.verificationStatus': docs && docs.length >= 3 ? 'pending' : 'not_submitted',
        phone,
      }
    )

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Companion setup error:', error)
    return NextResponse.json({ error: 'Failed to save' }, { status: 500 })
  }
}
