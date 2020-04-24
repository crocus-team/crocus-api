const ErrorResponse = require('../helpers/errorResponse')
const asyncHandler = require('../middlewares/async')
const ShareModel = require('../models/Share')
const ListModel = require('../models/List')

// list requests for me [GET,PROTECTED] (/share/)
exports.listRequests = asyncHandler(async (req, res, next) => {
  const requests = await ShareModel.find({ receiver: req.user.id })
  res.status(200).json({ success: true, data: requests })
})

// send request [POST,PROTECTED] (/share/)
exports.sendRequest = asyncHandler(async (req, res, next) => {
  const request_data = {
    sender: req.user.id,
    receiver: req.body.receiver,
    list: req.body.list,
  }
  const list = await ListModel.findById(request_data.list)
  if (!list) {
    return next(
      new ErrorResponse(`List not found with id of ${request_data.list}`, 404),
    )
  }
  const checkAuthorize = await list.checkAuthorize(req.user.id)
  if (!checkAuthorize.authorize || !checkAuthorize.owner) {
    next(
      new ErrorResponse(
        'You are not authorized to add users to this list',
        403,
      ),
    )
  }
  const check_request = await ShareModel.findOne(request_data)
  if (check_request) {
    if (check_request.status === 0) {
      next(new ErrorResponse('Same request is pending now', 403))
    } else if (check_request.status === 1) {
      next(new ErrorResponse('This user is already added to the list', 403))
    }
  }
  const request = await ShareModel.create(request_data)
  res.status(200).json(request)
})
