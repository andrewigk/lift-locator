const express = require('express')
const router = express.Router()
const {
  getUsers,
  getUserById,
  createUser,
} = require('../controllers/userController')

// POST request to create a new user
router.post('/api/users/register', createUser)

router.post('./api/users/login', getUserById)

module.exports = router
