const express = require('express')
const router = express.Router()
const {
  addTask,
  taskDetails,
  updateTask,
  deleteTask,
  allTasks
} = require('../controllers/task')
const { protect } = require('../middlewares/auth')

router.post('/', protect, addTask)
router.get('/', protect, allTasks)
router.get('/:taskId', protect, taskDetails)
router.put('/:taskId', protect, updateTask)
router.delete('/:taskId', protect, deleteTask)

module.exports = router
