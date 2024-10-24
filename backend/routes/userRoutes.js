const express = require('express')
const router = express.Router()
const { handleUserAuth } = require('../controllers/userController')

// POST request to create a new user
// router.post('/api/users/register', createUser)

router.get('/auth/google', (req, res) => {
  res.redirect(authorizationUrl)
})

router.get('/auth/google/callback', async (req, res) => {
  try {
    // Assuming you have a function to handle the token exchange and user retrieval
    await handleUserAuth(req, res)
  } catch (error) {
    res.status(500).json({ message: 'Error handling Google callback', error })
  }
})

module.exports = router
