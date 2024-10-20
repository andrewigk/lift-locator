const express = require('express')
const router = express.Router()
const { getUsers, createUser } = require('../controllers/userController')

// GET request to fetch users
router.get('/', getUsers)

// POST request to create a new user
router.post('/', createUser)

module.exports = router
