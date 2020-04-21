const express = require('express')
const router = express.Router()
const { addList, myLists } = require('../controllers/list')
const { protect } = require('../middlewares/auth')

router.get('/', protect, myLists)
router.post('/', protect, addList)

module.exports = router
