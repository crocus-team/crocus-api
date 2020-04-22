const express = require('express')
const router = express.Router()
const {
  addList,
  myLists,
  listDetails,
  updateList,
  deleteList,
  removeUser
} = require('../controllers/list')
const { protect } = require('../middlewares/auth')

router.get('/', protect, myLists)
router.post('/', protect, addList)
router.get('/:listId', protect, listDetails)
router.put('/:listId', protect, updateList)
router.delete('/:listId', protect, deleteList)
router.delete('/:listId/:userId', protect, removeUser)

module.exports = router
