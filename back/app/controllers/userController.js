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
          .send({ errorMessage: "This user does not exist in database" });
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
          .send({ errorMessage: "This user does not exist in database" });
      }
      await user.deleteOne(+id);
      // on mentionne que la suppression a bien eu lieu
      res.status(200).send({ deletedUser: true });
    } catch (err) {
      res.status(500).send(err);
    }
  },
};

module.exports = userController;
