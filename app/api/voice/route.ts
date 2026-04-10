import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const audio = formData.get('audio') as File
    const senderName = formData.get('senderName') as string
    const familyCode = formData.get('familyCode') as string
    const type = formData.get('type') as string || 'family'
    const recipientEmail = formData.get('recipientEmail') as string || ''

    if (!audio) return NextResponse.json({ error: 'No audio' }, { status: 400 })

    const bytes = await audio.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const base64 = buffer.toString('base64')
    const dataURI = `data:audio/webm;base64,${base64}`

    const result = await cloudinary.uploader.upload(dataURI, {
      resource_type: 'video',
      folder: 'sahayatri/voice',
    })

    await connectDB()
    const mongoose = await import('mongoose')
    
    const VoiceMessage = mongoose.models.VoiceMessage || mongoose.model('VoiceMessage', new mongoose.Schema({
      senderName: String,
      familyCode: String,
      type: { type: String, enum: ['family', 'personal'], default: 'family' },
      recipientEmail: String,
      audioUrl: String,
      duration: Number,
      played: { type: Boolean, default: false },
      createdAt: { type: Date, default: Date.now },
    }))

    const message = await VoiceMessage.create({
      senderName,
      familyCode,
      type,
      recipientEmail,
      audioUrl: result.secure_url,
      duration: 0,
    })

    return NextResponse.json({ success: true, message })
  } catch (error) {
    console.error('Voice error:', error)
    return NextResponse.json({ error: 'Failed to save voice message' }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  try {
    const familyCode = req.nextUrl.searchParams.get('familyCode')
    const type = req.nextUrl.searchParams.get('type') || 'family'
    const email = req.nextUrl.searchParams.get('email') || ''

    if (!familyCode) return NextResponse.json({ messages: [] })

    await connectDB()
    const mongoose = await import('mongoose')
    
    const VoiceMessage = mongoose.models.VoiceMessage || mongoose.model('VoiceMessage', new mongoose.Schema({
      senderName: String,
      familyCode: String,
      type: { type: String, enum: ['family', 'personal'], default: 'family' },
      recipientEmail: String,
      audioUrl: String,
      duration: Number,
      played: { type: Boolean, default: false },
      createdAt: { type: Date, default: Date.now },
    }))

    let query: any = { familyCode }
    if (type === 'personal') {
      query.type = 'personal'
      query.recipientEmail = email
    } else {
      query.type = 'family'
    }

    const messages = await VoiceMessage.find(query).sort({ createdAt: -1 }).limit(20)
    return NextResponse.json({ messages })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 })
  }
}
