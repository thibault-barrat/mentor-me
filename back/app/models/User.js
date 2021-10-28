const pool = require("../database.js");
const bcrypt = require("bcrypt");

module.exports = class User {
  // on définit le nombre de saltRounds pour hash le password
  saltRounds = 10;
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
   * Méthode pour récup un user par son email
   * @param {text} email
   */
  async checkUserByEmail(email) {
    const query = {
      text: "SELECT * FROM users WHERE email=$1",
      values: [email],
    };
    const data = await pool.query(query);
    // si le mail existe, le tableau data.rows n'est pas vide, on renvoie un true (qu'on traitera dans le userController pour empêcher la création du compte)
    if (data.rows.length !== 0) {
      return (this.checkEmail = true);
    } else {
      // le mail n'existe pas, on retourne false
      return (this.checkEmail = false);
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
    // on supprime les mdp pour qu'ils ne soient pas visibles en front
    data.rows.forEach((el) => delete el.password);
    this.allUsers = data.rows;
  }

  /**
   * Méthode pour récup un user par son id
   * @param {number} id
   * @param {boolean} showPassword - pour cacher (ou pas) le mdp du user au front (pourra être utile pour la connexion et le changement de mdp)
   */
  async findOne(id, showPassword = false) {
    const query = {
      text: "SELECT * FROM users WHERE id=$1",
      values: [id],
    };
    const data = await pool.query(query);
    // on supprime les mdp pour qu'ils ne soient pas visibles en front si showPassword = false
    if (!showPassword) {
      data.rows.forEach((el) => delete el.password);
    }
    this.userById = data.rows;
  }

  /**
   * Méthode pour créer un user
   */
  async createOne() {
    await this.checkUserByEmail(this.email);
    // on hash le password pour le stocker hashé en bdd
    const hashedPassword = await bcrypt.hash(this.password, this.saltRounds);
    const query = {
      text: `INSERT INTO users ("firstname","lastname","email","password","role_id") VALUES ($1, $2, $3, $4, $5)`,
      values: [this.firstname, this.lastname, this.email, hashedPassword, 1],
    };
    await pool.query(query);
  }

  /**
   * TODO
   * Méthode pour modifier le profil d'un user
   * @param {number} id
   */
  async modifyOne(id) {
    const query = {
      // text: "DELETE FROM users WHERE id=$1",
      // values: [id],
    };
    await pool.query(query);
  }

  /**
   * Méthode pour supprimer un user par son id
   * @param {number} id
   */
  async deleteOne(id) {
    const query = {
      text: "DELETE FROM users WHERE id=$1",
      values: [id],
    };
    await pool.query(query);
  }
};
