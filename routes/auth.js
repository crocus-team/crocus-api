const express = require('express')
const router = express.Router()
const {
  register,
  login,
  logout,
  check,
  forgotPassword,
  resetPassword
} = require('../controllers/auth')
const { protect } = require('../middlewares/auth')

router.post('/register', register)
router.post('/login', login)
router.get('/logout', protect, logout)
router.get('/check', protect, check)
router.post('/forgotpassword', forgotPassword)
router.post('/resetpassword', resetPassword)

module.exports = router
