const ErrorResponse = require('../helpers/errorResponse')
const asyncHandler = require('../middlewares/async')
const TaskModel = require('../models/Task')
const ListModel = require('../models/List')

// create new task [POST,PROTECTED] (/task/)
exports.addTask = asyncHandler(async (req, res, next) => {
  const task = await TaskModel.create(req.body)
  res.status(200).json({ success: true, data: task })
})

// list my all tasks [GET,PROTECTED] (/task/)
exports.allTasks = asyncHandler(async (req, res, next) => {
  let lists = await ListModel.find()
    .or([{ owner_user: req.user.id }, { shared_users: req.user.id }])
    .populate('tasks')
  let tasks = []
  const lists_data = JSON.parse(JSON.stringify(lists))
  await lists_data.map((list) => {
    console.log(list.task)
    tasks = [...tasks, ...list.tasks]
  })
  res.status(200).json({
    success: true,
    data: tasks,
  })
})

// get task details [GET,PROTECTED] (/task/:taskId)
exports.taskDetails = asyncHandler(async (req, res, next) => {
  const task = await TaskModel.findById(req.params.taskId).populate('list')
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

// update task [PUT,PROTECTED] (/task/:taskId)
exports.updateTask = asyncHandler(async (req, res, next) => {
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
    ;(task.title = req.body.title),
      (task.content = req.body.content),
      (task.expire_date = req.body.expire_date),
      (task.complate = req.body.complate)
    await task.save()
    res.status(200).json({ success: true, data: task })
  } else {
    next(new ErrorResponse('You are not authorized to view this list', 401))
  }
})

// delete task [DELETE,PROTECTED] (/task/:taskId)
exports.deleteTask = asyncHandler(async (req, res, next) => {
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
    await task.remove()
    res.status(200).json({ success: true, data: {} })
  } else {
    next(new ErrorResponse('You are not authorized to view this list', 401))
  }
})
