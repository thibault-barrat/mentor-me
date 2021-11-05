const userLikesService = require("../models/userLikesService");

const userLikeServicesController = {
    likeService: async (req, res) => {
        try {

            const {
                userId,
                serviceId
            } = req.params;

            const likeService = new userLikesService();

            await likeService.like(userId, serviceId);

            res.status(200).send({
                Message: "Success like !!"
            })

        } catch (error) {
            res.status(500).send(error);
        }
    },

    dislikeService: async (req, res) => {
        
        try {

            const {
                userId,
                serviceId
            } = req.params;

            const dislikeService = new userLikesService()

            await dislikeService.dislike(userId, serviceId);

            res.status(200).send({
                Message: "Success dislike !!"
            })


        } catch (error) {
            res.status(500).send(error);
        }
    },
}

module.exports = userLikeServicesController;