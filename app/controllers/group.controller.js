const router = require('express').Router();
const adminMiddleware = require('../middleware/admin.middleware');
const Group = require('../models/group.model'); // Import the Group model
const generateUniqueInviteCode = require('../utils/generateGroupInviteCode');

// Get a single group by ID
router.delete('/remove-member/:id', async (req, res) => {
  try {
    const UserID = req.user.id;
    const groupId = req.params.id;
    const memberID = req.query.memberID;

    const removeMember = await Group.findOneAndUpdate(
      { _id: groupId, members: { $elemMatch: { memberID: UserID, memberRole: "ADMIN" } } },
      {
        $set: {
          members: { isLeft: true }
        }
      },
      { new: true, runValidators: true }
    );

    // const group = await Group.findById(groupId);
    if (!removeMember) {
      return res.status(404).json({ error: 'Group not found or you don\'t have access to the group' });
    }
    res.json(removeMember);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve group ' + error.message });
  }
});

// Add new member group by ID
router.post('/add-member/:id', async (req, res) => {
  try {
    const UserID = req.user.id;
    const groupId = req.params.id;
    const members = req.body;

    const addMember = await Group.findOneAndUpdate(
      { _id: groupId, members: { $elemMatch: { memberID: UserID, memberRole: "ADMIN" } } },
      {
        $push: { members: { $each: members } }
      },
      { new: true, runValidators: true }
    );

    // const group = await Group.findById(groupId);
    if (!addMember) {
      return res.status(404).json({ error: 'Group not found or you don\'t have access to the group' });
    }
    res.json(addMember);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve group ' + error.message });
  }
});

// Create a new group
router.post('/', async (req, res) => {
  try {
    const id = req.user.id;
    const groupData = req.body;
    let { details, members = [] } = groupData;
    members = [
      {
        memberID: id,
        memberRole: "ADMIN"
      },
      ...members
    ];

    // Generating an Invite code for the group with length of "5"
    const inviteCode = await generateUniqueInviteCode(5);

    const newGroup = await Group.create({ ...groupData, details: { ...details, createdBy: id, updatedBy: id, inviteCode }, members });
    res.status(201).json(newGroup);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create group ' + error.message });
  }
});

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
    });
    res.json(groups);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve groups ' + error.message });
  }
});

// Get a single group by ID
router.get('/:id', adminMiddleware, async (req, res) => {
  try {
    const groupId = req.params.id;
    const group = await Group.findById(groupId).populate({
      path: 'members.memberID',
      select: 'name avatar'
    });

    // const group = await Group.findById(groupId);
    if (!group) {
      return res.status(404).json({ error: 'Group not found or you don\'t have access to the group' });
    }
    res.json(group);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve group ' + error.message });
  }
});

// Get Joined & Created groups of Current User 
router.get('/', adminMiddleware, async (req, res) => {
  try {
    const groups = await Group.find();
    res.json(groups);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve groups ' + error.message });
  }
});

// Update a group by ID
router.patch('/:id', async (req, res) => {
  try {
    const groupId = req.params.id;
    const groupData = req.body;
    const UserID = req.user.id;

    const updatedGroup = await Group.findOneAndUpdate(
      { _id: groupId, members: { $elemMatch: { memberID: UserID, memberRole: "ADMIN" } } },
      {
        $set: { ...groupData }
      },
      { new: true, runValidators: true }
    );

    if (!updatedGroup) {
      return res.status(404).json({ error: 'Group not found or you don\'t have access to the group' });
    }
    res.json(updatedGroup);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update group ' + error.message });
  }
});

// Delete a group by ID
router.delete('/:id', async (req, res) => {
  try {
    const groupId = req.params.id;
    const deletedGroup = await Group.findOneAndRemove({
      _id: groupId,
      'members': { $elemMatch: { memberID: req.user.id, memberRole: 'ADMIN' } }
    });

    if (!deletedGroup) {
      return res.status(404).json({ error: 'Group not found or you don\'t have access to the group' });
    }
    res.status(200).json({ message: 'Group deleted successfully', deletedGroup });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete group ' + error.message });
  }
});

module.exports = router;