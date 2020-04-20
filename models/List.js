const mongoose = require('mongoose')

const ListSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    maxlength: [32, 'Name can be up to 32 characters'],
    trim: true,
  },
  color: {
    type: String,
    match: [
      /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,
      'Please add a valid hex color',
    ],
    default: '#333',
  },
  owner_user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  shared_users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
})
