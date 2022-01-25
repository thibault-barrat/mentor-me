const Category = require("../models/category");

const categoryController = {
  //On cherche toute les catégories
  getAllCategorizz: async (req, res) => {
    try {
      const categoryzz = new Category();
      await categoryzz.findAll();
      res.status(200).send(categoryzz.allCategories);
    } catch (error) {
      res.status(500).send(err);
    }
  },

  //On cherche l'id de la catégorie
  getOneCategory: async (req, res) => {
    try {
      const {
        id
      } = req.params;
      const category = new Category();

      await category.findOne(+id);

      if (category.categoryById.length === 0) {
        return res.status(404).send({
          errorMessage: "This category does not exist",
        });
      }

      res.status(200).send(category.categoryById);
    } catch (error) {
      res.status(500).send(error);
    }
  },

  //On delete une catégorie par son rappport à son ID
  deleteOneCategory: async (req, res) => {
    try {
      const {
        id
      } = req.params;
      const category = new Category();

      await category.findOne(+id);

      if (category.categoryById.length === 0) {
        return res.status(404).send({
          errorMessage: "This category does not exist",
        });
      }

      await category.deleteOne(+id);

      res.status(200).send({
        deletedCategory: true,
      });
    } catch (error) {
      res.status(500).send(error);
    }
  },

  //Création d'une catégorie
  createOneCategory: async (req, res) => {
    try {
      for (let property in req.body) {
        if (req.body[property].length === 0) {
          return res.status(400).send({
            errorMessage: `${property} can't be empty!`,
          });
        }
      }

      const category = new Category(req.body);

      await category.createNewCategory();

      res.status(201).send({
        created: true,
      });
    } catch (error) {
      res.status(500).send(error);
    }
  },

  //Modificiation d'une catégorie par Id
  modifyCategory: async (req, res) => {
    try {
      const {
        id
      } = req.params;

      const category = new Category(req.body);

      await category.modifyOne(+id);

      res.status(200).send({
        modified: true,
      });
    } catch (error) {
      res.status(500).send(error);
    }
  },

  getAllServicebyCategoryId: async (req, res) => {
    try {
      const {
        id
      } = req.params;

      const category = new Category();

      await category.findAllServicebyCategoryId(+id);

      res.status(200).send(category.AllServicebyCategoryId);
    } catch (error) {
      res.status(500).send(error);
    }
  },
};

module.exports = categoryController;