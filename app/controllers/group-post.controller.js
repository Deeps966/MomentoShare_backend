const express = require('express')
const router = express.Router()
const fs = require('fs')

const GroupPost = require('../models/group-post.model')
const { uploadImageMiddleware, bulkUploadImagesMiddleware, uploadVideoMiddleware, bulkUploadVideosMiddleware } = require('../middleware/upload.middleware')
const { validateGroupAccess } = require('../utils/group.helper')

// Validating Group access and it exists
const validateGroupMiddleware = async (req, res, next) => {
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

// Upload Single Group Image
router.post('/upload-image', validateGroupMiddleware, uploadImageMiddleware, async (req, res) => {
  try {
    const groupID = req.query.groupID

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

// Upload Single Group Image
router.post('/bulk-upload-images', validateGroupMiddleware, bulkUploadImagesMiddleware, async (req, res) => {
  try {
    const groupID = req.query.groupID

    if (!req.files) return res.status(404).json({ error: "Files not found" })

    let groupArr = []

    _.each(req.files, (file) => {
      const fileURI = file.path
      mediaUrl = process.env.SERVER_URL + "/" + fileURI
      filePath = file.destination + file.filename

      groupArr.push({
        groupID,
        userID: req.user.id,
        path: filePath,
        mediaUrl,
        mediaFileSize: file.size,
        mediaFiletype: file.mimetype
      })
    })

    // Handle the uploaded files if needed...
    const newPosts = await GroupPost.insertMany(groupArr)

    res.status(201).json(newPosts)
  } catch (error) {
    res.status(500).json({ error: 'Failed to create group post ' + error.message })
  }
})

// Upload Single Group Video
router.post('/upload-video', validateGroupMiddleware, uploadVideoMiddleware, async (req, res) => {
  try {
    const groupID = req.query.groupID

    if (!req.file) return res.status(404).json({ error: "Files not found" })

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

// Upload Single Group Image
router.post('/bulk-upload-videos', validateGroupMiddleware, bulkUploadVideosMiddleware, async (req, res) => {
  try {
    const groupID = req.query.groupID

    if (!req.files) return res.status(404).json({ error: "Files not found" })

    let groupArr = []

    _.each(req.files, (file) => {

      groupArr.push({
        groupID,
        userID: req.user.id,
        path: filePath,
        mediaUrl,
        mediaFileSize: file.size,
        mediaFiletype: file.mimetype
      })
    })

    // Handle the uploaded files if needed...
    const newPosts = await GroupPost.insertMany(groupArr)

    res.status(201).json(newPosts)
  } catch (error) {
    res.status(500).json({ error: 'Failed to create group post ' + error.message })
  }
})

// Get all group posts By GroupID
router.get('/by-groupid/:id', async (req, res) => {
  try {
    const groupID = req.params.id;

    if (!groupID) return res.status(404).json({ error: "GroupID is missing" })

    const hasValidAccess = await validateGroupAccess(req.user.id, groupID)
    if (hasValidAccess.error) return res.status(403).json(hasValidAccess);

    const posts = await GroupPost.find({ groupID })

    res.json(posts)
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve group posts ' + error.message })
  }
})

// Get all group posts By GroupID
router.get('/', async (req, res) => {
  try {
    const posts = await GroupPost.find({ userID: req.user.id })
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
