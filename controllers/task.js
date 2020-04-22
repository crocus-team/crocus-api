const ErrorResponse = require('../helpers/errorResponse')
const asyncHandler = require('../middlewares/async')
const TaskModel = require('../models/Task')
const ListModel = require('../models/List')

// create new task [POST,PROTECTED] (/task/)
exports.addTask = asyncHandler(async (req, res, next) => {
  const task = await TaskModel.create(req.body)
  res.status(200).json({ success: true, data: task })
})

// get task details [GET,PROTECTED] (/task/:taskId)
exports.taskDetails = asyncHandler(async (req, res, next) => {
  const task = await TaskModel.findById(req.params.taskId)
  if (!task) {
    return next(
      new ErrorResponse(`Task not found with id of ${task.list}`, 404),
    )
  }
  const list = await ListModel.findById(task.list)
  if (!list) {
    return next(
      new ErrorResponse(`List not found with id of ${task.list}`, 404),
    )
  }
  const checkAuthorize = await list.checkAuthorize(req.user.id)
  if (checkAuthorize.authorize) {
    res.status(200).json({ success: true, data: task })
  } else {
    next(new ErrorResponse('You are not authorized to view this list', 401))
  }
})
