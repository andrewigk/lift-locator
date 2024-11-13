const mongoose = require('mongoose')

/** Schema model for gym submissions.
 *
 */
const SubmittedGymSchema = new mongoose.Schema({
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  name: { type: String, required: true },
  category: {
    type: String,
    enum: [
      'powerlifting',
      'bodybuilding',
      'weightlifting',
      'crossfit',
      'general',
    ],
    required: true,
  },
  createdAt: { type: Date, default: Date.now, immutable: true },
  status: { type: String, default: 'pending' },
  images: [
    {
      url: { type: String, required: true },
      uploaded: { type: Date, default: Date.now, immutable: true },
      comment: { type: String },
    },
  ],
  submittedBy: { type: String, required: true },
  inventory: [
    {
      equipment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Equipment',
        required: true,
      },
      condition: {
        type: String,
        enum: ['excellent', 'good', 'fair', 'worn', 'needs repair'],
        required: true,
      },
      count: { type: Number, required: true },
      maxWeight: { type: Number }, // Used for dumbbells
      minWeight: { type: Number }, // Used for dumbbells
    },
  ],
  hasKilos: { type: Boolean },
  contactInfo: [
    {
      name: { type: String },
      phoneNumber: { type: String },
      email: { type: String },
    },
  ],
})

module.exports = mongoose.model('Submission', SubmittedGymSchema)
