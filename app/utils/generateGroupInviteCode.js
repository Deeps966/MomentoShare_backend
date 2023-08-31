const crypto = require('crypto'); // Node.js built-in module for generating random bytes
const Group = require('../models/group.model');

// Function to generate a random string of specified length
const generateRandomString = (length) => {
  return crypto.randomBytes(Math.ceil(length / 2)).toString('hex').slice(0, length);
}

// Function to generate a unique invite code for a group
const generateUniqueInviteCode = async (CODE_LENGTH) => {
  let inviteCode = generateRandomString(CODE_LENGTH); // You can adjust the length of the code

  // Check if the invite code is unique
  const existingGroup = await Group.findOne({ details: { inviteCode } });

  // If the code is not unique, regenerate it
  while (existingGroup) {
    inviteCode = generateRandomString(CODE_LENGTH);
    existingGroup = await Group.findOne({ details: { inviteCode } });
  }

  return inviteCode;
}


module.exports = generateUniqueInviteCode;