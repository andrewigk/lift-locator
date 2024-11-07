const mongoose = require('mongoose')

const EquipmentSchema = new mongoose.Schema({
  category: { type: String, required: true }, // 'Bar', 'Rack', 'Dumbbell',
  brand: { type: String, required: true }, // e.g. 'Rogue'
  type: { type: String, required: true }, // e.g. 'Ohio Power Bar' or 'Combo Rack' vs. 'Squat Rack'
})

module.exports = mongoose.model('Equipment', EquipmentSchema)
