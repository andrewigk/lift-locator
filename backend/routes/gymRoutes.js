const express = require('express')
const router = express.Router()

const {
  getAllGyms,
  submitGym,
  getEquipment,
  getAllSubmissions,
  approveGym,
} = require('../controllers/gymController')

router.get('/', async (req, res) => {
  try {
    await getAllGyms(req, res)
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error retrieving gyms from DB', error: error.message })
  }
})

router.get('/equipment', async (req, res) => {
  try {
    await getEquipment(req, res)
  } catch (error) {
    res.status(500).json({
      message: 'Error retrieving equipment list from DB',
      error: error.message,
    })
  }
})
router.post('/submit', async (req, res) => {
  try {
    await submitGym(req, res)
  } catch (error) {
    res.status(500).json({
      message: 'Error submitting gym submission to DB',
      error: error.message,
    })
  }
})

router.get('/submissions', async (req, res) => {
  try {
    await getAllSubmissions(req, res)
  } catch (error) {
    res.status(500).json({
      message: 'Error retrieving submissions list from DB',
      error: error.message,
    })
  }
})

router.post('/approve', async (req, res) => {
  try {
    await approveGym(req, res)
  } catch (error) {
    res.status(500).json({
      message: 'Error approving gym and committing to DB',
      error: error.message,
    })
  }
})

module.exports = router
