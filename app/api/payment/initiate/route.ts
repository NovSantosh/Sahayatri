import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { connectDB } from '@/lib/mongodb'
import Booking from '@/models/Booking'

// Signs the eSewa payload. Field ORDER matters — do not change it.
function signEsewa(totalAmount: number, transactionUuid: string, productCode: string) {
  const message = `total_amount=${totalAmount},transaction_uuid=${transactionUuid},product_code=${productCode}`
  return crypto
    .createHmac('sha256', process.env.ESEWA_SECRET_KEY as string)
    .update(message)
    .digest('base64')
}

export async function POST(req: NextRequest) {
  try {
    const { bookingId, amount } = await req.json()
    if (!bookingId || !amount) {
      return NextResponse.json({ error: 'bookingId and amount are required' }, { status: 400 })
    }

    await connectDB()
    const booking = await Booking.findById(bookingId)
    if (!booking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 })
    }

    const productCode = process.env.ESEWA_PRODUCT_CODE as string
    const gatewayUrl = process.env.ESEWA_GATEWAY_URL as string
    const baseUrl = process.env.NEXTAUTH_URL as string

    // Unique transaction id for this attempt — store it so /verify can find the booking
    const transactionUuid = `${booking._id}-${Date.now()}`
    booking.paymentMethod = 'esewa'
    booking.transactionUuid = transactionUuid
    await booking.save()

    const totalAmount = Number(amount)
    const signature = signEsewa(totalAmount, transactionUuid, productCode)

    // These are the exact fields eSewa's hosted form expects
    const formData = {
      amount: String(totalAmount),
      tax_amount: '0',
      total_amount: String(totalAmount),
      transaction_uuid: transactionUuid,
      product_code: productCode,
      product_service_charge: '0',
      product_delivery_charge: '0',
      success_url: `${baseUrl}/api/payment/verify`,
      failure_url: `${baseUrl}/payment/failed`,
      signed_field_names: 'total_amount,transaction_uuid,product_code',
      signature,
    }

    return NextResponse.json({
      success: true,
      gatewayUrl: `${gatewayUrl}/api/epay/main/v2/form`,
      formData,
    })
  } catch (error) {
    console.error('Payment initiate error:', error)
    return NextResponse.json({ error: 'Failed to initiate payment' }, { status: 500 })
  }
}
