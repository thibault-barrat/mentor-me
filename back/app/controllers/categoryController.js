const Category = require("../models/category");

const categoryController = {

    //On cherche toute les catégories
    findAll: async (req, res, next) => {
        const categoryzz = await Category.findAllCategories();

        if (categoryzz) {

            res.send(categoryzz)

        } else {
            res.status(400);
        }
    },

    //On cherche l'id de la catégorie
    findById: async (req, res, next) => {
        const category = await Category.findCategoryById(req.params.id)

        if (category.length === 0) {

            return res.status(404).send({
                errorMessage: "This user does not exist in database"
            })

        } else {
            res.status(200).send(category)
        }
    },

    createNewCategory: async (req, res, next) => {
        try {
            const {
                name,
                color,
                image
            } = req.body;

            let bodyError = [];

            if (!name) {
                bodyErrors.push(`content can not be empty`);
            }
            if (!image) {
                bodyErrors.push(`image can not be empty`);
            }

            if (bodyError.length) {

                res.send()
            } else {

                let newCategory = Category.build({
                    name,
                    image
                });

                if (color) {
                    newCategory.color = color;
                }

                await newCategory.createCategory()

                res.status(200).send({
                    modified: true
                });
            }

        } catch (error) {
            res.status(500).send(error);
        }

    },

    deleteCategory: async (req, res, next) => {
        try {
            // const category = await Category.findCategoryById(req.params.id);

            const categoryDelete = new Category();

            // if (category.length === 0) {
            //     return res
            //         .status(404)
            //         .send({
            //             errorMessage: "This user does not exist in database"
            //         });
            // }

            await categoryDelete.deleteCategoryId(req.params.id);

            res.status(200).send({
                deletedUser: true
            })

        } catch (error) {
            res.status(500).send(error);
        }
    }
};

module.exports = categoryController;