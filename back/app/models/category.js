const pool = require("../database");

module.exports = class Category {

    constructor(object) {
        for (const property in object) {
            this[property] = object[property];
        }
    };

    async findAll() {
        const query = {
            text: "SELECT * FROM category"
        };

        const data = await pool.query(query);

        this.allCategories = data.rows;
    };

    async findOne(id) {
        const query = {
            text: "SELECT * FROM category WHERE id=$1",
            values: [id]
        };

        const data = await pool.query(query.text, query.values);

        this.categoryById = data.rows;

    };

    async deleteOne(id) {
        const query = {
            text: "DELETE FROM category WHERE id=$1",
            values: [id]
        };

        await pool.query(query.text, query.values);
    };

    async createNewCategory() {
        const query = {
            text: `INSERT INTO category ("name" , "color" ,"image") VALUES ($1,$2,$3)`,
            values: [this.name, this.color, this.image]
        };

        await pool.query(query);
    };

    async modifyOne(id) {

        await this.findOne(id);

        if (!this.name || this.name.lenght === 0) {
            this.name = this.categoryById[0].name;
        }

        if (!this.color || this.color.lenght === 0) {
            this.color = this.categoryById[0].color;
        }

        if (!this.image || this.image.lenght === 0) {
            this.image = this.categoryById[0].image;
        }

        const query = {
            text: `UPDATE category
            SET "name"=$1, "color"=$2, "image"=$3 WHERE id=$4;`,
            values: [this.name, this.color, this.image, id]
        };

        await pool.query(query);
    }
};