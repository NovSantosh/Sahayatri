import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  phone: { type: String },
  avatar: { type: String },
  role: { 
    type: String, 
    enum: ['FAMILY', 'COMPANION', 'PROFESSIONAL'], 
    default: 'FAMILY' 
  },
  location: { type: String },
  bio: { type: String },
  createdAt: { type: Date, default: Date.now },
})

export default mongoose.models.User || mongoose.model('User', UserSchema)
