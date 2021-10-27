const db = require("../database");

// Une category appartient à 0 ou N 'services'
Category.belongsTo(Service, {
    foreignKey: "service_id",
    as: "categorizz"
});

module.exports = Category;