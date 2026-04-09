import mongoose from 'mongoose'

const FamilySchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, required: true, unique: true },
  admin: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  members: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name: { type: String },
    email: { type: String },
    avatar: { type: String },
    role: { type: String },
    lastActive: { type: Date, default: Date.now },
    status: { type: String, enum: ['online', 'away', 'offline'], default: 'offline' },
  }],
  createdAt: { type: Date, default: Date.now },
})

export default mongoose.models.Family || mongoose.model('Family', FamilySchema)
