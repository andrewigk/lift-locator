// import dependencies/libraries

const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const session = require('express-session')
const crypto = require('crypto')
const RedisStore = require('connect-redis').default
const redis = require('./redis.js')

dotenv.config()

// this statement initializes the app
const app = express()

const sessionSecret = crypto.randomBytes(32).toString('hex')

// Initialize store.
/* let redisStore = new RedisStore({
  client: redisClient,
  prefix: 'myapp:',
  legacyMode: true,
}) */

/** Middleware to handle cross-origin resources and JSON body parsing */
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
)
app.use(express.json())

app.use(
  session({
    store: new RedisStore({
      client: redis,
      legacyMode: true,
    }),
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
)

// this is also where you would serve any static files
// like app assets like images

const userRoutes = require('./routes/userRoutes')
const gymRoutes = require('./routes/gymRoutes')

// .use is how you mount routers or middleware functions
// .use is also used to define global error-handling middleware
app.use('/api/users', userRoutes)
app.use('/api/gyms', gymRoutes)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

/* Initialize DB connection */
const connectDB = require('./config/db')
connectDB() // Connect to the database
// use npm run dev to start the server
