const Service = require('../models/service');

const serviceController = {

    //On cherche toute les services
    getAllServicezz: async (req, res) => {
        console.log(req.session)
        try {

            const servicezz = new Service();

            await servicezz.findAll();

            res.status(200).send(servicezz.allServices);

        } catch (error) {
            res.status(500).send(error);
        }
    },

    //Récupérer un service
    getOneService: async (req, res) => {
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
            res.status(200).send(service.serviceById);

        } catch (error) {
            res.status(500).send(error);
        }
    },

    //Supprimer un service
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
            res.status(500).send(error);
        }
    },

    //Modifier un service
    modifyService: async (req, res) => {
        try {
            const {
                id
            } = req.params;

            const service = new Service(req.body);

            await service.modifyOne(+id);

            res.status(200).send({
                modified: true
            });

        } catch (error) {
            res.status(500).send(error);
        }
    },

    createService: async (req, res) => {

        try {

            for (let property in req.body) {
                if (req.body[property].length === 0) {
                    return res
                        .status(400)
                        .send({
                            errorMessage: `${property} can't be empty!`
                        });
                }
            }

            const service = new Service(req.body);

            await service.createOne();

            res.status(201).send({
                created: true
            });

        } catch (error) {
            res.status(500).send(error)
        }
    }
};

module.exports = serviceController;