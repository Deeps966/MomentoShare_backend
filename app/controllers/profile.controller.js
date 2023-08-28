const router = require('express').Router();
const User = require('../models/user.model')

// Upload Avatar by Face Detection
router.post('/upload-avatar', async (req, res) => {
  try {
    res.status(400).json({ error: "Upload image on Cloud Storage is still pending" });
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

// Update Profile by User id
router.patch('/:id', async (req, res) => {
  try {
    const profileID = req.params.id;

    const profile = await User.findOneAndUpdate(
      { _id: req.user.id, 'profiles._id': profileID },
      { $set: { 'profiles.$': { ...req.body } } },
      { new: true, runValidators: false }
    );

    res.json(profile);
  } catch (error) {
    res.status(500).json({ error: 'Failed to Update profile ' + error.message });
  }
});


// Get Profile by profile id
router.get('/:id', async (req, res) => {
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

// Get All profiles data
router.get('/', async (req, res) => {
  try {
    const user = await User.findById(req.user.id)

    res.json(user.profiles);
  } catch (error) {
    res.status(500).json({ error: 'Failed to Get profile by id ' + error.message });
  }
});

// Create Profile by User id
router.post('/', async (req, res) => {
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

module.exports = router;