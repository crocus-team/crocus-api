const mongoose = require('mongoose')
const ErrorResponse = require('../helpers/errorResponse')
const asyncHandler = require('../middlewares/async')
const ShareModel = require('../models/Share')
const ListModel = require('../models/List')

// list requests for me [GET,PROTECTED] (share)
exports.listRequests = asyncHandler(async (req, res, next) => {
  const requests = await ShareModel.find({ receiver: req.user.id })
    .populate('sender')
    .populate('list')
  res.status(200).json({ success: true, data: requests })
})

// send request [POST,PROTECTED] (share)
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
    return next(
      new ErrorResponse(
        'You are not authorized to add users to this list',
        403,
      ),
    )
  }
  const check_request = await ShareModel.findOne(request_data)
  if (check_request) {
    if (check_request.status === 0) {
      return next(new ErrorResponse('Same request is pending now', 403))
    } else if (check_request.status === 1) {
      return next(
        new ErrorResponse('This user is already added to the list', 403),
      )
    }
  }
  const request = await ShareModel.create(request_data)
  res.status(200).json(request)
})

// reply request [PUT,PROTECTED] (share/:requestId)
exports.replyRequest = asyncHandler(async (req, res, next) => {
  if (!req.body.status) {
    return next(new ErrorResponse('status parameter is required', 403))
  }
  const request = await ShareModel.findOne({
    _id: req.params.requestId,
    receiver: req.user.id,
    status: 0,
  })
  if (!request) {
    return next(new ErrorResponse('Share request not found', 404))
  }
  if (req.body.status === 1) {
    const list = await ListModel.findById(request.list)
    if (list.owner_user.toString() === request.sender.toString()) {
      request.status = req.body.status
      request.save()
      list.shared_users.push(req.user.id)
      await list.save()
    } else {
      return next(new ErrorResponse('Bad invitation', 400))
    }
  }
  res.status(200).json({
    success: true,
    data: request,
  })
})

// delete sended request [DELETE,PROTECTED] (share/:requestId)
exports.deleteRequest = asyncHandler(async (req, res, next) => {
  const request = await ShareModel.findOneAndDelete({
    _id: req.params.requestId,
    sender: req.user.id,
    status: 0,
  })
  if (!request) {
    return next(new ErrorResponse('Share request not found', 404))
  }
  res.status(200).json({
    success: true,
    data: {},
  })
})
