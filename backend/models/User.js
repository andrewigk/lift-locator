/* Schema model for User, must be modified */
const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  oauthId: { type: String, required: true },
  provider: { type: String, required: true },
  role: { type: String, enum: ['admin', 'user'] },
  username: {
    type: String,
    required: true,
    unique: true,
    minLength: 6,
    maxLength: 30,
    trim: true,
  },
  email: { type: String, required: true, unique: true, trim: true },
  createdAt: { type: Date, default: Date.now, immutable: true },
})

/* Create the User model, you need to create a model so that it can be used by controllers. This exports the model creation, which is more concise*/
module.exports = mongoose.model('User', UserSchema)
