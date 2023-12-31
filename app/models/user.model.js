const mongoose = require("mongoose")
const { isValidPhoneNumber, isValidEmailDomain, isValidEmail, isValidBase64 } = require("../utils/helper")

const UserSchema = new mongoose.Schema({
  mail: {
    type: String,
    unique: true,
    trim: true,
    lowercase: true,
    validate: [
      {
        validator: isValidEmail,
        message: 'Invalid email ID',
      },
      {
        validator: isValidEmailDomain,
        message: 'Invalid email domain i.e. "abc@xyz.com"',
      }
    ],
    required: true
  },
  password: {
    type: String,
    required: true,
    minlength: 10
  },
  phoneNumber: {
    type: Number,
    validate: {
      validator: isValidPhoneNumber,
      message: 'Mobile number must be a 10-digit number'
    }
  },
  userType: {
    type: String,
    enum: ["ADMIN", "USER"],
    default: "USER"
  },
  oAuth: {
    authID: {
      type: String,
      trim: true,
    },
    authProvider: {
      type: String,
      enum: ["BASIC", 'GOOGLE', 'FACEBOOK', 'APPLE'],
      default: "BASIC",
    },
  },
  details: {
    isMailVerified: {
      type: Boolean,
      default: false
    },
    isProfileVerified: {
      type: Boolean,
      default: false
    },
    isActive: {
      type: Boolean,
      default: true
    },
    isReported: {
      type: Boolean,
      default: false
    },
    isBlocked: {
      type: Boolean,
      default: false
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: {
      type: Date,
      default: Date.now
    }
  },
  profile: {
    name: {
      type: String,
    },
    lastName: {
      type: String,
    },
    avatar: {
      type: String,
      // validate: {
      //   validator: isValidBase64,
      //   message: 'Avatar must be a valid Base64 encoded string'
      // },
    },
    gender: {
      type: String,
      enum: ['MALE', 'FEMALE', 'OTHER']
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: {
      type: Date,
      default: Date.now
    }
  }
})

const User = mongoose.model("User", UserSchema)

module.exports = User