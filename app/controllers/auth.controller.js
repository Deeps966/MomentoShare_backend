const router = require('express').Router();
const bcrypt = require('bcrypt');

const User = require("../models/user.model");
const { isValidEmail } = require('../utils/helper');
const { generate_JWT_token } = require('../middleware/JWT.middleware');

// New User SignUp 
router.post("/signup", async (req, res) => {
  try {
    const { username, mail, password } = req.body;

    if (!username || !mail || !password) return res.status(400).json({ error: "Username, Mail and Password are required" })

    const user = await User.findOne({
      $or: [
        { username: username },
        { mail: mail }
      ]
    });

    // Check if the username already exists
    if (user) {
      return res.status(400).json({ error: 'User already exists with same Mail or username' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    req.body.password = hashedPassword;

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
        if (userData.length == 0) res.status(404).json({ error: "User not registered with mail id: " + id })
      } else {
        userData = await User.find({ username: id })
        if (userData.length == 0) res.status(404).json({ error: "User not registered with username: " + id })
      }

      const isPasswordValid = await bcrypt.compare(password, userData[0].password)
      if (!isPasswordValid) res.status(403).json({ error: "Incorrect Password" })

      const payload = {
        id: userData[0]._id,
        name: userData[0].name,
        mail: userData[0].mail,
        username: userData[0].username,
      }
      const token = generate_JWT_token(payload)

      res.status(200).json({
        message: "User authenticated successfully",
        token: token,
        user: payload
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