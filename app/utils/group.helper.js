const Group = require("../models/group.model")
const User = require('../models/user.model')

const validateGroupAccess = async (userID, groupID) => {
  try {
    const groupData = await Group.findById(groupID)
    if (!groupData) return { error: "Group Not Found for ID: " + groupID }

    const member = _.find(groupData.members, (m) => m.memberID.toString() == userID)

    if (!member) return { error: "User don't have the access of group for ID: " + groupID }
    return { error: false, groupData }

  } catch (err) {
    return { error: "Error Validating Group access " + err.message }
  }
}

const validateUsers = async (members, groupID) => {
  try {
    const hasDuplicates = !_.isEqual(_.uniq(members, 'memberID'), members);
    if (hasDuplicates) return { error: 'Duplicate members found' }

    // Extract all memberIDs from the members array
    const memberIDs = members.map(member => member.memberID);

    // Use $in to find all users with matching IDs
    const userData = await User.find({
      _id: { $in: memberIDs }
    });

    // Check if any members were not found
    const missingMembers = memberIDs.filter(memberID => !userData.some(user => user._id.equals(memberID)));

    if (missingMembers.length > 0) return { error: "Users not found for the following memberIDs: " + missingMembers.join(', ') };


    if (groupID) {
      const groupData = await Group.findById(groupID)
      if (!groupData) return { error: "Group not found" }

      const existingMembers = memberIDs.filter(memberID => !groupData.members.some(user => user._id.equals(memberID)));

      if (existingMembers.length > 0) return { error: "Members already exists in group for the following memberIDs: " + existingMembers.join(', ') };

      return { userData, groupData }
    }

    return { userData };
  } catch (err) {
    return { error: "Error validating Members " + err.message };
  }
};

const checkDuplicateMember = async (members) => {
  try {

  } catch (error) {
    return { error: "Error validating user existence" };
  }
}


module.exports = {
  validateGroupAccess,
  validateUsers
}