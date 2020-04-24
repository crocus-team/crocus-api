const express = require('express')
const router = express.Router()
const {
  listRequests
} = require('../controllers/share')
const { protect } = require('../middlewares/auth')

router.get('/', protect, listRequests)

module.exports = router
