const {
    Router
} = require("express");

// import des controllers
const mainController = require("./controllers/mainController");

const categoryController = require("./controllers/categoryController");

const serviceController = require("./controllers/serviceController");

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
router.get("/categorys", categoryController.getAllCategorizz); // Route pour toutes les catégories
router.get("/categorys/:id(\\d+)", categoryController.getOneCategory); // Route pour un ID de catégorie
router.delete("/categorys/:id(\\d+)", categoryController.deleteOneCategory); // Route pour suppirmer une catégorie
router.post("/categorys", categoryController.createOneCategory); // Route pour ajouter une catégorie
router.patch("/categorys/:id(\\d+)", categoryController.modifyCategory) // Route pour modifier une catégorie
router.get("/categorys/:id(\\d+)/services", categoryController.getAllServicebyCategoryId) // Route pour modifier une catégorie

/* Services */
router.get("/services", serviceController.getAllServicezz);
router.get("/services/:id(\\d+)", serviceController.getOneService);
router.delete("/services/:id(\\d+)", serviceController.deleteOneService)
router.patch("/services/:id(\\d+)", serviceController.modifyService);

module.exports = router;