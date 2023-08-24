const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY, JWT_EXPIRY_TIME } = process.env

const generate_JWT_token = (payload) => {
  try {
    const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: JWT_EXPIRY_TIME });
    return token
  } catch (error) {
    return res.status(500).json({ error: 'Unable to generate JWT token: ' + error.message });
  }
}

const validate_JWT_token = (req, res, next) => {
  // Get the JWT token from the request header
  let token = req.headers.authorization;

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
  } catch (error) {
    return res.status(403).json({ error: 'Invalid token: ' + error.message });
  }
}

module.exports = {
  generate_JWT_token,
  validate_JWT_token
}