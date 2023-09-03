const adminMiddleware = (req, res, next) => {
  if (req.user.userType == "ADMIN") {
    next()
  }
  else res.status(400).json({ message: "Access Denied: Only Admin account has access of this route" })
}

module.exports = adminMiddleware