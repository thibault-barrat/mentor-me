const pool = require("../database");

module.exports = class Service {
  constructor(object) {
    for (const property in object) {
      this[property] = object[property];
    }
  }

  async findAll() {
    const query = {
      text: "SELECT service.id, service.title, service.duration, service.description, service.online, service.irl, service.is_published, location.latitude, location.longitude, users.firstname, users.lastname, users.email, users.biography, users.home_phone, users.mobile_phone, users.role_id, users.avatar_url FROM service JOIN location ON location.id = service.location_id JOIN users ON users.id = service.user_id",
    };
    const data = await pool.query(query);
    this.allServices = data.rows;
  }

  async findOne(id) {
    const query = {
      text: "SELECT service.id, service.title, service.duration, service.description, service.online, service.irl, service.is_published, location.latitude, location.longitude, users.firstname, users.lastname, users.email, users.biography, users.home_phone, users.mobile_phone, users.role_id, users.avatar_url FROM service JOIN location ON location.id = service.location_id JOIN users ON users.id = service.user_id WHERE service.id=$1",
      values: [id],
    };
    const data = await pool.query(query);
    this.serviceById = data.rows;
  }

  async deleteOne(id) {
    const query = {
      text: "DELETE FROM service WHERE id=$1",
      values: [id],
    };

    await pool.query(query);
  }

  async modifyOne(id) {
    await this.findOne(id);

    if (!this.title || this.title.lenght === 0) {
      this.title = this.serviceById[0].title;
    }

    if (!this.duration || this.duration.lenght === 0) {
      this.duration = this.serviceById[0].duration;
    }

    if (!this.description || this.description.lenght === 0) {
      this.description = this.serviceById[0].description;
    }

    if (!this.online || this.online.lenght === 0) {
      this.online = this.serviceById[0].online;
    }

    if (!this.irl || this.irl.lenght === 0) {
      this.irl = this.serviceById[0].irl;
    }

    if (!this.is_published || this.is_published.lenght === 0) {
      this.is_published = this.serviceById[0].is_published;
    }

    if (!this.category_id || this.category_id.lenght === 0) {
      this.category_id = this.serviceById[0].category_id;
    }

    if (!this.location_id || this.location_id.lenght === 0) {
      this.location_id = this.serviceById[0].location_id;
    }

    const query = {
      text: `UPDATE service
            SET "title"=$1, "duration"=$2, "description"=$3, "online"=$4, "irl"=$5, "is_published"=$6 ,"category_id"=$7, "location_id"=$8 WHERE id=$9;`,
      values: [
        this.title,
        this.duration,
        this.description,
        this.online,
        this.irl,
        this.is_published,
        this.category_id,
        this.location_id,
        id,
      ],
    };

    await pool.query(query);
  }

  async createOne() {
    const query = {
      text: `INSERT INTO service ("title", "duration", "description", "online", "irl", "is_published","user_id", "category_id","location_id" ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)`,
      values: [
        this.title,
        this.duration,
        this.description,
        this.online,
        this.irl,
        this.is_published,
        this.user_id,
        this.category_id,
        this.location_id,
      ],
    };
    await pool.query(query);
  }

  async insertLocation() {
    const query = {
      text: `INSERT INTO location (latitude, longitude) VALUES ($1,$2) RETURNING id;`,
      values: [this.location.lat, this.location.lng],
    };

    const result = await pool.query(query);

    this.location_id = result.rows[0].id;
  }

  async createOne() {
    const query = {
      text: `INSERT INTO service ("title", "duration", "description", "online", "irl","user_id", "category_id","location_id" ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)`,
      values: [
        this.title,
        this.duration,
        this.description,
        this.online,
        this.irl,
        this.user_id,
        this.category_id,
        this.location_id,
      ],
    };

    await pool.query(query);
  }

  async searchService(fieldSearch) {
    const query = {
      text: `SELECT * FROM service WHERE "title" LIKE '%'||$1||'%';`,
      values: [fieldSearch],
    };

    const result = await pool.query(query);
    this.searchResults = result.rows;
  }
};
