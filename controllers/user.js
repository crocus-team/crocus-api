const path = require('path')
const ErrorResponse = require('../helpers/errorResponse')
const sendTokenResponse = require('../helpers/tokenResponse')
const asyncHandler = require('../middlewares/async')
const UserModel = require('../models/User')

// update user details [PUT,PROTECTED] (user/details)
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

// update user password [PUT,PROTECTED] (user/password)
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

// update user photo [PUT, PROTECTED] (user/photo)
exports.updatePhoto = asyncHandler(async (req, res, next) => {
  const user = await UserModel.findById(req.user.id)
  if (!user) {
    return next(new ErrorResponse('User not found', 404))
  }
  if (!req.files) {
    return next(new ErrorResponse('Please upload a file', 400))
  }
  const file = req.files.image
  if (!file.mimetype.startsWith('image')) {
    return next(new ErrorResponse('Please upload an image file', 400))
  }
  if (file.size > process.env.MAX_PROFILE_PHOTO_SIZE) {
    return next(
      new ErrorResponse(
        `Please upload an image less than ${process.env.MAX_PROFILE_PHOTO_SIZE}`,
        400,
      ),
    )
  }
  file.name = `${user._id}${path.parse(file.name).ext}`
  file.mv(`${process.env.FILE_UPLOAD_PATH}/profile/${file.name}`, async (err) => {
    if (err) {
      return next(new ErrorResponse(`Problem with file upload`, 500))
    }
    await UserModel.findByIdAndUpdate(user._id, { photo: file.name })
    res.status(200).json({
      success: true,
      data: file.name,
    })
  })
})
