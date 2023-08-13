
const get_login_success = (req, res) => {
  if (req.user) {
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
}

const get_login_failed = (req, res) => {
  res.status(401).json({
    success: false,
    message: "failure",
  });
}

const get_logout = (req, res) => {
  req.logout();
  res.redirect(SERVER_URL);
}

module.exports = {
  get_login_success,
  get_login_failed,
  get_logout
}