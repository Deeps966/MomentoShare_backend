const User = require("../models/user.model");

const get_login_success = async (req, res) => {
  if (req.user) {
    try {
      const user = await User.findOne({ auth_id: req.user.id });
      let payload = user

      if (!user) {
        payload = await User.create({
          auth_id: req.user.id,
          auth_provider: req.user.provider,
          email: req.user.emails[0].value,
          avatar: req.user.photos[0].value,
          name: req.user.displayName,
          username: req.user.displayName
        })
      }

      // Set cookie of token
      res.cookie("token", "Bearer " + req.user.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      }).status(200).json({
        success: true,
        message: "User authenticated successfully",
        user: payload
      });
    } catch (e) {
      log.info(e.message)
      res.status(500).json({ error: e.message })
    }

  }
  else res.redirect('/auth/login/failed')
}

const get_logout = (req, res) => {
  // Clear the 'token' cookie
  res.clearCookie('token');
  // Redirect to the root route
  res.redirect("/");
}

module.exports = {
  get_login_success,
  get_logout
}