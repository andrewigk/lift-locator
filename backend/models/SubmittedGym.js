/* Schema model for Gym, must be modified */
const mongoose = require('mongoose')

const SubmittedGymSchema = new mongoose.Schema({
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  name: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, immutable: true },
  status: { type: String, default: 'pending' },
  images: [
    {
      url: { type: String, required: true },
      uploaded: { type: Date, default: Date.now, immutable: true },
    },
  ],
  submittedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
})

module.exports = mongoose.model('Submission', SubmittedGymSchema)
