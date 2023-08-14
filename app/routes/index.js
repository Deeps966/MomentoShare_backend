const router = require("express").Router();
const authRoute = require('./auth.route');
const userRoute = require('./user.route');

router.use("/auth", authRoute)
router.use("/users", userRoute)

module.exports = router