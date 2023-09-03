const multer = require('multer')
const path = require('path')
const fs = require('fs')
const { UPLOADS_DIRECTORY_PATH } = process.env

// Set up storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = `${UPLOADS_DIRECTORY_PATH}/`

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
    const uploadPath = `${UPLOADS_DIRECTORY_PATH}/${req.fileDir}`

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

const uploadImage = multer({
  storage: imageStorage,
  limits: { fileSize: 1024 * 1024 * 2 }, // Example: Limit file size to 2MB
  fileFilter: (req, file, cb) => {
    // Example: Allow only image files with specific extensions
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('File type not allowed'), false);
    }
  },
})

module.exports = {
  upload,
  uploadImage,
}