const router = require("express").Router();
const passport = require("passport");
const { SERVER_URL } = process.env

router.get("/login/success", (req, res) => {
  if (req.user) {
    console.log(req.user)
    res.status(200).json({
      success: true,
      message: "successfull",
      name: req.user.displayName,
      avatar: req.user.photos[0].value,
      // user: req.user,
      // cookies: req.cookies
    });
  }
  else res.redirect(SERVER_URL + '/auth/login/failed')
});

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "failure",
  });
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(SERVER_URL);
});

// Google Authentication
router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: SERVER_URL,
    failureRedirect: "/login/failed",
  })
);

// Facebook Authentication
router.get("/facebook", passport.authenticate("facebook", { scope: ["profile"] }));

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: SERVER_URL,
    failureRedirect: "/login/failed",
  })
);

module.exports = router