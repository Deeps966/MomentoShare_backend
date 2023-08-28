const mongoose = require("mongoose");

const emailTopDomainValidator = (value) => {
  const allowedDomains = ['gmail.com', 'yahoo.com', 'outlook.com', 'icloud.com', 'hotmail.com', 'live.com']; // Add more allowed domains as needed

  const emailParts = value.split('@');
  const domain = emailParts[emailParts.length - 1];

  return allowedDomains.includes(domain.toLowerCase());
};

const UserSchema = new mongoose.Schema({
  mail: {
    type: String,
    unique: true,
    trim: true,
    lowercase: true,
    // match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, // Email pattern
    validate: [
      {
        validator: (value) => /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(value),
        message: 'Invalid email format',
      },
      {
        validator: emailTopDomainValidator,
        message: 'Invalid email domain',
      }
    ],
    required: true
  },
  password: {
    type: String,
    required: true,
    minlength: 10
  },
  mobile: {
    type: Number,
    unique: true,
    validate: {
      validator: function (value) {
        // Custom validator to check that the mobile number is a 10-digit number
        return /^[0-9]{10}$/.test(value.toString());
      },
      message: 'Mobile number must be a 10-digit number'
    }
  },
  username: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    maxlength: 50
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
      unique: true
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
  profileList: [
    {
      isPrimary: {
        type: Boolean,
        default: false
      },
      firstName: {
        type: String,
      },
      lastName: {
        type: String,
      },
      image: {
        type: String,
        validate: {
          validator: function (value) {
            // Custom validator to check Base64 encoding
            return /^data:image\/(jpeg|png|gif);base64,/.test(value);
          },
          message: 'Avatar must be a valid Base64 encoded string'
        }
      },
      gender: {
        type: String,
        enum: ['MALE', 'FEMALE', 'OTHER']
      },
      groupList: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Group', // Reference to the Group model
          required: true,
        },
      ],
      myPhotos: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'GroupPost', // Reference to the GroupPost model
          required: true,
        }
      ]
    }
  ]
});

const User = mongoose.model("User", UserSchema);

module.exports = User;