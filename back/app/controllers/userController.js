const User = require("../models/User");
const cloudinary = require("../cloudinary");
// fs est un module natif à node (pas besoin de npm i)
const fs = require("fs");

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
      // si l'id du user ne correspond pas à l'id du user connecté, il ne peut pas modifier les données du profil ! n admin le peut
      if (req.session.user.role !== "admin" && req.session.user.id !== +id) {
        return res.status(401).send({ errorMessage: `Unauthorized!` });
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
      // si l'id du user ne correspond pas à l'id du user connecté, il ne peut pas supprimer le profil d'un autre user ! Un admin le peut
      if (req.session.user.role !== "admin" && req.session.user.id !== +id) {
        return res.status(401).send({ errorMessage: `Unauthorized!` });
      }
      // quand on supprime le user, on souhaite supprimer son avatar sur cloudinary aussi!
      // on récupère le nom de l'avatar dans cloudinary à partir de avatar_url (on split le string contenant l'url)
      const avatarSplitUrl = user.userById[0].avatar_url.split("/");
      const avatarName =
        avatarSplitUrl[avatarSplitUrl.length - 1].split(".")[0];

      await cloudinary.uploader.destroy(
        `avatars/${avatarName}`,
        (err, result) => {
          if (err) {
            return res.status(503).send({
              message: "Cannot reach Cloudinary server",
              err,
            });
          }
        }
      );
      await user.deleteOne(+id);
      // quand on supprime, on déconnecte le user
      req.session.destroy();
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

      // on vérifie si le user existe déjà en base de données ou pas
      // 1. on vérifie si l'email est en bdd
      await user.checkUserEmail(req.body.email);

      if (!user.checkEmail) {
        // un user a déjà été inscrit avec cette adresse mail, on retourne une erreur 409 : Conflict
        return res
          .status(409)
          .send({ errorMessage: "This user does not exist!" });
      }

      // 2. on vérifie le mot de passe du user
      await user.checkUserPassword();
      // on vérifie si le mdp correspond
      if (!user.checkPassword) {
        // ce n'est pas le bon mdp
        return res.status(400).send({ errorMessage: "Wrong password!" });
      }
      if (user.checkEmail && user.checkPassword) {
        // si email existe et le mdp est correct, OK
        req.session.user = {
          email: user.email,
          role: user.role_name,
          id: user.id,
        };
        res.status(200).send({ connected: true, user: req.session.user });
      }
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
    req.session.destroy();
    res.status(200).send({ connected: false });
  },

  /**
   * Processus de modification de l'avatar du user
   * @param  {Object} req
   * @param  {Object} res
   */
  modifyUserAvatar: async (req, res) => {
    try {
      const { id } = req.params;

      // si l'id du user ne correspond pas à l'id du user connecté, il ne peut pas modifier les données du profil ! n admin le peut
      if (req.session.user.role !== "admin" && req.session.user.id !== +id) {
        return res.status(401).send({ errorMessage: `Unauthorized!` });
      }

      // on récupère l'image envoyée par le user et on la stocke dans le dossier temporaire
      const avatar = req.files.avatar.tempFilePath;

      // on l'envoie ensuite dans cloudinary
      cloudinary.uploader.upload(
        avatar,
        { public_id: `mentorme_${id}`, tags: "MentorMe", folder: "avatars" },
        async (err, result) => {
          if (err) {
            return res.status(503).send({
              message: "Cannot reach Cloudinary server",
              err,
            });
          }
          if (result) {
            fs.unlink(
              `${__dirname}/../../tmp/${result.original_filename}`,
              (err) => {
                if (err) {
                  console.error(err);
                  return;
                }
              }
            );
            const url = result.secure_url;
            const user = new User();
            await user.modifyAvatar(id, url);
            res.status(200).send({ message: "Avatar modified" });
          }
        }
      );

      // res.status(200).send({ message: "Avatar modified" });
    } catch (err) {
      res.status(500).send(err);
    }
  },
};

module.exports = userController;
