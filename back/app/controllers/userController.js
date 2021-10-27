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
      const userId = req.params.id;
      const user = new User();
      await user.findOne(userId);
      res.status(200).send(user.userById);
    } catch (err) {
      res.status(500).send(err);
    }
  },
};

module.exports = userController;
