const Service = require('../models/service');

const serviceController = {

    //On cherche toute les services
    getAllServicezz: async (req, res) => {
        try {

            const servicezz = new Service();

            await servicezz.findAll();

            res.status(200).send(servicezz.allServices)

        } catch (error) {
            res.status(500).send(error)
        }
    },

    getOneService: async (req, res) => {
        try {

            const {
                id
            } = req.params

            const service = new Service()

            await service.findOne(+id);

            if (service.serviceById.length === 0) {
                return res
                    .status(404)
                    .send({
                        errorMessage: "This services does not exist"
                    });
            }
            res.status(200).send(service.serviceById);

        } catch (error) {
            res.status(500).send(error)
        }
    },

    deleteOneService: async (req, res) => {
        try {

            const {
                id
            } = req.params;

            const service = new Service();

            await service.findOne(+id);

            if (service.serviceById.length === 0) {
                return res
                    .status(404)
                    .send({
                        errorMessage: "This services does not exist"
                    });
            }

            await service.deleteOne(+id);

            res.status(200).send({
                deletedService: true
            });

        } catch (error) {
            res.status(500).send(error)
        }
    },

    modifyService: async (req, res) => {
        try {
            const {
                id
            } = req.params

            const service = ne
        } catch (error) {
            res.status(500).send(error)
        }
    }
};

module.exports = serviceController;