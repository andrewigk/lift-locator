const User = require('../models/User') // Mongoose model

/** Retrieves all users in the database.
 *
 * @param {*} req
 * @param {*} res
 */
const getUsers = async (req, res) => {
  try {
    const users = await User.find() // Fetch users from DB
    res.status(200).json(users)
  } catch (err) {
    res.status(500).json({ message: 'Server Error' })
  }
}

/** Retrieves a user by their OAuth ID.
 *
 * @param {*} req
 * @param {*} res
 */
const getUserById = async (req, res) => {
  const { oauthId } = req.body
  try {
    const user = await User.findOne({ oauthId })
    if (user) {
      res.status(200).json(user)
    } else {
      res.status(404).json({ message: 'User not found' })
    }
  } catch (err) {
    res.status(500).json({ message: 'Server Error' })
  }
}

/** Creates a new user.
 *
 * @param {*} req
 * @param {*} res
 */
const createUser = async (req, res) => {
  const { email, oauthId, provider, role, username, createdAt } = req.body

  try {
    const newUser = new User({
      email,
      oauthId,
      provider,
      role,
      username,
      createdAt,
    })
    await newUser.save() // Save user to DB
    res.status(201).json(newUser)
    // HTTP 201 code is for 'Created' or successful resource creation
  } catch (err) {
    // You can dynamically define and handle errors here,
    // for example 'message' is not a pre-existing property
    res.status(500).json({ message: 'Server Error' })
  }
}

/* Add more functions to handle other options */

// Exporting functions to be used in routes
module.exports = { getUsers, getUserById, createUser }
