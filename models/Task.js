const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    maxlength: [300, 'Title can be up to 300 characters'],
    trim: true,
  },
  content: {
    type: String,
    trim: true,
  },
  create_date: {
    type: Date,
    default: Date.now,
  },
  expire_date: {
    type: Date,
  },
  list: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'List',
    required: [true, 'Task must be in to a list'],
  },
})

module.exports = mongoose.model('Task', TaskSchema)
