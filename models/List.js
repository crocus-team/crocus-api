const mongoose = require('mongoose')

const ListSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      maxlength: [32, 'Name can be up to 32 characters'],
      trim: true,
    },
    color: {
      type: String,
      match: [
        /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3}|[A-Fa-f0-9]{8})|$/,
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
  },
  {
    toJSON: { virtuals: true },
  },
)

// cascade delete tasks when a list is deleted
ListSchema.pre('remove', async function (next) {
  await this.model('Task').deleteMany({ list: this._id })
})

// check authorize
ListSchema.methods.checkAuthorize = async function (userId) {
  if (this.owner_user == userId) {
    return { authorize: true, owner: true }
  } else if (this.shared_users.includes(userId)) {
    return { authorize: true, owner: false }
  } else {
    return { authorize: false, owner: false }
  }
}

ListSchema.virtual('tasks', {
  ref: 'Task',
  localField: '_id',
  foreignField: 'list',
  justOne: false,
})

module.exports = mongoose.model('List', ListSchema)
