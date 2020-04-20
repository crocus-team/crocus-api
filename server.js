const express = require('express')
require('dotenv').config()
const database = require('./helpers/database')

const app = express()

// body parser
app.use(express.json())

// connect database
database.connect()

app.get('/', (req, res) => {
  res.send('Hello world!')
})

// start server
app.listen(process.env.PORT, () => {
  console.log('HTTP server started')
})
