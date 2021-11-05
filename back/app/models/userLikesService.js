const pool = require("../database");

module.exports = class UserLikesService {
  async getLikedServiceForOneUser(id) {
    const query = {
      text: `SELECT *
        FROM user_likes_service as us
        JOIN service ON service.id=us.service_id
        WHERE us.user_id = $1;`,
      values: [id],
    };
    const result = await pool.query(query);
    this.likedServices = result.rows;
  }

  async like(user_id, service_id) {
    const query = {
      text: `INSERT INTO user_likes_service ("user_id", "service_id") VALUES ($1,$2) RETURNING *`,
      values: [user_id, service_id],
    };

    await pool.query(query);
  }

  async dislike(user_id, service_id) {
    const query = {
      text: `DELETE FROM user_likes_service WHERE "user_id"=$1 AND "service_id"=$2 RETURNING *;`,
      values: [user_id, service_id],
    };

    await pool.query(query);
  }
};
