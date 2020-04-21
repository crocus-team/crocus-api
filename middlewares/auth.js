const jwt = require('jsonwebtoken')
const asyncHandler = require('../middlewares/async')
const ErrorResponse = require('../helpers/errorResponse')
const UserModel = require('../models/User')

// protect routes
exports.protect = asyncHandler(async (req, res, next) => {
  console.log(req.headers)
  let token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1]
  }
  if (!token) {
    return next(new ErrorResponse('Not authorized to access this route', 401))
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = await UserModel.findById(decoded.id)
    next()
  } catch (err) {
    return next(new ErrorResponse('Not authorized to access this route', 401))
  }
})