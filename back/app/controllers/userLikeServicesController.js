const userLikesService = require("../models/userLikesService");

const userLikeServicesController = {
  getLikedServicesByUserId: async (req, res) => {
    const { id } = req.params;
    const likeService = new userLikesService();

    await likeService.getLikedServiceForOneUser(id);
    res.status(200).send(likeService.likedServices);
  },

  likeService: async (req, res) => {
    try {
      const { id, serviceId } = req.params;

      const likeService = new userLikesService();

      await likeService.like(id, serviceId);

      res.status(200).send({
        Message: "Success like !!",
      });
    } catch (error) {
      res.status(500).send(error);
    }
  },

  dislikeService: async (req, res) => {
    try {
      const { id, serviceId } = req.params;

      const dislikeService = new userLikesService();

      await dislikeService.dislike(id, serviceId);

      res.status(200).send({
        Message: "Success dislike !!",
      });
    } catch (error) {
      res.status(500).send(error);
    }
  },
};

module.exports = userLikeServicesController;
