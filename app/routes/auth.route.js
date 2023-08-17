const router = require("express").Router();
const passport = require("passport");
const { get_login_success, get_login_failed, get_logout } = require('../controllers/auth.controller')
const { SERVER_URL } = process.env

// Login Success
router.get("/login/success", get_login_success);

// Login Failed
router.get("/login/failed", get_login_failed);

// Logout
router.get("/logout", get_logout);

// Google Authentication
router.get("/google", passport.authenticate("google"));

// Google Callback
router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "/auth/login/success",
    failureRedirect: "/login/failed",
  })
);

// Facebook Authentication
router.get("/facebook", passport.authenticate("facebook"));

// Facebook Callback
router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: SERVER_URL,
    failureRedirect: "/login/failed",
  })
);

module.exports = router