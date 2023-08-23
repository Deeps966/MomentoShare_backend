const bcrypt = require('bcrypt');
const User = require("../models/user.model");

const get_login_success = async (req, res) => {
  try {
    if (req.user) { // Google Auth for Login/SignUp
      const user = await User.findOne({ auth_id: req.user.id });
      let payload = user

      // Create user when doesnot exists
      if (!user) {
        payload = await User.create({
          auth_id: req.user.id,
          auth_provider: req.user.provider,
          mail: req.user.emails[0].value,
          avatar: req.user.photos[0].value,
          name: req.user.displayName,
        })
      }

      // Set the token in the response header
      // Set cookie of token
      // res.header('Authorization', `Bearer ${req.user.token}`)
      //   .cookie("Authorization", "Bearer " + req.user.token, {
      //   httpOnly: true,
      //   secure: process.env.NODE_ENV === "production",
      // })
      res.status(200).json({
        success: true,
        message: "User authenticated successfully",
        token: req.user.token,
        user: payload
      });
    } else res.status(400).json({ error: "User doesnot exists!!!" })
  } catch (e) {
      log.info(e.message)
      res.status(500).json({ error: e.message })
    }
}

const custom_signup = async (req, res) => {
  try {
    const { username, mail, password } = req.body;

    const user = await User.findOne({ auth_provider: "basic", username, mail });

    // Check if the username already exists
    if (user) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    let hashedPassword = ""

    if (password) {
      // Hash the password
      hashedPassword = await bcrypt.hash(password, 10);
    } else {
      throw new Error("Password field not found")
    }

    req.body.auth_provider = "basic";
    req.body.hash_password = hashedPassword;

    // Create a new user
    let payload = await User.create(req.body);

    res.status(200).json({
      success: true,
      message: "User registered successfully",
      token: req.token,
      user: payload
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to SignUp User ' + error.message });
  }
}

const get_logout = (req, res) => {
  // Clear the 'token' cookie
  res.clearCookie('token');
  // Redirect to the root route
  res.status(200).json({
    success: true,
    message: "Token deleted from cookie"
  });
}

module.exports = {
  get_login_success,
  custom_signup,
  get_logout
}