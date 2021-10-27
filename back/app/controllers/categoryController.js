const Category = require("../models/category");

const categoryController = {

    getAllCategory: async (req, res) => {
        try {
            const categorizz = await Category.findAll({
                include: 'service'
            });
            res.render('categorys', {
                categorys
            })
        } catch (error) {
            console.error(error);
            res.status(500).render('500');
        }
    },

    getIdCategory: async (req, res) => {
        try {
            const categoryId = await Category.findByPk(Number(req.params.id), {
                include: ""
            });

            res.render('category', {
                categorys
            })
        } catch (error) {
            console.error(error);
            res.status(500).render('500');
        }
    }
};

module.exports = categoryController;