const express = require('express')
const router = express.Router()

const GroupPost = require('../models/group-post.model') // Import the GroupPost model
let { uploadSingleGroupPost } = require('../middleware/multer.middleware')
const Group = require('../models/group.model')

const validateGroupID = async (req, res, next) => {
  try {
    const groupID = req.query.groupID
    if (!groupID) return res.status(404).json({ error: "groupID not found in query of URL" })
    const group = await Group.findById(groupID)
    if (group) {
      req.fileDir = groupID
      next()
    } else {
      return res.status(404).json({ error: "No group found of ID: " + groupID })
    }
  } catch (error) {
    return res.status(500).json({ error: "Group id Validation failed " + error.message })
  }
}

// Create a new group post
router.post('/', validateGroupID, uploadSingleGroupPost.single('image'), async (req, res) => {
  try {
    const groupID = req.query.groupID

    if (!req.file) return res.status(500).json({ error: "Please upload any file" })

    const fileURI = req.file.path
    mediaUrl = process.env.SERVER_URL + "/" + fileURI

    // Handle the uploaded file if needed...
    const newPost = await GroupPost.create({
      groupID,
      userID: req.user.id,
      mediaUrl,
      mediaFileSize: req.file.size,
      mediaFiletype: req.file.mimetype
    })

    res.status(201).json(newPost)
  } catch (error) {
    res.status(500).json({ error: 'Failed to create group post ' + error.message })
  }
})

// Get all group posts
router.get('/', async (req, res) => {
  try {
    const posts = await GroupPost.find()
    res.json(posts)
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve group posts ' + error.message })
  }
})

// Get a single group post by ID
router.get('/:id', async (req, res) => {
  try {
    const postId = req.params.id
    const post = await GroupPost.findById(postId)
    if (!post) {
      return res.status(404).json({ error: 'Group post not found' })
    }
    res.json(post)
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve group post ' + error.message })
  }
})

// Update a group post by ID
router.put('/:id', async (req, res) => {
  try {
    const postId = req.params.id
    const postData = req.body
    const updatedPost = await GroupPost.findByIdAndUpdate(postId, postData, { new: true })
    if (!updatedPost) {
      return res.status(404).json({ error: 'Group post not found' })
    }
    res.json(updatedPost)
  } catch (error) {
    res.status(500).json({ error: 'Failed to update group post ' + error.message })
  }
})

// Delete a group post by ID
router.delete('/:id', async (req, res) => {
  try {
    const postId = req.params.id
    const deletedPost = await GroupPost.findByIdAndDelete(postId)
    if (!deletedPost) {
      return res.status(404).json({ error: 'Group post not found' })
    }
    res.status(200).json({ message: 'Group post deleted successfully' })
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete group post ' + error.message })
  }
})

module.exports = router
