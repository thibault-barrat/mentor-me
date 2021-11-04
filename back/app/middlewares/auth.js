const RefreshToken = require("../models/RefreshToken");
const { decodedAccessToken, decodedRefreshToken } = require("../../utils/jwt");

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
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  next();
};

const verifyRefreshToken = async (req, res, next) => {
  const refreshToken = req.body.token || req.query.token;
  if (!refreshToken) {
    return res.status(403).send("A token is required for authentication");
  }

  const token = new RefreshToken();
  await token.getAllTokens(); // crée la propriété refreshTokens

  let tokenArr = [];
  // on map sur le tableau retourné par la requête ligne 14
  token.refreshTokens.map((el) => {
    // sur chaque élément (un objet), on va chercher la valeur liée à la clé "refreshtoken"
    tokenArr.push(el.refreshtoken);
  });
  // on regarde si le token passé dans le form est dans le tableau tokenArr ou pas
  if (!tokenArr.includes(refreshToken)) {
    // si refreshToken n'existe pas dans le tableau, on retourne l'erreur
    return res.status(400).send("Refresh Token invalid !");
  }
  const decoded = decodedRefreshToken(refreshToken);
  req.user = decoded;
  next();
};

const isAdmin = (req, res, next) => {
  if (!req.user && !req.user.role) {
    return res.status(403).send("A token is required for authentication");
  }

  if (req.user.role !== "admin") {
    return res.status(401).send("Unauthorized");
  }

  if (req.user.role === "admin") {
    next();
  }
};

const verifyUserById = (req, res, next) => {
  if (!req.user && !req.user.role) {
    return res.status(403).send("A token is required for authentication");
  }

  if (req.user.role !== "admin" && req.user.user_id !== +req.params.id) {
    return res.status(401).send("Unauthorized");
  }

  if (req.user.role === "admin" || req.user.user_id === +req.params.id) {
    next();
  }
};

module.exports = { verifyToken, isAdmin, verifyUserById, verifyRefreshToken };
