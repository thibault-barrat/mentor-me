const pool = require("../database.js");
const bcrypt = require("bcrypt");
// const cloudinary = require("cloudinary");

// cloudinary.config({
//   cloud_name: process.env.NAME_CLOUDINARY,
//   api_key: process.env.API_KEY_CLOUDINARY,
//   api_secret: process.env.API_SECRET_CLOUDINARY,
// });

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
      text: "SELECT users.id, users.email, users.password, role.name as role_name FROM users JOIN role ON users.role_id = role.id WHERE email=$1",
      values: [email],
    };
    const data = await pool.query(query);
    // si le mail existe, le tableau data.rows n'est pas vide, on renvoie un true (qu'on traitera dans le userController pour empêcher la création du compte)
    if (data.rows.length !== 0) {
      console.log("checkEmail: true");

      this.checkEmail = true;
      this.hashedPasswordInDb = data.rows[0].password;
      this.role_name = data.rows[0].role_name;
      this.id = data.rows[0].id;
      console.log(this.checkEmail);
      return;
    } else {
      // le mail n'existe pas, on retourne false
      console.log("checkEmail: false");
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
    if (this.checkEmail) return;
    // on hash le password pour le stocker hashé en bdd
    const hashedPassword = await bcrypt.hash(this.password, this.saltRounds);

    const query = {
      //TODO RETURNING
      text: `INSERT INTO users ("firstname","lastname","email","password","role_id") VALUES ($1, $2, $3, $4, $5)`,
      values: [this.firstname, this.lastname, this.email, hashedPassword, 1],
    };

    await pool.query(query);
  }

  /**
   * Méthode pour modifier le profil d'un user
   * @param {number} id
   */
  async modifyOne(id) {
    // on récupère le user existant en db
    await this.findOne(id);
    // gestion des erreurs si champ non rempli, on récupère l'ancien champ
    if (!this.firstname || this.firstname.length === 0) {
      this.firstname = this.userById[0].firstname;
    }
    if (!this.lastname || this.lastname.length === 0) {
      this.lastname = this.userById[0].lastname;
    }
    if (!this.biography || this.biography.length === 0) {
      this.biography = this.userById[0].biography;
    }
    if (!this.avatar_url || this.avatar_url.length === 0) {
      this.avatar_url = this.userById[0].avatar_url;
    }
    if (!this.home_phone || typeof +this.home_phone !== "number") {
      this.home_phone = this.userById[0].home_phone;
    }
    if (!this.mobile_phone || typeof +this.mobile_phone !== "number") {
      this.mobile_phone = this.userById[0].mobile_phone;
    }

    const query = {
      text: `UPDATE users
      SET "firstname"=$1, "lastname"=$2, "biography"=$3, "home_phone"=$4, "mobile_phone"=$5, "avatar_url"=$6
      WHERE id=$7;`,
      values: [
        this.firstname,
        this.lastname,
        this.biography,
        +this.home_phone,
        +this.mobile_phone,
        this.avatar_url,
        id,
      ],
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

  /**
   * Méthode pour connecter un user
   */
  async login() {
    // on vérifie si l'email est en bdd
    await this.checkUserByEmail(this.email);

    const passwordbcrypt = await bcrypt.compare(
      this.password,
      this.hashedPasswordInDb
    );
    if (!passwordbcrypt) {
      return (this.checkPassword = false);
    } else {
      return (this.checkPassword = true);
    }
  }
};
