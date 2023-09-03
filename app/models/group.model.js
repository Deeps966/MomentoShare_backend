const mongoose = require('mongoose')

const GroupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 50,
  },
  groupType: {
    type: String,
    enum: ['PUBLIC', 'PRIVATE'], // PUBLIC: Big group, Members can only see their own photos, Private: Small group, Members can see all photos
    required: true,
  },
  description: {
    type: String,
    maxlength: 255,
  },
  groupPhoto: {
    type: String, // You might want to store the image as a URL or a path
  },
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
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
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
      uploadAccess: {
        type: Boolean,
        default: false
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
  details: {
    inviteCode: {
      type: String,
      maxlength: 50,
    },
    sortBy: {
      type: String,
      enum: ["UPLOAD-ASC", "UPLOAD-DSC", "NAME-ASC", "NAME-DSC", "CAPTURETIME-ASC", "CAPTURETIME-DSC"],
      default: "UPLOAD-ASC"
    },
    isAnyoneCanUpload: {
      type: Boolean,
      default: true
    },
    isAnyoneCanJoinWithLink: {
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
  },
})

const Group = mongoose.model('Group', GroupSchema)

module.exports = Group