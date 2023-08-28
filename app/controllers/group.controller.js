const router = require('express').Router();
const Group = require('../models/group.model') // Import the Group model

// Create a new group
router.post('/', async (req, res) => {
  try {
    const id = req.user.id;
    const groupData = req.body;
    let { details, members } = groupData;

    console.log(...members)
    members = [
      {
        memberID: id,
        memberRole: "ADMIN"
      },
      ...members
    ]

    const newGroup = await Group.create({ ...groupData, details: { createdBy: id, updatedBy: id, ...details }, members });
    res.status(201).json(newGroup);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create group!!! ' + error.message });
  }
});

// Get all groups
router.get('/', async (req, res) => {
  try {
    const query = { details: { createdBy: req.user.id }, ...req.query }
    log.info(query);
    const groups = await Group.find(query);
    res.json(groups);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve groups ' + error.message });
  }
});

// Get a single group by ID
// router.get('/:id', async (req, res) => {
//   try {
//     const groupId = req.params.id;
//     const group = await Group.findById(groupId);
//     if (!group) {
//       return res.status(404).json({ error: 'Group not found' });
//     }
//     res.json(group);
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to retrieve group ' + error.message });
//   }
// });

// Update a group by ID
router.put('/:id', async (req, res) => {
  try {
    const groupId = req.params.id;
    const groupData = req.body;
    const updatedGroup = await Group.findByIdAndUpdate(groupId, groupData, { new: true });
    if (!updatedGroup) {
      return res.status(404).json({ error: 'Group not found' });
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
    const deletedGroup = await Group.findByIdAndDelete(groupId);
    if (!deletedGroup) {
      return res.status(404).json({ error: 'Group not found' });
    }
    res.status(200).json({ message: 'Group deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete group ' + error.message });
  }
});

module.exports = router;