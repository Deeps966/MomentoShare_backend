const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 50,
  },
  groupType: {
    type: String,
    enum: ['PUBLIC', 'PRIVATE'],
    required: true,
  },
  description: {
    type: String,
    maxlength: 255,
  },
  groupPhoto: {
    type: String, // You might want to store the image as a URL or a path
  },
  members: [
    {
      memberID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true,
      },
      memberRole: {
        type: String,
        enum: ["ADMIN", "MEMBER"],
        required: true
      },
      joinedAt: {
        type: Date,
        default: Date.now,
      },
      isLeft: {
        type: Boolean,
        default: false,
      },
      isNotificationMute: {
        type: Boolean,
        default: false,
      },
    }
  ],
  photos: [
    {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'GroupPost', // Reference to the GroupPost model
        required: true,
      },
    }
  ],
  details: {
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to the User model
      required: true,
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to the User model
      required: true,
    },
    membersCount: {
      type: Number,
      default: 1,
    },
    inviteCode: {
      type: String,
      maxlength: 50,
    },
    isAnyoneCanJoin: {
      type: Boolean,
      default: false,
    },
    isAnyoneCanChange: {
      type: Boolean,
      default: false,
    },
    isHideDeleteFolder: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
});

const Group = mongoose.model('Group', groupSchema);

module.exports = Group;