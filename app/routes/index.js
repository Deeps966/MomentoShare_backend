const router = require("express").Router();
const userController = require('../controllers/user.controller');
const profileController = require('../controllers/profile.controller')
const groupController = require('../controllers/group.controller')
const groupPostController = require('../controllers/group-post.controller')

router.use("/users", userController)
router.use("/profiles", profileController)
router.use("/groups", groupController)
router.use("/group-posts", groupPostController)

module.exports = router