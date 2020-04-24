const ErrorResponse = require('../helpers/errorResponse')
const sendTokenResponse = require('../helpers/tokenResponse')
const asyncHandler = require('../middlewares/async')
const UserModel = require('../models/User')

// register user [POST] (auth/register)
exports.register = asyncHandler(async (req, res, next) => {
  const { name, surname, email, password } = req.body
  const user = await UserModel.create({
    name,
    surname,
    email,
    password,
  })
  sendTokenResponse(user, 200, res)
})

// login user [POST] (auth/login)
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body
  if (!email || !password) {
    return next(new ErrorResponse('Please provide an email and password', 400))
  }
  const user = await UserModel.findOne({ email }).select('+password')
  if (!user) {
    return next(new ErrorResponse('Invalid credentials', 401))
  }
  const isMatch = await user.matchPassword(password)
  if (!isMatch) {
    return next(new ErrorResponse('Invalid credentials', 401))
  }
  sendTokenResponse(user, 200, res)
})

// logout user and clear cookie [GET,PROTECTED] (auth/logout)
exports.logout = asyncHandler(async (req, res, next) => {
  res.cookie('token', 'none', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  })
  res.status(200).json({ success: true, data: {} })
})

// check auth [GET,PROTECTED] (auth/check)
exports.check = asyncHandler(async (req, res, next) => {
  const user = await UserModel.findById(req.user.id)
  res.status(200).json({
    success: true,
    data: user,
  })
})

// forgot password [POST] (auth/forgotpassword)
exports.forgotPassword = asyncHandler(async (req, res, next) => {
  const user = await UserModel.findOne({ email: req.body.email })
  if (user) {
    const random_key = Math.random().toString(36).substr(2, 20)
    const expire_date = new Date()
    expire_date.setDate(expire_date.getDate() + 1)
    user.reset_password_key = random_key
    user.reset_password_expire_date = expire_date
    await user.save()
    // send email
  }
  res.json({
    success: true,
    data: { message: 'Reset email sent if this email is available' },
  })
})
