const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY, JWT_EXPIRY_TIME } = process.env

const generate_JWT_token = (req, res, next) => {
  if (req.user) {
    const payload = {
      name: req.user.displayName,
      email: req.user.emails[0].value,
      avatar: req.user.photos[0].value,
    }
    const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: JWT_EXPIRY_TIME });
    req.user.token = token;
    next()
  }
  else res.status(403).json({ error: "Failed to generate JWT token" })
}

const validate_JWT_token = (req, res, next) => {
  // Get the JWT token from the request header
  let token = req.headers.authorization;

  console.log(token);

  if (!token) {
    return res.status(401).json({ error: 'Authorization token missing' });
  }

  try {
    // Verify the token
    token = token.replace('Bearer ', '');
    const decoded = jwt.verify(token, JWT_SECRET_KEY);
    req.user = decoded; // Attach the decoded user information to the request
    req.user.authorized = true;
    next(); // Continue to the next middleware/route
  } catch (err) {
    return res.status(403).json({ error: 'Invalid token' });
  }
}

module.exports = {
  generate_JWT_token,
  validate_JWT_token
}