const {
    Router
} = require("express");
// import des controllers
const mainController = require("./controllers/mainController");

const categoryController = require("./controllers/categoryController");

const router = Router();

/**
 * Respond with a visitor idenfified by its ticket number
 * @route GET /register
 * @param {string} ticketNumber.path.required The ticket number
 * @returns {Visitor} 200 - An identified visitor
 * @returns {string} 400 - Missing ticket number
 * @returns {string} 401 - Outdated ticket number
 * @returns {string} 404 - Unknown ticket number
 * @returns {string} 500 - Server error
 */
//router.get("/register", mainController.init);

/* Category */
router.get("/categorys", categoryController.findAll); // Route pour toutes les catégories
router.get("/categorys/:id(\\d+)", categoryController.findById); // Route pour un ID de catégorie
router.post("/categorys", categoryController.createNewCategory); // Route pour ajouter une catégorie
router.delete("/categorys/:id(\\d+)", categoryController.deleteCategory); // Route pour suppirmer une catégorie

module.exports = router;