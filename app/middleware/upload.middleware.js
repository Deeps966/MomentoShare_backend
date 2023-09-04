const fs = require('fs')
const { uploadImageMulter, uploadVideoMulter } = require("./multer.middleware");
const { MAX_IMAGE_UPLOAD_SIZE, MAX_VIDEO_UPLOAD_SIZE, MAX_IMAGES_UPLOAD_LIMIT, MAX_VIDEOS_UPLOAD_LIMIT, SUPPORTED_IMAGES_ARRAY, SUPPORTED_VIDEOS_ARRAY } = process.env

const isValidFile = (files, fileType) => {
  const errors = [];
  let allowedTypes = [];
  let maxSize = 0;

  if (fileType === 'image') {
    allowedTypes = SUPPORTED_IMAGES_ARRAY.split(', ')
    maxSize = 1024 * 1024 * Number(MAX_IMAGE_UPLOAD_SIZE); // MB
  } else if (fileType === 'video') {
    allowedTypes = SUPPORTED_VIDEOS_ARRAY.split(', ')
    maxSize = 1024 * 1024 * Number(MAX_VIDEO_UPLOAD_SIZE); // MB
  }

  // Validate file types and sizes
  files.forEach((file) => {
    if (!allowedTypes.includes(file.mimetype)) errors.push(`Invalid file type: ${file.originalname}, it only Supports: ${allowedTypes.join(', ')}`);

    if (file.size > maxSize) errors.push(`File too large: ${file.originalname}, Max size limit is ${maxSize}`);
  });

  // Handle validation errors
  if (errors.length > 0) {
    // Remove uploaded files
    files.forEach((file) => {
      fs.unlinkSync(file.path);
      console.log("File Deleted: " + file.path)
    });
    return { error: errors }
  }
  return true
}

// ----------------Image MiddleWare---------------------
const uploadImageMiddleware = (req, res, next) => {
  uploadImageMulter.single('image')(req, res, (err) => {
    try {
      if (err) return res.status(400).json({ error: `Failed upload in Multer: ${err.message == 'Unexpected field' ? 'file key required "image" or multiple files uploaded' : err.message}` });

      if (!req.file) return res.status(404).json({ error: "Image File not found" })

      const files = [req.file];
      const isValid = isValidFile(files, 'image');
      if (isValid.error) return res.status(400).json(isValid.error)

      next();
    } catch (error) {
      res.status(500).json({ error: "Failed upload in Multer due to sent files: " + error.message })
    }
  })
}

const bulkUploadImagesMiddleware = (req, res, next) => {
  // Use multer upload instance
  uploadImageMulter.array('images', Number(MAX_IMAGES_UPLOAD_LIMIT))(req, res, (err) => {
    try {
      if (err) return res.status(400).json({ error: `Failed upload in Multer: file key required 'images' or File Upload limit exceeds ${MAX_IMAGES_UPLOAD_LIMIT} or ${err.message}` });

      if (!req.files) return res.status(404).json({ error: "Image Files not found" })

      const files = req.files;
      const isValid = isValidFile(files, 'image');
      if (isValid.error) return res.status(400).json(isValid.error)

      next();
    } catch (error) {
      res.status(500).json({ error: "Failed upload in Multer due to sent files" + error.message })
    }
  });
};

// ----------------Video MiddleWare---------------------
const uploadVideoMiddleware = (req, res, next) => {
  uploadVideoMulter.single('video')(req, res, (err) => {
    try {
      if (err) return res.status(400).json({ error: `Failed upload in Multer: ${err.message == 'Unexpected field' ? 'file key required "video" or multiple files uploaded' : err.message}` });

      if (!req.file) return res.status(404).json({ error: "Video File not found" })

      const files = [req.file];
      const isValid = isValidFile(files, 'video');
      if (isValid.error) return res.status(400).json(isValid.error)

      next();
    } catch (error) {
      res.status(500).json({ error: "Failed upload in Multer due to sent files" + error.message })
    }
  })
}

const bulkUploadVideosMiddleware = (req, res, next) => {
  // Use multer upload instance
  uploadVideoMulter.array('videos', Number(MAX_VIDEOS_UPLOAD_LIMIT))(req, res, (err) => {
    try {
      if (err) return res.status(400).json({ error: `Failed upload in Multer: file key required 'videos' or File Upload limit exceeds ${MAX_VIDEOS_UPLOAD_LIMIT} or ${err.message}` });

      if (!req.files) return res.status(404).json({ error: "Video Files not found" })

      const files = req.files;
      const isValid = isValidFile(files, 'video');
      if (isValid.error) return res.status(400).json(isValid.error)

      next();
    } catch (error) {
      res.status(500).json({ error: "Failed upload in Multer due to sent files" + error.message })
    }
  });
};

module.exports = {
  uploadImageMiddleware,
  bulkUploadImagesMiddleware,
  uploadVideoMiddleware,
  bulkUploadVideosMiddleware
}