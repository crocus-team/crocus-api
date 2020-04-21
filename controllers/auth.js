const ErrorResponse = require('../helpers/errorResponse')
const asyncHandler = require('../middlewares/async')
const UserModel = require('../models/User')

// register user (auth/register)
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

const sendTokenResponse = (user, statusCode, res) => {
  // create token
  const token = user.getSignedJwtToken()
  const options = {
    expired: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000,
    ),
    httpOnly: true,
  }
  if (process.env.NODE_ENV === 'production') {
    options.secure = true
  }
  res
    .status(statusCode)
    .cookie('token', token, options)
    .json({ success: true, token })
}
