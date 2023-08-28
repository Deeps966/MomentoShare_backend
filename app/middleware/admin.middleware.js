const adminMiddleware = (req, res, next) => {
  if (req.user.userType == "ADMIN") {
    next();
  }
  else res.status(400).json({ message: "Access Denied" })
}

module.exports = adminMiddleware