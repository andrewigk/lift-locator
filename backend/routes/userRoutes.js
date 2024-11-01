const express = require('express')
const router = express.Router()
const { handleUserAuth } = require('../controllers/userController')

router.post('/auth/google', async (req, res) => {
  console.log(req.body)

  try {
    // Assuming you have a function to handle the token exchange and user retrieval
    await handleUserAuth(req, res)
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error handling Google callback', error: error.message })
  }
})

module.exports = router
