const router = require('express').Router();
const User = require('../models/user.model')

// Create a new user
router.post('/', async (req, res) => {
  try {
    const createdUser = await User.create(req.body);
    res.status(201).json(createdUser);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user!!! ' + error.message });
  }
});

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find({ ...req.query });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve users ' + error.message });
  }
});

// Get a single user by ID
router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve user ' + error.message });
  }
});

// Update a user by ID
router.patch('/:id', async (req, res) => {
  try {
    const id = req.params.id;

    // `new: true` The method returns the updated document after applying the update operation.
    const updatedUser = await User.findOneAndUpdate({ _id: id }, { $set: req.body }, { new: true, runValidators: true })

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user ' + error.message });
  }
});

// Delete a user by ID
router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user ' + error.message });
  }
});

// Get User by its username 
router.get('/username/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findOne({ username: id });

    if (!user) {
      return res.status(404).json({ error: 'User does not exists with this Username' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user ' + error.message });
  }
});

// Validates Username exists
router.get('/check-username/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findOne({ username: id });

    if (!user) {
      return res.status(200).json({ isUsernameExists: false, message: 'User does not exists with this Username' });
    }
    res.status(200).json({ isUsernameExists: true, message: 'User exists with this Username' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user ' + error.message });
  }
});

module.exports = router;