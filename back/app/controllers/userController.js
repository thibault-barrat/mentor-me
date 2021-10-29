const User = require("../models/User");

const userController = {
  /**
   * Renvoie le json contenant tous les users
   * @param  {Object} req
   * @param  {Object} res
   */
  getAllUsers: async (req, res) => {
    try {
      const user = new User();
      await user.findAll();
      res.status(200).send(user.allUsers);
    } catch (err) {
      res.status(500).send(err);
    }
  },

  /**
   * Renvoie le json contenant un user par son id
   * @param  {Object} req
   * @param  {Object} res
   */
  getOneUser: async (req, res) => {
    try {
      const { id } = req.params;
      const user = new User();
      await user.findOne(+id);
      // on vérifie que le user demandé existe en db
      if (user.userById.length === 0) {
        // s'il n'existe pas, on retourne une erreur 404 : not found
        return res
          .status(404)
          .send({ errorMessage: "This user does not exist" });
      }
      //TODO : error 401 unauthorized
      // on renvoie le json du user
      res.status(200).send(user.userById);
    } catch (err) {
      res.status(500).send(err);
    }
  },

  /**
   * Crée un nouveau user en bdd
   * @param  {Object} req
   * @param  {Object} res
   */
  createNewUser: async (req, res) => {
    try {
      // on vérifie si un des champs requis n'est pas vide
      for (let property in req.body) {
        // si le champ est vide, le user ne peut pas être créé
        if (req.body[property].length === 0) {
          return res
            .status(400)
            .send({ errorMessage: `${property} can't be empty!` });
        }
      }
      // on vérifie le format de l'email grâce à une regex
      const regexEmail = new RegExp(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "g"
      );
      if (!regexEmail.test(req.body.email)) {
        return res.status(406).send({ errorMessage: `Wrong email format!` });
      }
      // on vérifie le format du password grâce à une regex
      const regexPassword = new RegExp(
        "(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{6,}",
        "g"
      );
      if (!regexPassword.test(req.body.password)) {
        return res.status(406).send({ errorMessage: `Wrong password format!` });
      }

      const user = new User(req.body);
      await user.createOne();

      // on vérifie si le user existe déjà en base de données ou pas
      if (user.checkEmail) {
        // un user a déjà été inscrit avec cette adresse mail, on retourne une erreur 409 : Conflict
        return res
          .status(409)
          .send({ errorMessage: "This user already exists!" });
      }
      // le user n'existe pas encore, on le crée
      res.status(201).send({ created: true });
    } catch (err) {
      res.status(500).send(err);
    }
  },

  /**
   * Modifie le profil d'un user
   * @param  {Object} req
   * @param  {Object} res
   */
  modifyUserProfile: async (req, res) => {
    try {
      const { id } = req.params;

      // on vérifie si les numéros de  téléphone envoyés sont de type number
      const regex = new RegExp(/^\d+/);
      if (
        // si ce n'est pas un number et si ce n'est pas undefined (avec undefined, on laisse l'ancien champ (cf User.js))
        !regex.test(Number(req.body.home_phone)) &&
        req.body.home_phone !== undefined
      ) {
        // on renvoie une erreur 406 not acceptable!
        return res
          .status(406)
          .send({ errorMessage: `Home phone is not a number!` });
      }
      if (
        !regex.test(Number(req.body.mobile_phone)) &&
        req.body.mobile_phone !== undefined
      ) {
        return res
          .status(406)
          .send({ errorMessage: `Mobile phone is not a number!` });
      }
      const user = new User(req.body);
      await user.modifyOne(+id);

      res.status(200).send({ modified: true });
    } catch (err) {
      res.status(500).send(err);
    }
  },

  /**
   * Supprime un user par son id
   * @param  {Object} req
   * @param  {Object} res
   */
  deleteOneUser: async (req, res) => {
    try {
      const { id } = req.params;
      const user = new User();
      // on vérifie que le user existe avant de le delete
      await user.findOne(+id);
      if (user.userById.length === 0) {
        // s'il n'existe pas, on retourne une erreur 404 : not found
        return res
          .status(404)
          .send({ errorMessage: "This user does not exist!" });
      }
      await user.deleteOne(+id);
      // on mentionne que la suppression a bien eu lieu
      res.status(200).send({ deletedUser: true });
    } catch (err) {
      res.status(500).send(err);
    }
  },

  /**
   * Processus de connexion d'un user
   * @param  {Object} req
   * @param  {Object} res
   */
  connectUser: async (req, res) => {
    try {
      const user = new User(req.body);
      await user.login();
      // on vérifie si le user existe déjà en base de données ou pas
      if (!user.checkEmail) {
        // un user a déjà été inscrit avec cette adresse mail, on retourne une erreur 409 : Conflict
        return res
          .status(409)
          .send({ errorMessage: "This user does not exist!" });
      }
      // on vérifie si le mdp correspond
      if (!user.checkPassword) {
        // ce n'est pas le bon mdp
        return res.status(400).send({ errorMessage: "Wrong password!" });
      }

      // si email existe et le mdp est correct, OK
      res.status(200).send({ connected: true });
    } catch (err) {
      res.status(500).send(err);
    }
  },

  /**
   * Processus de déconnexion d'un user
   * @param  {Object} req
   * @param  {Object} res
   */
  disconnectUser: (req, res) => {
    res.status(200).send({ connected: false });
  },
};

module.exports = userController;
