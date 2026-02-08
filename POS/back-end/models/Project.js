import mongoose from 'mongoose'

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  goalAmount: { type: Number, required: true },
  collectedAmount: { type: Number, default: 0 },
  startDate: { type: Date },
  endDate: { type: Date },
  status: { type: String, enum: ['pending', 'active', 'completed', 'cancelled'], default: 'pending' },
  discription: { type: String }
}, { timestamps: true })

const Project = mongoose.model('Project', projectSchema)
export default Project
