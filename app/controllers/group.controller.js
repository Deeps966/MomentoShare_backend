const router = require('express').Router()
const mongoose = require('mongoose')
const adminMiddleware = require('../middleware/admin.middleware')
const Group = require('../models/group.model') // Import the Group model
const generateUniqueInviteCode = require('../utils/generateGroupInviteCode')
const { validateUsers } = require('../utils/group.helper')


// Get a single group by ID
router.delete('/remove-member/:id', async (req, res) => {
  try {
    const UserID = req.user.id
    const groupId = req.params.id
    const memberID = req.query.memberID

    const removeMember = await Group.findOneAndUpdate(
      { _id: groupId, members: { $elemMatch: { memberID: UserID, memberRole: "ADMIN" } } },
      {
        $set: {
          "members.$[elem].isLeft": true
        }
      },
      {
        arrayFilters: [{ "elem.memberID": memberID }],
        new: true,
        runValidators: true
      }
    )

    if (!removeMember) return res.status(404).json({ error: 'Group not found or you don\'t have access to the group' })
    else if (_.filter(removeMember.members, (m) => m.memberID == memberID).length == 0) return res.status(404).json({ error: 'Member not found in group with memberID: ' + memberID })

    res.json(removeMember)
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve group ' + error.message })
  }
})

// Add new member group by Group ID
router.post('/add-members/:id', async (req, res) => {
  try {
    const UserID = req.user.id
    const groupId = req.params.id
    const members = req.body

    const isValidUsers = await validateUsers(members, groupId)
    if (isValidUsers.error) return res.status(404).json(isValidUsers)

    // const groupArr = await Group.findOne({ _id: groupId })
    // const existingMemberIDs = groupArr.members.map(member => member.memberID.toString())

    // const membersCount = members.filter(member => existingMemberIDs.includes(member.memberID))
    // if (membersCount.length > 0) return res.status(400).json({ error: "Member already exists in the group" })

    const addMember = await Group.findOneAndUpdate(
      { _id: groupId, members: { $elemMatch: { memberID: UserID, memberRole: "ADMIN" } } },
      {
        $push: { members: { $each: members } }
      },
      { new: true, runValidators: true }
    )

    if (!addMember) {
      return res.status(404).json({ error: 'Group not found or you don\'t have access to the group' })
    }
    res.json(addMember)
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve group ' + error.message })
  }
})

// -------------------------------------------------Figure OUT Whats the issue in Creating new group with required fields---------------------------------------
// Create a new group
router.post('/', async (req, res) => {
  try {
    // const userID = new mongoose.Types.ObjectId(req.user.id);
    const userID = (req.user.id);

    const groupData = req.body
    let { details, members = [] } = groupData
    members = [
      {
        memberID: userID,
        memberRole: "ADMIN"
      },
      ...members
    ]

    const isValidUsers = await validateUsers(members)
    console.log(isValidUsers)
    if (isValidUsers.error) return res.status(404).json(isValidUsers)

    // Generating an Invite code for the group with length of "5"
    const inviteCode = await generateUniqueInviteCode(5)
    const group = new Group({
      ...groupData,
      createdBy: userID,
      updatedBy: userID,
      details: { inviteCode },
      members
    })

    const newGroup = await group.save({ runValidators: true })

    res.status(201).json(newGroup)
  } catch (error) {
    res.status(500).json({ error: 'Failed to create group ' + error.message })
  }
})

// Get Joined & Created groups of Current User 
router.get('/my-groups', async (req, res) => {
  try {
    const groups = await Group.find({
      $or: [
        { 'details.createdBy': req.user.id },
        { 'members': { $elemMatch: { 'memberID': req.user.id } } }
      ]
    }).populate({
      path: 'members.memberID',
      select: 'name avatar'
    })
    res.json(groups)
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve groups ' + error.message })
  }
})

// Get a single group by ID
router.get('/:id', adminMiddleware, async (req, res) => {
  try {
    const groupId = req.params.id
    const group = await Group.findById(groupId).populate({
      path: 'members.memberID',
      select: 'name avatar'
    })

    // const group = await Group.findById(groupId)
    if (!group) {
      return res.status(404).json({ error: 'Group not found or you don\'t have access to the group' })
    }
    res.json(group)
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve group ' + error.message })
  }
})

// Get Joined & Created groups of Current User 
router.get('/', adminMiddleware, async (req, res) => {
  try {
    const groups = await Group.find()
    res.json(groups)
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve groups ' + error.message })
  }
})

// Update a group by ID
router.patch('/:id', async (req, res) => {
  try {
    const groupId = req.params.id
    const groupData = req.body
    const userID = req.user.id

    const isValidUsers = await validateUsers(groupData.members, groupId)
    if (isValidUsers.error) return res.status(404).json(isValidUsers)

    const updatedGroup = await Group.findOneAndUpdate(
      { _id: groupId, members: { $elemMatch: { memberID: userID, memberRole: "ADMIN" } } },
      {
        $set: { ...groupData, updatedBy: userID }
      },
      { new: true, runValidators: true }
    )

    if (!updatedGroup) {
      return res.status(404).json({ error: 'Group not found or you don\'t have access to the group' })
    }
    res.json(updatedGroup)
  } catch (error) {
    res.status(500).json({ error: 'Failed to update group ' + error.message })
  }
})

// Delete a group by ID
router.delete('/:id', async (req, res) => {
  try {
    const groupId = req.params.id
    const deletedGroup = await Group.findOneAndRemove({
      _id: groupId,
      'members': { $elemMatch: { memberID: req.user.id, memberRole: 'ADMIN' } }
    })

    if (!deletedGroup) {
      return res.status(404).json({ error: 'Group not found or you don\'t have access to the group' })
    }
    res.status(200).json({ message: 'Group deleted successfully', deletedGroup })
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete group ' + error.message })
  }
})

module.exports = router