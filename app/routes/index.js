const router = require("express").Router();
const userController = require('../controllers/user.controller');
const groupController = require('../controllers/group.controller')
const groupRoleController = require('../controllers/group-role.controller')
const groupMemberController = require('../controllers/group-member.controller')
const groupPostController = require('../controllers/group-post.controller')

router.use("/users", userController)
router.use("/groups", groupController)
router.use("/group-roles", groupRoleController)
router.use("/group-members", groupMemberController)
router.use("/group-posts", groupPostController)

module.exports = router