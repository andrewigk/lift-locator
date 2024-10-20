// import dependencies/libraries

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')

dotenv.config()

// this statement initializes the app
const app = express()

app.use(cors())
app.use(bodyParser.json())

const userRoutes = require('./routes/userRoutes')
app.use('/api/users', userRoutes)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

/* Initialize DB connection */
const connectDB = require('./config/db')
connectDB() // Connect to the database
