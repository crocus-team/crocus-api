const ErrorResponse = require('../helpers/errorResponse')
const asyncHandler = require('../middlewares/async')
const ListModel = require('../models/List')

// create new list [POST,PROTECTED] (/list/)
exports.addList = asyncHandler(async (req, res, next) => {
  req.body.owner_user = req.user.id
  const list = await ListModel.create(req.body)
  res.status(200).json({
    success: true,
    data: list,
  })
})
