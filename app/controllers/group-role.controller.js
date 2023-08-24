const express = require('express');
const router = express.Router();
const GroupRole = require('../models/group-role.model'); // Import the GroupRole model

// Create a new group role
router.post('/', async (req, res) => {
  try {
    const roleData = req.body;
    const newRole = await GroupRole.create(roleData);
    res.status(201).json(newRole);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create group role ' + error.message });
  }
});

// Get all group roles
router.get('/', async (req, res) => {
  try {
    const roles = await GroupRole.find();
    res.json(roles);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve group roles ' + error.message });
  }
});

// Get a single group role by ID
router.get('/:id', async (req, res) => {
  try {
    const roleId = req.params.id;
    const role = await GroupRole.findById(roleId);
    if (!role) {
      return res.status(404).json({ error: 'Group role not found' });
    }
    res.json(role);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve group role ' + error.message });
  }
});

// Update a group role by ID
router.put('/:id', async (req, res) => {
  try {
    const roleId = req.params.id;
    const roleData = req.body;
    const updatedRole = await GroupRole.findByIdAndUpdate(roleId, roleData, { new: true });
    if (!updatedRole) {
      return res.status(404).json({ error: 'Group role not found' });
    }
    res.json(updatedRole);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update group role ' + error.message });
  }
});

// Delete a group role by ID
router.delete('/:id', async (req, res) => {
  try {
    const roleId = req.params.id;
    const deletedRole = await GroupRole.findByIdAndDelete(roleId);
    if (!deletedRole) {
      return res.status(404).json({ error: 'Group role not found' });
    }
    res.status(200).json({ message: 'Group role deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete group role ' + error.message });
  }
});

module.exports = router;
