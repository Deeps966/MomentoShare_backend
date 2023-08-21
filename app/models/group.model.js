const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true,
  },
  updated_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true,
  },
  name: {
    type: String,
    required: true,
    maxlength: 50,
  },
  description: {
    type: String,
    maxlength: 255,
  },
  image: {
    type: String, // You might want to store the image as a URL or a path
    maxlength: 255,
  },
  group_type: {
    type: String,
    enum: ['Public', 'Private'],
    required: true,
    maxlength: 20,
  },
  members_count: {
    type: Number,
    required: true,
    default: 1,
  },
  invite_code: {
    type: String,
    maxlength: 50,
  },
  anyone_can_join: {
    type: Boolean,
    default: false,
  },
  anyone_can_change: {
    type: Boolean,
    default: false,
  },
  hide_delete_folder: {
    type: Boolean,
    default: false,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

const Group = mongoose.model('Group', groupSchema);

module.exports = Group;