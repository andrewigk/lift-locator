// import dependencies/libraries

const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')

dotenv.config()

// this statement initializes the app
const app = express()

/** Middleware to handle cross-origin resources and JSON body parsing */
app.use(
  cors({
    origin: 'http://localhost:5173',
  })
)
app.use(express.json())

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
