const Group = require("../models/group.model")

const validateGroupAccess = async (userID, groupID) => {
  const groupDetails = await Group.findById(groupID)
  if (!groupDetails) return { error: "Group Not Found for ID: " + groupID }

  const member = _.find(groupDetails.members, (m) => userID == m.memberID.toString())

  if (!member) return { error: "User don't have the access of group for ID: " + groupID }
  return { error: false, groupDetails }
}

module.exports = {
  validateGroupAccess
}