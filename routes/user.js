const express = require('express')
const router = express.Router()
const { updateDetails, updatePassword, updatePhoto } = require('../controllers/user')
const { protect } = require('../middlewares/auth')

router.put('/details', protect, updateDetails)
router.put('/password', protect, updatePassword)
router.put('/photo', protect, updatePhoto)

module.exports = router
