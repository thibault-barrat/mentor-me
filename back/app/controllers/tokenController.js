const RefreshToken = require("../models/RefreshToken");
const {
  generateAccessToken,
  generateRefreshToken,
  decodedRefreshToken,
} = require("../../utils/jwt");

const tokenController = {
  /**
   * Supprimer l'ancien refresh token de la bdd et stocker le nouveau
   */
  async verifyRefreshToken(req, res) {
    const token = new RefreshToken();
    // await token.getAllTokens(); // crée la propriété refreshTokens à laquelle on accède ligne 17 par token.refreshTokens
    const refreshToken = req.body.token || req.query.token;

    // si refreshToken est dans tokenArr, on le supprime de la bdd et on crée un nouveau accessToken et un nouveau refreshToken
    await token.deleteRefreshToken(refreshToken);
    // le decodedRefreshToken sert à décoder l'ancien token pour récupérer le rôle de l'utilisateur connecté
    const decodedToken = decodedRefreshToken(refreshToken);
    // Si decodedRefreshToken renvoie une erreur, on la traite et on renvoie une 400
    if (decodedToken === "jwt expired") {
      return res.status(400).send(decodedToken);
    }
    if (decodedToken === "jwt must be a string") {
      return res.status(400).send(decodedToken);
    }
    const newAccessToken = generateAccessToken({
      user_id: decodedToken.user_id,
      role: decodedToken.role,
    });
    const newRefreshToken = generateRefreshToken({
      user_id: decodedToken.user_id,
      role: decodedToken.role,
    });
    // on insère le refreshToken dans la bdd pour remplacer l'ancien
    await token.insertRefreshToken(newRefreshToken);
    // on renvoie accessToken et refreshToken au front
    res.status(200).send({
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    });
  },
  /**
   * Obtenir tous les refresh tokens de la bdd
   */
  async getAllRefreshTokens(req, res) {
    const token = new RefreshToken();
    await token.getAllTokens();
    res.status(200).send(token.refreshTokens);
  },
  /**
   * Supprimer tous les refresh tokens de la bdd
   */
  async deleteAllRefreshTokens(req, res) {
    const token = new RefreshToken();
    await token.deleteAllRefreshTokens();
    res.status(200).send({ deleted: true });
  },
};

module.exports = tokenController;
