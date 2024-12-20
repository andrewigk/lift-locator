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

  try {
    oauth2Client.setCredentials(tokens)

    req.session.credentials = tokens
    console.log('Session credentials after setting:', req.session.credentials)

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
      req.session.user = {
        email: user.email,
        username: user.username,
        oauthId: user.oauthId,
        role: user.role,
      }

      res.status(200).json({
        message: 'User found. Sign in successful',
        user: req.session.user,
        /*user: {
          email: user.email,
          username: user.username,
          oauthId: payload.sub,
          role: user.role,
        }, */
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

      /* Store the data in session, and send it back in the response too */

      req.session.user = {
        email: user.email,
        username: user.username,
        oauthId: payload.sub,
        role: user.role,
      }

      res.status(200).json({
        message: 'User created successfully',
        user: req.session.user,
        /*user: {
          email: user.email,
          username: user.username,
          oauthId: payload.sub,
          role: user.role,
        }, */
      })
    } else {
      res.status(404).json({ message: 'User not found' })
    }
  } catch (err) {
    console.error('Error in handleUserAuth: ', err)
    res.status(500).json({ message: 'Server Error. Sorry bud.' })
  }
}

const handleLogout = async (req, res) => {
  console.log(req.session.credentials)

  try {
    if (!req.session.credentials) {
      return res.status(400).json({ message: 'No credentials found.' })
    }
    oauth2Client.setCredentials(req.session.credentials)
    await oauth2Client.revokeCredentials()
    req.session.destroy()
    res.status(200).json({
      message: 'Credentials revoked successfully. Session destroyed.',
    })
  } catch (error) {
    res.status(500).json({ message: 'Failed.' })
  }
}

const handleCurrentUser = async (req, res) => {
  if (req.session.credentials && req.session.user) {
    res.status(200).json({ user: req.session.user })
  } else {
    res.status(401).json({ message: 'Not authenticated.' })
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
module.exports = { handleUserAuth, handleLogout, handleCurrentUser }
