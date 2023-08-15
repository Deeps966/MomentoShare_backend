const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    trim: true,
    lowercase: true,
    match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, // Email pattern
    required: true
  },
  mobile: {
    type: Number,
    required: true,
    unique: true,
    validate: {
      validator: function (value) {
        // Custom validator to check that the mobile number is a 10-digit number
        return /^[0-9]{10}$/.test(value.toString());
      },
      message: 'Mobile number must be a 10-digit number'
    }
  },
  first_name: {
    type: String,
    required: true,
    maxlength: 20
  },
  last_name: {
    type: String,
    maxlength: 20
  },
  gender: {
    type: String,
    required: true,
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
    minlength: 8
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