const express = require('express')
const morgan = require('morgan')
const xss_clean = require('xss-clean')
const helmet = require('helmet')
const cors = require('cors')
const hpp = require('hpp')
require('dotenv').config()
const database = require('./helpers/database')

const app = express()

// body parser
app.use(express.json())

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

app.get('/', (req, res) => {
  res.send('Hello world!')
})

// start server
app.listen(process.env.PORT, () => {
  console.log('HTTP server started')
})
