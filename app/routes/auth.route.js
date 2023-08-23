const router = require("express").Router();
const passport = require("passport");
const { get_login_success, get_logout, custom_signup } = require('../controllers/auth.controller')
const { generate_JWT_token } = require('../middleware/JWT.middleware')

// Logout
router.delete("/logout", get_logout);

// SignUp
router.post("/signup", generate_JWT_token, custom_signup);

// Google Authentication
router.get("/google", passport.authenticate("google", { session: false }));

// Google Callback
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/",
    session: false,
  }),
  generate_JWT_token,
  get_login_success
);


// Facebook Authentication
router.get("/facebook", passport.authenticate("facebook"));

// Facebook Callback
router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: "/auth/login/success",
    failureRedirect: "/",
  })
);

module.exports = router