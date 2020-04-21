const ErrorResponse = require('../helpers/errorResponse')
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
