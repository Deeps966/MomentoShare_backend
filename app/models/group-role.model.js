const mongoose = require('mongoose');

const groupRoleSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
    maxlength: 20,
  },
  type: {
    type: String,
    required: true,
    enum: ['Admin', 'Group_Owner', 'Member', 'Viewer', 'Public_User', 'Premium_User', 'Verified_User'],
    maxlength: 20,
  },
});

const GroupRole = mongoose.model('GroupRole', groupRoleSchema);

module.exports = GroupRole;
