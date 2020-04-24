const ErrorResponse = require('../helpers/errorResponse')
const asyncHandler = require('../middlewares/async')
const ShareModel = require('../models/Share')
const ListModel = require('../models/List')

// list requests for me [GET,PROTECTED] (/share/)
exports.listRequests = asyncHandler(async (req, res, next) => {
  const requests = await ShareModel.find({ receiver: req.user.id })
  res.status(200).json({ success: true, data: requests })
})
