const ErrorResponse = require('../helpers/errorResponse')
const asyncHandler = require('../middlewares/async')
const ListModel = require('../models/List')

// list my all lists [GET,PROTECTED] (/list/)
exports.myLists = asyncHandler(async (req, res, next) => {
  let lists = await ListModel.find().or([
    { owner_user: req.user.id },
    { shared_users: req.user.id },
  ])
  res.status(200).json({
    success: true,
    data: lists,
  })
})

// create new list [POST,PROTECTED] (/list/)
exports.addList = asyncHandler(async (req, res, next) => {
  req.body.owner_user = req.user.id
  const list = await ListModel.create(req.body)
  res.status(200).json({
    success: true,
    data: list,
  })
})

// list details [GET,PROTECTED] (/:listId)
exports.listDetails = asyncHandler(async (req, res, next) => {
  const list = await ListModel.findById(req.params.listId)
  const checkAuthorize = await list.checkAuthorize(req.user.id)
  if (checkAuthorize.authorize) {
    res.status(200).json({
      success: true,
      data: list,
    })
  } else {
    next(new ErrorResponse('You are not authorized to view this list', 401))
  }
})

// update list details [PUT,PROTECTED] (/:listId)
exports.updateList = asyncHandler(async (req, res, next) => {
  const list = await ListModel.findById(req.params.listId)
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
    next(new ErrorResponse('You are not authorized to edit this list', 401))
  }
})
