const router = require('express').Router();
const bcrypt = require('bcrypt');

const User = require("../models/user.model");
const { isValidEmail } = require('../utils/helper');
const { generate_JWT_token } = require('../middleware/JWT.middleware');

// New User SignUp 
router.post("/signup", async (req, res) => {
  try {
    const { mail, password } = req.body;

    if (!mail || !password) return res.status(400).json({ error: "mail and password are required" })

    const user = await User.findOne({ mail });

    // Check if the user already exists
    if (user) {
      return res.status(400).json({ error: 'User already exists with same Mail' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    req.body.password = hashedPassword;

    if (req.body.adminKey === process.env.ADMIN_KEY) {
      req.body.userType = "ADMIN"
    }

    // Create a new user
    let payload = await User.create(req.body);

    res.status(200).json({
      message: "User registered successfully",
      user: payload,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to SignUp: ' + error.message });
  }
});

// User Login with credentials
router.post("/login", async (req, res) => {
  try {
    const { id, password } = req.body
    let mail = false, userData = null;

    if (id && password) {
      if (isValidEmail(id)) {
        mail = true
      }

      if (mail) {
        userData = await User.find({ mail: id })
        if (userData.length == 0) return res.status(404).json({ error: "User not registered with mail id: " + id })
      } else {
        userData = await User.find({ phoneNumber: id })
        if (userData.length == 0) return res.status(404).json({ error: "User not registered with phoneNumber: " + id })
      }

      const isPasswordValid = await bcrypt.compare(password, userData[0].password)
      if (!isPasswordValid) return res.status(403).json({ error: "Incorrect Password" })

      const payload = {
        id: userData[0]._id
      }
      const token = generate_JWT_token(payload)

      res.status(200).json({
        message: "User authenticated successfully",
        token: token,
        id: payload
      });
    } else res.status(401).json({ error: "Id and password are required" })

  } catch (error) {
    res.status(500).json({ error: 'Failed to Login: ' + error.message });
  }
});

// Logout User and remove JWT token
router.delete("/logout", (req, res) => {
  res.clearCookie('token');
  res.status(200).json({
    message: "Token deleted from cookie"
  });
});

module.exports = router;