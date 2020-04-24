const express = require('express')
const router = express.Router()
const {
  listRequests,
  sendRequest,
  replyRequest,
} = require('../controllers/share')
const { protect } = require('../middlewares/auth')

router.get('/', protect, listRequests)
router.post('/', protect, sendRequest)
router.put('/:requestId', protect, replyRequest)

module.exports = router
