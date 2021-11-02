const pool = require("../database");

module.exports = class Service {

    constructor(object) {
        for (const property in object) {
            this[property] = object[property];
        }
    };

    async findAll() {

        const query = {
            text: "SELECT * FROM service"
        };

        const data = await pool.query(query);

        this.allServices = data.rows;
    };

    async findOne(id) {
        const query = {
            text: "SELECT * FROM service WHERE id=$1",
            values: [id]
        };

        const data = await pool.query(query);

        this.serviceById = data.rows;
    };

    async deleteOne(id) {
        const query = {
            text: "DELETE FROM service WHERE id=$1",
            values: [id]
        };

        await pool.query(query);
    };

    async modifyOne(id) {

        await this.findOne(id);

        if (!this.title || this.title.lenght === 0) {
            this.title = this.serviceById[0].name;
        }

        if (!this.duration || this.duration.lenght === 0) {
            this.duration = this.serviceById[0].name;
        }

        const query = {
            text: `UPDATE service
            SET "title"=$1, "duration"=$2, "description"=$3, "online=$4", "irl=$5", "is_published=$6" WHERE id=$7;`,
            values: [this.title, this.duration, this.description, this.online, this.irl, this.is_published, id]
        };

        await pool.query(query);
    }
};