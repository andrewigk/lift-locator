const express = require('express')
const router = express.Router()

const { getAllGyms, submitGym } = require('../controllers/gymController')

router.get('/gyms', async (req, res) => {
  try {
    await getAllGyms(req, res)
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error retrieving gyms from DB', error: error.message })
  }
})
router.post('/gyms/submit', async (req, res) => {
  try {
    await submitGym(req, res)
  } catch (error) {
    res.status(500).json({
      message: 'Error submitting gym submission to DB',
      error: error.message,
    })
  }
})

module.exports = router
