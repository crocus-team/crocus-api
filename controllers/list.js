const ErrorResponse = require('../helpers/errorResponse')
const asyncHandler = require('../middlewares/async')
const ListModel = require('../models/List')
const ShareModel = require('../models/Share')

// list my all lists [GET,PROTECTED] (list)
exports.myLists = asyncHandler(async (req, res, next) => {
  let lists = await ListModel.find()
    .or([{ owner_user: req.user.id }, { shared_users: req.user.id }])
    .populate('tasks')
    .populate('owner_user')
    .populate('shared_users')
  res.status(200).json({
    success: true,
    data: lists,
  })
})

// create new list [POST,PROTECTED] (list)
exports.addList = asyncHandler(async (req, res, next) => {
  req.body.owner_user = req.user.id
  const create_list = await ListModel.create(req.body)
  const list = await ListModel.findById(create_list._id).populate('tasks')
  res.status(200).json({
    success: true,
    data: list,
  })
})

// list details [GET,PROTECTED] (list/:listId)
exports.listDetails = asyncHandler(async (req, res, next) => {
  let list = await ListModel.findById(req.params.listId).populate('tasks')
  if (!list) {
    return next(
      new ErrorResponse(`List not found with id of ${req.params.listId}`, 404),
    )
  }
  const checkAuthorize = await list.checkAuthorize(req.user.id)
  if (checkAuthorize.authorize) {
    await list.populate('shared_users').populate('owner_user').execPopulate()
    res.status(200).json({
      success: true,
      data: list
    })
  } else {
    return next(
      new ErrorResponse('You are not authorized to view this list', 401),
    )
  }
})

// update list details [PUT,PROTECTED] (list/:listId)
exports.updateList = asyncHandler(async (req, res, next) => {
  const list = await ListModel.findById(req.params.listId)
  if (!list) {
    return next(
      new ErrorResponse(`List not found with id of ${req.params.listId}`, 404),
    )
  }
  const checkAuthorize = await list.checkAuthorize(req.user.id)
  if (checkAuthorize.authorize && checkAuthorize.owner) {
    list.name = req.body.name
    list.color = req.body.color
    await list.save()
    res.status(200).json({
      success: true,
      data: list,
    })
  } else {
    return next(
      new ErrorResponse('You are not authorized to edit this list', 401),
    )
  }
})

// delete list [DELETE,PROTECTED] (list/:listId)
exports.deleteList = asyncHandler(async (req, res, next) => {
  const list = await ListModel.findById(req.params.listId)
  if (!list) {
    return next(
      new ErrorResponse(`List not found with id of ${req.params.listId}`, 404),
    )
  }
  const checkAuthorize = await list.checkAuthorize(req.user.id)
  if (checkAuthorize.authorize && checkAuthorize.owner) {
    await list.remove()
    res.status(200).json({
      success: true,
      data: {},
    })
  } else {
    return next(
      new ErrorResponse('You are not authorized to edit this list', 401),
    )
  }
})

// remove user from shared list [DELETE,PROTECTED] (list/:listId/:userId)
exports.removeUser = asyncHandler(async (req, res, next) => {
  const list = await ListModel.findById(req.params.listId)
  if (!list) {
    return next(
      new ErrorResponse(`List not found with id of ${req.params.listId}`, 404),
    )
  }
  const checkAuthorize = await list.checkAuthorize(req.user.id)
  if (checkAuthorize.authorize && checkAuthorize.owner) {
    if (list.shared_users.includes(req.params.userId)) {
      await list.shared_users.pull(req.params.userId)
      await list.save()
      res.status(200).json({
        success: true,
        data: {},
      })
    } else {
      return next(new ErrorResponse('User is not include this list', 404))
    }
  } else {
    return next(
      new ErrorResponse('You are not authorized to edit this list', 401),
    )
  }
})

// sent request for list [GET,PROTECTED] (list/:listId/requests)
exports.sentRequests = asyncHandler(async (req, res, next) => {
  const list = await ListModel.findById(req.params.listId).populate('tasks')
  if (!list) {
    return next(
      new ErrorResponse(`List not found with id of ${req.params.listId}`, 404),
    )
  }
  const checkAuthorize = await list.checkAuthorize(req.user.id)
  if (!checkAuthorize.authorize) {
    return next(
      new ErrorResponse('You are not authorized to view this list', 401),
    )
  }
  const requests = await ShareModel.find({ list: req.params.listId, status: 0 }).populate(
    'receiver',
  )
  res.status(200).json({
    success: true,
    data: requests,
  })
})
