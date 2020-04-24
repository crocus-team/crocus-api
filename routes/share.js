const express = require('express')
const router = express.Router()
const {
  listRequests,
  sendRequest
} = require('../controllers/share')
const { protect } = require('../middlewares/auth')

router.get('/', protect, listRequests)
router.post('/', protect, sendRequest)

module.exports = router
