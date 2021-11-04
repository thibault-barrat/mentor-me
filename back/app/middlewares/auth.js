const { decodedAccessToken } = require("../../utils/jwt");

const verifyToken = (req, res, next) => {
  const token =
    req.body.token ||
    req.query.token ||
    req.headers["x-access-token"] ||
    req.headers["authorization"].split(" ")[1];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = decodedAccessToken(token);
    req.user = decoded;
    console.log(req.user);
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  next();
};
module.exports = { verifyToken };
