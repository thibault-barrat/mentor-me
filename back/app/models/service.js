const pool = require("../database");

module.exports = class Service {
  constructor(object) {
    for (const property in object) {
      this[property] = object[property];
    }
  }

  async findAll() {
    const query = {
      text: "SELECT service.id, service.title, service.duration, service.description, service.online, service.irl, service.is_published, service.category_id, location.latitude, location.longitude, users.id as mentor_id, users.firstname, users.lastname, users.email, users.biography, users.home_phone, users.mobile_phone, users.role_id, users.avatar_url FROM service JOIN location ON location.id = service.location_id JOIN users ON users.id = service.user_id",
    };
    const data = await pool.query(query);
    this.allServices = data.rows;
  }

  async findOne(id) {
    const query = {
      text: "SELECT service.id, service.title, service.duration, service.description, service.online, service.irl, service.is_published, service.category_id, location.id as location_id, location.latitude, location.longitude, users.id as mentor_id, users.firstname, users.lastname, users.email, users.biography, users.home_phone, users.mobile_phone, users.role_id, users.avatar_url FROM service JOIN location ON location.id = service.location_id JOIN users ON users.id = service.user_id WHERE service.id=$1",
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

  async updateLocationId(latitude, longitude) {
    const query = {
      text: "UPDATE location SET latitude=$1, longitude=$2 WHERE id=$3 RETURNING *",
      values: [latitude, longitude, this.serviceById[0].location_id],
    };

    const result = await pool.query(query);
  }

  async modifyOne(id) {
    await this.findOne(id);

    if (!this.title || this.title.length === 0) {
      this.title = this.serviceById[0].title;
    }

    if (!this.duration || this.duration.length === 0) {
      this.duration = this.serviceById[0].duration;
    }

    if (!this.description || this.description.length === 0) {
      this.description = this.serviceById[0].description;
    }

    if (!this.online || this.online.length === 0) {
      this.online = this.serviceById[0].online;
    }

    if (!this.irl || this.irl.length === 0) {
      this.irl = this.serviceById[0].irl;
    }

    if (!this.category_id || this.category_id.length === 0) {
      this.category_id = this.serviceById[0].category_id;
    }

    if (!this.latitude || this.latitude.length === 0) {
      this.latitude = this.serviceById[0].latitude;
    }

    if (!this.longitude || this.longitude.length === 0) {
      this.longitude = this.serviceById[0].longitude;
    }

    await this.updateLocationId(this.latitude, this.longitude);

    const query = {
      text: `UPDATE service
            SET "title"=$1, "duration"=$2, "description"=$3, "online"=$4, "irl"=$5,"category_id"=$6 WHERE id=$7;`,
      values: [
        this.title,
        this.duration,
        this.description,
        this.online,
        this.irl,
        this.category_id,
        id,
      ],
    };

    await pool.query(query);
  }

  async modifyPublishBoolean(id) {
    const query = {
      text: `UPDATE service SET "is_published"=true WHERE id=$1`,
      values: [id],
    };
    await pool.query(query);
  }

  async createOne(userId) {
    const query = {
      text: `INSERT INTO service ("title", "duration", "description", "online", "irl", "user_id", "category_id","location_id" ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING id;`,
      values: [
        this.title,
        this.duration,
        this.description,
        this.online,
        this.irl,
        userId,
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

  async searchService(fieldSearch) {
    const query = {
      text: `SELECT id FROM service WHERE LOWER("title") LIKE LOWER('%'||$1||'%') OR LOWER("description") LIKE LOWER('%'||$1||'%')`,
      values: [fieldSearch],
    };

    const result = await pool.query(query);
    this.searchResults = result.rows;
  }
};
