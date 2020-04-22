const express = require('express')
const router = express.Router()
const {
  addTask
} = require('../controllers/task')
const { protect } = require('../middlewares/auth')

router.post('/', protect, addTask)

module.exports = router
