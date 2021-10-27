const pool = require("../database.js");
module.exports = class User {
  /**
   * Création d'un user
   * @param {Object} object
   */
  constructor(object) {
    for (const property in object) {
      this[property] = object[property];
    }
  }
  /**
   * Méthode pour récup tous les users
   */
  async findAll() {
    const query = {
      text: "SELECT * FROM users;",
    };
    const data = await pool.query(query);
    this.allUsers = data.rows;
  }
  /**
   * Méthode pour récup un user par son id
   * @param {number} id
   */
  async findOne(id) {
    const query = {
      text: "SELECT * FROM users WHERE id=$1",
      values: [id],
    };
    const data = await pool.query(query);
    this.userById = data.rows;
  }
};
