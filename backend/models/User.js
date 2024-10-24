/* Scheme model for User, must be modified */
const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
})

module.exports = mongoose.model('User', UserSchema)
