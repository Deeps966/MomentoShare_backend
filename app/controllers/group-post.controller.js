const express = require('express')
const router = express.Router()
const fs = require('fs')

const GroupPost = require('../models/group-post.model') // Import the GroupPost model
let { uploadImage } = require('../middleware/multer.middleware')
const Group = require('../models/group.model')
const { validateGroupAccess } = require('../utils/group.helper')

const validateGroupID = async (req, res, next) => {
  try {
    const groupID = req.query.groupID
    if (!groupID) return res.status(404).json({ error: "groupID not found in URL Query" })

    const hasValidAccess = await validateGroupAccess(req.user.id, groupID)
    if (hasValidAccess.error) return res.status(403).json(hasValidAccess);

    req.fileDir = groupID
    next()

  } catch (error) {
    return res.status(500).json({ error: "Group id Validation failed " + error.message })
  }
}

// Create a new group post
router.post('/', validateGroupID, uploadImage.single('image'), async (req, res) => {
  try {
    const groupID = req.query.groupID

    if (!req.file) return res.status(500).json({ error: "Please upload any file" })

    const fileURI = req.file.path
    mediaUrl = process.env.SERVER_URL + "/" + fileURI
    filePath = req.file.destination + req.file.filename

    // Handle the uploaded file if needed...
    const newPost = await GroupPost.create({
      groupID,
      userID: req.user.id,
      path: filePath,
      mediaUrl,
      mediaFileSize: req.file.size,
      mediaFiletype: req.file.mimetype
    })

    res.status(201).json(newPost)
  } catch (error) {
    res.status(500).json({ error: 'Failed to create group post ' + error.message })
  }
})

// Get all group posts By GroupID
router.get('/', async (req, res) => {
  try {
    const { groupID } = req.query;

    const hasValidAccess = await validateGroupAccess(req.user.id, groupID)
    if (hasValidAccess.error) return res.status(403).json(hasValidAccess);

    const posts = await GroupPost.find({ groupID })
    res.json(posts)
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve group posts ' + error.message })
  }
})

// Get a single group post by GroupPost ID
router.get('/:id', async (req, res) => {
  try {
    const postId = req.params.id

    const hasValidAccess = await validateGroupAccess(req.user.id, groupID)
    if (hasValidAccess.error) return res.status(403).json(hasValidAccess);

    const post = await GroupPost.findById(postId)
    if (!post) {
      return res.status(404).json({ error: 'Group post not found' })
    }
    res.json(post)
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve group post ' + error.message })
  }
})

// Delete a group post by GroupPostID
router.delete('/:id', async (req, res) => {
  try {
    const postId = req.params.id

    const hasValidAccess = await validateGroupAccess(req.user.id, groupID)
    if (hasValidAccess.error) return res.status(403).json(hasValidAccess);

    const deletedPost = await GroupPost.findByIdAndDelete(postId)
    if (!deletedPost) {
      return res.status(404).json({ error: 'Group post not found' })
    }

    fs.unlink(deletedPost.path, (error) => {
      if (error) return res.status(500).json({ error: 'Failed to delete group post ' + error.message })
    });

    res.status(200).json({ message: 'Group post deleted successfully', data: deletedPost })
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete group post ' + error.message })
  }
})

module.exports = router
