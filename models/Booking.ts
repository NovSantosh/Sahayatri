import mongoose from 'mongoose'

const BookingSchema = new mongoose.Schema({
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  clientName: { type: String, required: true },
  clientEmail: { type: String, required: true },
  companionName: { type: String, required: true },
  companionRole: { type: String, required: true },
  service: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  duration: { type: Number, required: true },
  rate: { type: Number, required: true },
  total: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'confirmed', 'cancelled', 'completed'], default: 'pending' },
  paymentMethod: { type: String, enum: ['esewa', 'khalti', 'bank', 'pending'], default: 'pending' },
  paymentStatus: { type: String, enum: ['unpaid', 'paid'], default: 'unpaid' },
  confirmationCode: { type: String },
  notes: { type: String },
  createdAt: { type: Date, default: Date.now },
})

export default mongoose.models.Booking || mongoose.model('Booking', BookingSchema)
