const express = require('express')
const morgan = require('morgan')
const xss_clean = require('xss-clean')
const fileupload = require('express-fileupload')
const helmet = require('helmet')
const cors = require('cors')
const hpp = require('hpp')
require('dotenv').config()
const database = require('./helpers/database')
const errorHandler = require('./middlewares/error')
const app = express()

// body parser, static folder, upload file
app.use(express.json())
app.use(express.static('public'))
app.use(fileupload())

// dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

// security middlewares
app.use(helmet())
app.use(xss_clean())
app.use(hpp())
app.use(cors())

// connect database
database.connect()

// include routes
const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')

// use routes
app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)

// error handler
app.use(errorHandler)

// start server
app.listen(process.env.PORT, () => {
  console.log('HTTP server started')
})
