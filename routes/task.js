const express = require('express')
const router = express.Router()
const {
  addTask,
  taskDetails
} = require('../controllers/task')
const { protect } = require('../middlewares/auth')

router.post('/', protect, addTask)
router.get('/:taskId', protect, taskDetails)

module.exports = router
