const router = require("express").Router()
const path = require('path')
const { upload } = require('../middleware/multer.middleware')

router.get("/upload-avatar", (req, res) => {
  res.sendFile(path.join(__dirname, '../views', 'upload.html'))
})

// Define a route to handle image uploads (similar to previous example)
router.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  const filePath = req.file.path;
  res.send(`File uploaded successfully. Path: ${filePath}`);
})

// Define a route to handle file uploads
router.post('/multilple-upload', upload.array('images', 5), (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).send('No files uploaded.');
  }

  const filePaths = req.files.map(file => file.path);
  res.send(`Files uploaded successfully. Paths: ${filePaths.join(', ')}`);
})

router.get("/", (req, res) => res.sendFile(path.join(__dirname, '../views', 'index.html')))

module.exports = router