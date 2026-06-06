import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { connectDB } from '@/lib/mongodb'
import Booking from '@/models/Booking'

// eSewa redirects back with ?data=<base64 json>. We re-sign and compare — never trust the redirect alone.
export async function GET(req: NextRequest) {
  const baseUrl = process.env.NEXTAUTH_URL as string
  try {
    const encoded = req.nextUrl.searchParams.get('data')
    if (!encoded) {
      return NextResponse.redirect(`${baseUrl}/payment/failed`)
    }

    const decoded = JSON.parse(Buffer.from(encoded, 'base64').toString('utf-8'))
    // decoded contains: transaction_uuid, total_amount, product_code, status, signature, signed_field_names ...

    // Rebuild the signature from the SIGNED fields eSewa tells us it used, in order.
    const fieldNames: string[] = (decoded.signed_field_names || '').split(',')
    const message = fieldNames.map((f) => `${f}=${decoded[f]}`).join(',')
    const expected = crypto
      .createHmac('sha256', process.env.ESEWA_SECRET_KEY as string)
      .update(message)
      .digest('base64')

    const signatureValid = expected === decoded.signature
    const paymentComplete = decoded.status === 'COMPLETE'

    await connectDB()
    const booking = await Booking.findOne({ transactionUuid: decoded.transaction_uuid })

    if (!booking) {
      return NextResponse.redirect(`${baseUrl}/payment/failed`)
    }

    if (signatureValid && paymentComplete) {
      booking.paymentStatus = 'paid'
      booking.status = 'confirmed'
      await booking.save()
      return NextResponse.redirect(`${baseUrl}/payment/success?code=${booking.confirmationCode}`)
    }

    // Signature mismatch or not complete — treat as failed, leave booking unpaid
    return NextResponse.redirect(`${baseUrl}/payment/failed`)
  } catch (error) {
    console.error('Payment verify error:', error)
    return NextResponse.redirect(`${baseUrl}/payment/failed`)
  }
}
