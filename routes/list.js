const express = require('express')
const router = express.Router()
const { addList, myLists, listDetails } = require('../controllers/list')
const { protect } = require('../middlewares/auth')

router.get('/', protect, myLists)
router.post('/', protect, addList)
router.get('/:listId', protect, listDetails)

module.exports = router
