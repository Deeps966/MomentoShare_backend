const multer = require('multer')
const path = require('path')
const fs = require('fs')
const { UPLOADS_DIRECTORY_PATH, MAX_IMAGE_UPLOAD_SIZE, MAX_VIDEO_UPLOAD_SIZE, MAX_IMAGE_UPLOAD_LIMIT, MAX_VIDEO_UPLOAD_LIMIT } = process.env

// Set up storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = `${UPLOADS_DIRECTORY_PATH}/test`

    // Check if the directory exists
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true }); // 'recursive' allows creating nested directories if needed
    }

    cb(null, uploadPath) // Define the directory where uploaded files will be stored
  },
  filename: (req, file, cb) => {
    const fileName = Date.now() + "_" + path.parse(file.originalname).name + path.extname(file.originalname)

    cb(null, fileName) // Rename the file with a timestamp and the original file extension
  },
})

// Create a multer middleware instance with the storage options
const upload = multer({ storage })

// --------------------------Custom Middleware---------------------------------------
// Create Middleware for Group Photo
const imageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = `${UPLOADS_DIRECTORY_PATH}/images/${req.user.id}`

    // Check if the directory exists
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true }); // 'recursive' allows creating nested directories if needed
    }

    cb(null, uploadPath)
  },
  filename: (req, file, cb) => {
    const fileName = Date.now() + "_" + path.parse(file.originalname).name + path.extname(file.originalname)
    cb(null, fileName) // Rename the file with a timestamp and the original file extension
  }
})

const uploadImageMulter = multer({
  storage: imageStorage, limits: {
    files: Number(MAX_IMAGE_UPLOAD_LIMIT),
    fileSize: 1024 * 1024 * Number(MAX_IMAGE_UPLOAD_SIZE), // Convert to bytes
  }
})

// Create Middleware for Group Photo
const videoStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = `${UPLOADS_DIRECTORY_PATH}/videos/${req.user.id}`

    // Check if the directory exists
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true }); // 'recursive' allows creating nested directories if needed
    }

    cb(null, uploadPath)
  },
  filename: (req, file, cb) => {
    const fileName = Date.now() + "_" + path.parse(file.originalname).name + path.extname(file.originalname)
    cb(null, fileName) // Rename the file with a timestamp and the original file extension
  }
})

const uploadVideoMulter = multer({
  storage: videoStorage,
  limits: {
    files: Number(MAX_VIDEO_UPLOAD_LIMIT),
    fileSize: 1024 * 1024 * Number(MAX_VIDEO_UPLOAD_SIZE), // Convert to bytes
  }
})

module.exports = {
  upload,
  uploadImageMulter,
  uploadVideoMulter
}