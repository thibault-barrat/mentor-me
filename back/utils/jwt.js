const jwt = require("jsonwebtoken");

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
}

function generateRefreshToken(user) {
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "20m",
  });

  return refreshToken;
}

function decodedToken(token) {
  const verifiedToken = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
  return verifiedToken;
}

module.exports = { generateAccessToken, generateRefreshToken, decodedToken };
