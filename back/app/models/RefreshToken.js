const pool = require("../database");

module.exports = class RefreshToken {
  /**
   * Méthode de récupération de tous les tokens
   */
  async getAllTokens() {
    const query = {
      text: "SELECT refreshtoken FROM refreshtokens",
    };
    const data = await pool.query(query);
    this.refreshTokens = data.rows;
  }
  /**
   * Méthode d'insertion du refreshToken dans la table
   */
  async insertRefreshToken(newRefreshToken) {
    const query = {
      text: `INSERT INTO refreshtokens ("refreshtoken") VALUES ($1)`,
      values: [newRefreshToken],
    };
    await pool.query(query);
  }
  /**
   * Méthode de suppression du refreshToken de la table
   */
  async deleteRefreshToken(oldRefreshToken) {
    const query = {
      text: `DELETE FROM refreshtokens WHERE refreshtoken=$1`,
      values: [oldRefreshToken],
    };
    await pool.query(query);
  }
  /**
   * Méthode de suppression tous les refreshTokens
   */
  async deleteAllRefreshTokens() {
    const query = {
      text: `DELETE FROM refreshtokens`,
    };
    await pool.query(query);
  }
};
