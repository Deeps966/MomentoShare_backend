const mongoose = require("mongoose");

const emailTopDomainValidator = (value) => {
  const allowedDomains = ['gmail.com', 'yahoo.com', 'outlook.com', 'icloud.com', 'hotmail.com', 'live.com']; // Add more allowed domains as needed

  const emailParts = value.split('@');
  const domain = emailParts[emailParts.length - 1];

  return allowedDomains.includes(domain.toLowerCase());
};

const UserSchema = new mongoose.Schema({
  auth_id: {
    type: String,
    trim: true,
    unique: true
  },
  auth_provider: {
    type: String,
    enum: ["basic", 'google', 'facebook', 'apple'],
    default: "basic",
    required: true
  },
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
  mail_verified: {
    type: Boolean,
    default: false
  },
  mobile: {
    type: Number,
    required: false,
    unique: true,
    validate: {
      validator: function (value) {
        // Custom validator to check that the mobile number is a 10-digit number
        return /^[0-9]{10}$/.test(value.toString());
      },
      message: 'Mobile number must be a 10-digit number'
    }
  },
  name: {
    type: String,
    required: true,
    maxlength: 50
  },
  gender: {
    type: String,
    required: false,
    enum: ['male', 'female', 'other']
  },
  username: {
    type: String,
    unique: true,
    lowercase: true,
    required: true,
    trim: true,
    maxlength: 50
  },
  password_hash: {
    type: String,
    required: true,
    minlength: 10
  },
  avatar: {
    type: String,
    validate: {
      validator: function (value) {
        // Custom validator to check Base64 encoding
        return /^data:image\/(jpeg|png|gif);base64,/.test(value);
      },
      message: 'Avatar must be a valid Base64 encoded string'
    }
  },
  acc_active: {
    type: Boolean,
    default: true
  },
  is_reported: {
    type: Boolean,
    default: false
  },
  is_blocked: {
    type: Boolean,
    default: false
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model("User", UserSchema);

module.exports = User;