const jwt = require("jsonwebtoken");

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
}

function generateRefreshToken(user) {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "20m",
  });
}

function decodedRefreshToken(token) {
  return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
}

function decodedAccessToken(token) {
  return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
}

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  decodedRefreshToken,
  decodedAccessToken,
};
