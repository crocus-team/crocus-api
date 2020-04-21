const express = require('express')
const router = express.Router()
const { updateDetails } = require('../controllers/user')
const { protect } = require('../middlewares/auth')

router.put('/details', protect, updateDetails)

module.exports = router
