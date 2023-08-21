const express = require('express');
const router = express.Router();
const GroupMember = require('../models/group-member.model'); // Import the GroupMember model

// Create a new group member
router.post('/', async (req, res) => {
  try {
    const memberData = req.body;
    const newMember = await GroupMember.create(memberData);
    res.status(201).json(newMember);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create group member ' + error.message });
  }
});

// Get all group members
router.get('/', async (req, res) => {
  try {
    const members = await GroupMember.find();
    res.json(members);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve group members ' + error.message });
  }
});

// Get a single group member by ID
router.get('/:id', async (req, res) => {
  try {
    const memberId = req.params.id;
    const member = await GroupMember.findById(memberId);
    if (!member) {
      return res.status(404).json({ error: 'Group member not found' });
    }
    res.json(member);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve group member ' + error.message });
  }
});

// Update a group member by ID
router.put('/:id', async (req, res) => {
  try {
    const memberId = req.params.id;
    const memberData = req.body;
    const updatedMember = await GroupMember.findByIdAndUpdate(memberId, memberData, { new: true });
    if (!updatedMember) {
      return res.status(404).json({ error: 'Group member not found' });
    }
    res.json(updatedMember);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update group member ' + error.message });
  }
});

// Delete a group member by ID
router.delete('/:id', async (req, res) => {
  try {
    const memberId = req.params.id;
    const deletedMember = await GroupMember.findByIdAndDelete(memberId);
    if (!deletedMember) {
      return res.status(404).json({ error: 'Group member not found' });
    }
    res.json({ message: 'Group member deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete group member ' + error.message });
  }
});

module.exports = router;
