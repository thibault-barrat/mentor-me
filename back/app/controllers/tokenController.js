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
    await token.getAllTokens(); // crée la propriété refreshTokens à laquelle on accède ligne 17 par token.refreshTokens

    let tokenArr = [];
    // on map sur le tableau retourné par la requête ligne 14
    token.refreshTokens.map((el) => {
      // sur chaque élément (un objet), on va chercher la valeur liée à la clé "refreshtoken"
      tokenArr.push(el.refreshtoken);
    });
    // on regarde si le token passé dans le form est dans le tableau tokenArr ou pas
    if (!tokenArr.includes(req.body.refreshToken)) {
      // si refreshToken n'existe pas dans le tableau, on retourne l'erreur et il faut se log de nouveau
      return res.status(400).send("Refresh Token invalid !");
    }
    // si refreshToken est dans tokenArr, on le supprime de la bdd et on crée un nouveau accessToken et un nouveau refreshToken
    await token.deleteRefreshToken(req.body.refreshToken);
    // le decodedRefreshToken sert à décoder l'ancien token pour récupérer le rôle de l'utilisateur connecté
    const userRole = decodedRefreshToken(req.body.refreshToken).role;

    const newAccessToken = generateAccessToken({
      role: userRole,
    });
    const newRefreshToken = generateRefreshToken({
      role: userRole,
    });
    // on insère le refreshToken dans la bdd pour remplacer l'ancien
    await token.insertRefreshToken(newRefreshToken);
    // on renvoie accessToken et refreshToken au front
    res.status(200).send({
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    });
  },
};

module.exports = tokenController;
