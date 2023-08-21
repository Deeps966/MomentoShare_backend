const mongoose = require('mongoose');

const groupMemberSchema = new mongoose.Schema({
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
  role_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'GroupRole', // Reference to the GroupRole model
    required: true,
  },
  joined_at: {
    type: Date,
    default: Date.now,
  },
  group_left: {
    type: Boolean,
    default: false,
  },
  notification_type: {
    type: String,
    enum: ['Mute', 'UnMute'],
  },
});

const GroupMember = mongoose.model('GroupMember', groupMemberSchema);

module.exports = GroupMember;