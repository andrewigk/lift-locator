const express = require('express')
const router = express.Router()

const { getAllGyms, submitGym } = require('../controllers/gymController')

router.get('/api/gyms', getAllGyms)
router.post('/api/gyms/submit', submitGym)

module.exports = router
