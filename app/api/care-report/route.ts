import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import mongoose from 'mongoose'

const CareReportSchema = new mongoose.Schema({
  bookingId: { type: String, required: true },
  companionEmail: { type: String, required: true },
  companionName: { type: String },
  familyEmail: { type: String, required: true },
  clientName: { type: String },
  visitDate: { type: Date, default: Date.now },
  mood: { type: String, enum: ['happy', 'okay', 'concerned'], required: true },
  medicineTaken: { type: String, enum: ['yes', 'no', 'partial', 'na'] },
  mealEaten: { type: String, enum: ['yes', 'no', 'partial'] },
  physicalCondition: { type: String, enum: ['good', 'some_concern', 'needs_attention'] },
  notes: { type: String },
  photoUrl: { type: String },
  arrivalTime: { type: String },
  departureTime: { type: String },
  rating: { type: Number, min: 1, max: 5 },
  familyRatingNote: { type: String },
  createdAt: { type: Date, default: Date.now },
})

const CareReport = mongoose.models.CareReport || mongoose.model('CareReport', CareReportSchema)

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    await connectDB()
    const report = await CareReport.create(body)
    return NextResponse.json({ success: true, reportId: report._id })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to save report' }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  try {
    const email = req.nextUrl.searchParams.get('email')
    const role = req.nextUrl.searchParams.get('role') || 'family'
    if (!email) return NextResponse.json({ error: 'Email required' }, { status: 400 })
    await connectDB()
    const query = role === 'companion'
      ? { companionEmail: email }
      : { familyEmail: email }
    const reports = await CareReport.find(query).sort({ createdAt: -1 }).limit(50)
    return NextResponse.json({ reports })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch reports' }, { status: 500 })
  }
}
