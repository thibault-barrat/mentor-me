const { cloudinary_js_config } = require("../cloudinary");
const Service = require("../models/service");

const serviceController = {
  //On cherche toute les services
  getAllServicezz: async (req, res) => {
    try {
      const servicezz = new Service();

      await servicezz.findAll();

      res.status(200).send(servicezz.allServices);
    } catch (error) {
      res.status(500).send(error);
    }
  },

  getOneService: async (req, res) => {
    try {
      const { id } = req.params;

      const service = new Service();

      await service.findOne(+id);

      if (service.serviceById.length === 0) {
        return res.status(404).send({
          errorMessage: "This services does not exist",
        });
      }
      res.status(200).send(service.serviceById);
    } catch (error) {
      res.status(500).send(error);
    }
  },

  deleteOneService: async (req, res) => {
    try {
      const { id } = req.params;
      const service = new Service();

      await service.findOne(+id);

      if (service.serviceById.length === 0) {
        return res.status(404).send({
          errorMessage: "This service does not exist",
        });
      }

      if (
        service.serviceById[0].mentor_id !== req.user.user_id &&
        req.user.role !== "admin"
      ) {
        return res.status(401).send({ errorMessage: "Unauthorized" });
      }

      await service.deleteOne(+id);

      res.status(200).send({
        deletedService: true,
      });
    } catch (error) {
      res.status(500).send(error);
    }
  },

  modifyService: async (req, res) => {
    try {
      const { id } = req.params;

      const service = new Service(req.body);

      await service.modifyOne(+id);

      res.status(200).send({
        modified: true,
      });
    } catch (error) {
      res.status(500).send(error);
    }
  },

  //Méthode pour creer un service
  createService: async (req, res) => {
    try {
      const userId = req.user.user_id;

      for (let property in req.body) {
        if (req.body[property].length === 0) {
          return res.status(400).send({
            errorMessage: `${property} can't be empty!`,
          });
        }
      }

      const service = new Service(req.body);

      await service.insertLocation();

      await service.createOne(userId);

      res.status(201).send({
        created: true,
      });
    } catch (error) {
      res.status(500).send(error);
    }
  },

  searchOneService: async (req, res) => {
    try {
      const fieldSearch = req.query.service;
      const service = new Service();

      await service.searchService(fieldSearch);

      res.status(200).send(service.searchResults);
    } catch (error) {
      res.status(500).send(error);
    }
  },

  publishAService: async (req, res) => {
    try {
      const { id } = req.params;
      const service = new Service();
      await service.modifyPublishBoolean(id);
      res.status(200).send({ published: true });
    } catch (error) {
      res.status(500).send(error);
    }
  },
};

module.exports = serviceController;
