const mongoose = require('mongoose')

const ShareSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  list: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'List',
    required: true,
  },
  status: {
    type: Number,
    default: 0,
  },
  sending_date: {
    type: Date,
    default: Date.now(),
  },
})

module.exports = mongoose.model('Share', ShareSchema)
