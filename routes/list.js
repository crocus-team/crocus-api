const express = require('express')
const router = express.Router()
const {
  addList,
  myLists,
  listDetails,
  updateList,
  deleteList,
} = require('../controllers/list')
const { protect } = require('../middlewares/auth')

router.get('/', protect, myLists)
router.post('/', protect, addList)
router.get('/:listId', protect, listDetails)
router.put('/:listId', protect, updateList)
router.delete('/:listId', protect, deleteList)

module.exports = router
