const withAuth = (req, res, next) => {
  if (!req.session.user) {
    return res.status(401).send({
      message: "No connected",
    });
  }
  if (req.session.user.role === "user" || req.session.user.role === "admin") {
    next();
  }
};
const isAdmin = (req, res, next) => {
  if (!req.session.user) {
    return res.status(401).send({
      message: "No connected",
    });
  }
  if (req.session.user.role === "user") {
    return res.status(401).send({
      message: "Unauthorized",
    });
  }
  if (req.session.user.role === "admin") {
    next();
  }
};
module.exports = { withAuth, isAdmin };
