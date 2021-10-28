const client = require("../database");

const Category = {

    //Méthode pour trouver toute les catégories
    findAllCategories: async () => {

        const query = {
            text: "SELECT * FROM category"
        };

        try {
            const result = await client.query(query);

            if (result.error) {
                console.log(result.error);
            } else {
                const data = result.rows;
            }

            return result;

        } catch (error) {
            console.log(error.stack);
        }

    },

    //Méthode pour trouver une catégorie par son ID
    findCategoryById: async (categoryId) => {

        const query = {
            text: "SELECT * FROM category WHERE id=$1",
            value: [categoryId]
        };

        try {

            const result = await client.query(query.text, query.value);

            if (result.error) {
                console.log(result.error);
            } else {
                const data = result.rows;
            }

            return result.rows;

        } catch (error) {
            console.log(error.stack);
        }

    },

    //Méthode pour créer une catégorie
    createCategory: async () => {
        const query = {
            text: `INSERT INTO category ("name","color","image") VALUES ($1,$2,$3)`,
            values: [category.name, category.color, category.image]
        };

        try {

            const result = await client.query(query.text, query.value);

            if (result.error) {
                console.log(result.error);
            } else {
                const data = result.rows;
            }

            return result.rows;

        } catch (error) {
            console.log(error.stack);
        }
    },

    // Méthode pour supprimer une catégorie par son ID
    deleteCategoryId: async (id) => {

        const query = {
            text: "DELETE FROM category WHERE id=$1",
            values: [id]
        }

        await client.query(query);
    }
};

module.exports = Category;