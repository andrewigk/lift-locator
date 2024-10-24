/* Example sample code, must be modified obviously */
const User = require('../models/User') // Mongoose model

// Fetch all users (SIMPLIFIED)
const getUsers = async (req, res) => {
  try {
    const users = await User.find() // Fetch users from DB
    res.status(200).json(users)
  } catch (err) {
    res.status(500).json({ message: 'Server Error' })
  }
}

// Create a new user (SIMPLIFIED)
const createUser = async (req, res) => {
  const { name, email } = req.body

  try {
    const newUser = new User({ name, email })
    await newUser.save() // Save user to DB
    res.status(201).json(newUser)
  } catch (err) {
    res.status(500).json({ message: 'Server Error' })
  }
}

/* Add more functions to handle other options */

module.exports = { getUsers, createUser }
