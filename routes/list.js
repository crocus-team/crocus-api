const express = require('express')
const router = express.Router()
const { addList } = require('../controllers/list')
const { protect } = require('../middlewares/auth')

router.post('/', protect, addList)

module.exports = router
