const pool = require("../database");

module.exports = class UserLikesService {
    async like(user_id, service_id) {

        const query = {
            text: `INSERT INTO user_likes_service ("user_id", "service_id") VALUES ($1,$2) RETURNING *`,
            values: [
                user_id,
                service_id
            ]
        };

        await pool.query(query);

    };

    async dislike(user_id, service_id) {

        const query = {
            text: `DELETE FROM user_likes_service WHERE "user_id"=$1 AND "service_id"=$2 RETURNING *;`,
            values: [
                user_id,
                service_id
            ]
        };

        await pool.query(query);
    };
}