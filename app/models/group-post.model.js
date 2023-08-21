const mongoose = require('mongoose')

const groupPostSchema = new mongoose.Schema({
  group_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Group', // Reference to the Group model
    required: true,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true,
  },
  image_url: {
    type: String,
    unique: true,
    required: true,
    maxlength: 255,
  },
  image_filetype: {
    type: String,
    enum: ['jpg', 'jpeg', 'png', 'gif'],
    maxlength: 20,
  },
  image_size: {
    type: Number,
  },
});

const GroupPost = mongoose.model('GroupPost', groupPostSchema);

module.exports = GroupPost;