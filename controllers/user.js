const ErrorResponse = require('../helpers/errorResponse')
const sendTokenResponse = require('../helpers/tokenResponse')
const asyncHandler = require('../middlewares/async')
const UserModel = require('../models/User')

// update user details [PUT,PROTECTED] (/user/details)
exports.updateDetails = asyncHandler(async (req, res, next) => {
  const fieldsToUpdate = {
    name: req.body.name,
    surname: req.body.surname,
    email: req.body.email,
  }
  const user = await UserModel.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
    new: true,
    runValidators: true,
  })
  res.status(200).json({
    success: true,
    data: user,
  })
})

// update user password [PUT,PROTECTED] (/user/password)
exports.updatePassword = asyncHandler(async (req, res, next) => {
  const user = await UserModel.findById(req.user.id).select('+password')
  const { current_password, new_password } = req.body
  if (!(await user.matchPassword(current_password))) {
    return next(new ErrorResponse('Password is incorrect', 401))
  }
  user.password = new_password
  await user.save()
  sendTokenResponse(user, 200, res)
})
