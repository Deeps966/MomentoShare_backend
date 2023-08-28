const router = require('express').Router();
const User = require('../models/user.model')
const adminMiddleware = require("../middleware/admin.middleware")

// Create Profile by User id
router.post('/create-profile', async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const profileCount = user.profiles.length;
    const profileID = profileCount + 1;
    let isPrimary = false;

    if (profileCount == 0) {
      isPrimary = true
    }

    const profile = await User.findOneAndUpdate(
      { _id: req.user.id },
      { $push: { profiles: { ...req.body, profileID, isPrimary } } },
      { new: true, runValidators: true }
    );

    res.json(profile);
  } catch (error) {
    res.status(500).json({ error: 'Failed to Create profile ' + error.message });
  }
});



// Get Primary profile data
router.get('/my-profile', async (req, res) => {
  try {
    const user = await User.findOne(
      { _id: req.user.id },
      { 'profiles': { $elemMatch: { isPrimary: true } } }
    )

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to Get profile by id ' + error.message });
  }
});

// Get Profile by profile id
router.get('/get-profile/:id', async (req, res) => {
  try {
    const profileID = req.params.id
    const user = await User.findOne(
      { _id: req.user.id },
      { 'profiles': { $elemMatch: { _id: profileID } } }
    )

    if (user.profiles.length == 0) return res.status(404).json({ error: "Profile Not found" })

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to Get profile by id ' + error.message });
  }
});

// Get all users
router.get('/', adminMiddleware, async (req, res) => {
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
    if (req.user.userType === "USER" && id !== req.user.id) return res.status(403).json({ message: "Don't have access to get other user details" })

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
    if (req.user.userType === "USER" && id !== req.user.id) return res.status(403).json({ message: "Don't have access to update other user details" })

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
    if (req.user.userType === "USER" && id !== req.user.id) return res.status(403).json({ message: "Don't have access to delete other user details" })

    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user ' + error.message });
  }
});

module.exports = router;