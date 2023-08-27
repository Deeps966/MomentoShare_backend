const mongoose = require('mongoose')

const groupPostSchema = new mongoose.Schema({
  groupID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Group', // Reference to the Group model
    required: true,
  },
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true,
  },
  mediaUrl: {
    type: String,
    unique: true,
    required: true, 
  },
  mediaFiletype: {
    type: String,
    enum: ['jpg', 'jpeg', 'png', 'gif'],
    required: true
  },
  mediaFileSize: {
    type: Number,
    required: true
  },
});

const GroupPost = mongoose.model('GroupPost', groupPostSchema);

module.exports = GroupPost;