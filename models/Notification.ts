import mongoose from 'mongoose'

const NotificationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  body: { type: String, required: true },
  type: {
    type: String,
    enum: ['general', 'booking', 'companion_arrived', 'companion_completed', 'payment', 'sos', 'verification', 'reminder'],
    default: 'general'
  },
  data: { type: mongoose.Schema.Types.Mixed, default: {} },
  read: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
})

export default mongoose.models.Notification || mongoose.model('Notification', NotificationSchema)
