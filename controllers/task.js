const ErrorResponse = require('../helpers/errorResponse')
const asyncHandler = require('../middlewares/async')
const TaskModel = require('../models/Task')

// create new task [POST,PROTECTED] (/task/)
exports.addTask = asyncHandler(async (req, res, next) => {
  const task = await TaskModel.create(req.body)
  res.status(200).json({ success: true, data: task })
})
