const express = require('express')
const router = express.Router()
const {
  addList,
  myLists,
  listDetails,
  updateList,
  deleteList,
  removeUser,
  sentRequests,
} = require('../controllers/list')
const { protect } = require('../middlewares/auth')

router.get('/', protect, myLists)
router.post('/', protect, addList)
router.get('/:listId', protect, listDetails)
router.put('/:listId', protect, updateList)
router.delete('/:listId', protect, deleteList)
router.delete('/:listId/:userId', protect, removeUser)
router.get('/:listId/requests', protect, sentRequests)

module.exports = router
