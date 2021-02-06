const express = require('express')
const router = express.Router()
const {
  addTask,
  taskDetails,
  updateTask,
  deleteTask,
  allTasks,
  upcomingTasks,
  toggleTask
} = require('../controllers/task')
const { protect } = require('../middlewares/auth')

router.get('/', protect, allTasks)
router.post('/', protect, addTask)
router.get('/upcoming', protect, upcomingTasks)
router.get('/:taskId', protect, taskDetails)
router.post('/:taskId/toggle', protect, toggleTask)
router.put('/:taskId', protect, updateTask)
router.delete('/:taskId', protect, deleteTask)

module.exports = router
