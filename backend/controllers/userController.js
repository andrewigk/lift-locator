const { oauth2Client } = require('../config/auth.js')

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
const handleUserAuth = async (req, res) => {
  const { code } = req.body
  console.log('Code retrieved:', code)

  const { tokens } = await oauth2Client.getToken({
    code: code,
    callback: () => {
      console.log(code)
    },
  })

  console.log('Tokens retrieved: ', tokens)

  try {
    oauth2Client.setCredentials(tokens)

    if (!tokens.id_token) {
      throw new Error('No ID token received')
    }
    const ticket = await oauth2Client.verifyIdToken({
      idToken: tokens.id_token,
      audience: oauth2Client._clientId,
    })

    const payload = ticket.getPayload()

    let user = await User.findOne({ oauthId: payload.sub })
    if (user) {
      res.status(200).json({
        message: 'User found. Sign in successful',
        user: {
          email: user.email,
          username: user.username,
        },
      })
    } else if (!user) {
      let defaultName = payload.email.split('@')[0]
      user = new User({
        email: payload.email,
        oauthId: payload.sub,
        provider: 'google',
        username: defaultName,
        createdAt: new Date(),
      })
      await user.save()
      res.status(200).json({
        message: 'User created successfully',
        user: {
          email: user.email,
          username: user.username,
        },
      })
    } else {
      res.status(404).json({ message: 'User not found' })
    }
  } catch (err) {
    console.error('Error in handleUserAuth: ', err)
    res.status(500).json({ message: 'Server Error. Sorry bud.' })
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
module.exports = { handleUserAuth }
